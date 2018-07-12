import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable, of, concat } from "rxjs";
import {
  take,
  takeLast,
  count,
  isEmpty,
  flatMap,
  scan,
  map
} from "rxjs/operators";
import { TimeslotManagerService } from "./timeslot-manager.service";

@Injectable({
  providedIn: "root"
})
export class HallInfoManagerService {
  constructor(
    private db: AngularFireDatabase,
    private timeslot: TimeslotManagerService
  ) {}

  getFreeHalls(year: string, month: string, day: string): Observable<any> {
    //retrieves the number of halls free right now at the given day
    if (this.timeslot.isCampusTime()) {
      return this.db
        .list("/root/time-bookings/" + year + "/" + month + "/" + day)
        .valueChanges()
        .pipe();
    } else {
      return null;
    }
  }

  getTotalNumberofHalls(): Observable<number> {
    return this.db
      .list("/root/lecture-halls/")
      .valueChanges()
      .pipe(count());
  }

  getHalls(): Observable<any> {
    var items: Observable<any> = this.db
      .list("/root/lecture-halls")
      .valueChanges();
    return items;
  }

  getBookingsInRange(
    year: string,
    month: string,
    day: string,
    hall: string,
    starttime: string,
    endtime: string
  ) {
    this.db
      .list(
        "/root/confirmed-bookings/" +
          year +
          "/" +
          month +
          "/" +
          day +
          "/lct-hall-" +
          hall
      )
      .valueChanges()
      .pipe(
        flatMap(h => {
          console.log(h);
          return h;
        })
      )
      .subscribe(data => {});
  }
}
/*
        isEmpty(),
          flatMap(b => {
            if (!b) {
              return this.db
                .list("/root/time-bookings/" + year + "/" + month + "/" + day)
                .valueChanges()
                .pipe(count());
            } else {
              return this.getTotalNumberofHalls();
            }
          }),
          flatMap(c => {
            console.log(c);
            return concat(of(c), this.getTotalNumberofHalls());
          }),
          scan((x, y) => {
            return Math.abs(x - y);
          })
*/
