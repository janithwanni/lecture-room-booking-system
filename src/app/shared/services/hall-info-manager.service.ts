import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable, of, concat } from "rxjs";

import { TimeslotManagerService } from "./timeslot-manager.service";
import { Hall } from "../models/hall";
import { DatastoreManagerService } from "./datastore-manager.service";

@Injectable({
  providedIn: "root"
})
export class HallInfoManagerService {
  constructor(
    private db: AngularFireDatabase,
    private timeslot: TimeslotManagerService,
    private store: DatastoreManagerService
  ) {}

  hallList: Hall[] = [];
  getHalls(): Observable<any> {
    var items: Observable<any> = this.db
      .list("/root/lecture-halls")
      .valueChanges();
    return items;
  }

  generateHallList() {
    let hallList: Hall[] = [];
    this.db
      .list("/root/lecture-halls")
      .snapshotChanges()
      .subscribe(values => {
        for (let value of values) {
          let hall: Hall = { id: "", name: "" };
          hall.id = value.key;
          hall.name = value.payload.val()["name"] + "";

          /* hall[value.key] = value.payload.val() + ""; */
          console.log(hall);
          hallList.push(hall);
        }
        console.log("pushing hall list");
        console.log(hallList);
        this.store.pushHallList(hallList);
      });
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
