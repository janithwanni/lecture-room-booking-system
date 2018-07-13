import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { map, flatMap } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TimeslotManagerService {
  constructor(private db: AngularFireDatabase) {}

  startTimes: string[] = [];
  endTimes: string[] = [];

  generateStartTimes(): Observable<any> {
    return this.db
      .list("/root/timeslots")
      .valueChanges()
      .pipe(
        flatMap(times => {
          for (let time of times) {
            this.startTimes.push(time["start-time"]);
          }
          return of(this.startTimes);
        })
      );
  }

  generateEndTimes(): Observable<string[]> {
    return this.db
      .list("/root/timeslots")
      .valueChanges()
      .pipe(
        flatMap(times => {
          for (let time of times) {
            this.endTimes.push(time["end-time"]);
          }
          return of(this.endTimes);
        })
      );
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
