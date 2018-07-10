import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { map, flatMap } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TimeslotManagerService {
  constructor(private db: AngularFireDatabase) {}

  generateTimeslots(): Observable<any> {
    return this.db.list("/root/timeslots").valueChanges();
  }
  startTimes: string[] = [];
  endTimes: string[] = [];

  generateStartTimes(): Observable<any> {
    /* let obsStartTimes:Observable<string[]>; */
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
