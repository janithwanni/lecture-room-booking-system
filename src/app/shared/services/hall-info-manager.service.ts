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

@Injectable({
  providedIn: "root"
})
export class HallInfoManagerService {
  constructor(private db: AngularFireDatabase) {}

  isCampusTime(): boolean {
    const currentDate = new Date();
    if (currentDate.getHours() >= 8 && currentDate.getHours() <= 18) {
      return true;
    } else {
      return false;
    }
  }
  getTimeSlot(): string {
    if (this.isCampusTime()) {
      var currentDate = new Date();
      var firstChar = currentDate.getHours() - 8;
      var secondChar = currentDate.getMinutes() <= 30 ? 0 : 1;
      return "time-" + firstChar + secondChar + "";
    } else {
      return null;
    }
  }

  getFreeHalls(year: string, month: string, day: string): Observable<any> {
    //retrieves the number of halls free right now at the given day
    if (this.isCampusTime()) {
      return this.db
        .list("/root/time-bookings/" + year + "/" + month + "/" + day)
        .valueChanges()
        .pipe(
          
        );
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