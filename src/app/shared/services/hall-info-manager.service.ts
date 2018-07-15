import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable, of, concat } from "rxjs";
import { flatMap } from "rxjs/operators";
import { TimeslotManagerService } from "./timeslot-manager.service";

@Injectable({
  providedIn: "root"
})
export class HallInfoManagerService {
  constructor(
    private db: AngularFireDatabase,
    private timeslot: TimeslotManagerService
  ) {}

  getHalls(): Observable<any> {
    var items: Observable<any> = this.db
      .list("/root/lecture-halls")
      .valueChanges();
    return items;
  }
}
/*  
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
*/
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
