import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { map, flatMap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Time } from "../models/time";
import { DatastoreManagerService } from "./datastore-manager.service";

@Injectable({
  providedIn: "root"
})
export class TimeslotManagerService {
  constructor(
    private db: AngularFireDatabase,
    private store: DatastoreManagerService
  ) {}

  timeList: Time[] = [];
  startTimes: string[] = [];
  endTimes: string[] = [];

  generateStartTimes(): Observable<any> {
    return this.db
      .list("/root/timeids")
      .valueChanges()
      .pipe(
        flatMap(times => {
          for (let time of times.slice(0, times.length - 1)) {
            this.startTimes.push(time + "");
          }
          return of(this.startTimes);
        })
      );
  }

  generateEndTimes(): Observable<string[]> {
    return this.db
      .list("/root/timeids")
      .valueChanges()
      .pipe(
        flatMap(times => {
          for (let time of times.slice(1, times.length)) {
            this.endTimes.push(time + "");
          }
          return of(this.endTimes);
        })
      );
  }

  generateTimeLists() {
    let timeList: Time[] = [];
    this.db
      .list("/root/timeids")
      .snapshotChanges()
      .subscribe(values => {
        for (let value of values) {
          let time: Time = { id: "", value: "" };
          time.id = value.key;
          time.value = value.payload.val() + "";
          /* time[value.key] = value.payload.val() + ""; */
          timeList.push(time);
        }
        console.log("pushing time list");
        console.log(timeList);
        this.store.pushTimeList(timeList);
      });
  }
}

/* generateTimeslots(): Observable<any> {
    return this.db.list("/root/timeslots").valueChanges();
  } */

/* isCampusTime(): boolean {
    const currentDate = new Date();
    if (currentDate.getHours() >= 8 && currentDate.getHours() <= 18) {
      return true;
    } else {
      return false;
    }
  } */

/* getTimeSlot(): string {
    if (this.isCampusTime()) {
      var currentDate = new Date();
      var firstChar = currentDate.getHours() - 8;
      var secondChar = currentDate.getMinutes() <= 30 ? 0 : 1;
      return "time-" + firstChar + secondChar + "";
    } else {
      return null;
    }
  } */
