import { Injectable } from "@angular/core";

import { AngularFireDatabase } from "angularfire2/database";
import { map, flatMap, takeLast } from "rxjs/operators";
import { Booking } from "../../shared/models/booking";
import { DatastoreManagerService } from "../../shared/services/datastore-manager.service";
import { Time } from "../../shared/models/time";
import { Hall } from "../../shared/models/hall";

@Injectable({
  providedIn: "root"
})
export class SearchbookingsRtdbService {
  constructor(
    private db: AngularFireDatabase,
    private store: DatastoreManagerService
  ) {
    this.store.getHallList().subscribe(halls => {
      console.log("got the halls");
      this.hallList = halls;
    });
    this.store.getTimeList().subscribe(times => {
      console.log("got thetimes");
      this.timeList = times;
    });
  }
  timeList: Time[] = [];
  hallList: Hall[] = [];
  isDataSearched: boolean = false;
  hasConfirmedBooking: boolean = false;

  bookingListCompiled: Booking[] = [];
  getBookingsInRange(
    year: string,
    month: string,
    day: string,
    hall: string,
    starttime: string,
    endtime: string
  ): Booking[] {
    let bookingsList: Booking[] = [];
    console.log("hey?");
    this.db
      .list(
        "/root/date-bookings/" +
          year +
          "/" +
          month +
          "/" +
          day +
          "/lct-hall-" +
          (hall + 1)
      )
      .valueChanges()
      .subscribe(children => {
        this.isDataSearched = true;
        for (let child of children) {
          let childStartTime = +child["start-time"].slice(
            child["start-time"].length - 2,
            child["start-time"].length
          );
          let childEndTime = +child["end-time"].slice(
            child["end-time"].length - 2,
            child["end-time"].length
          );

          if (
            (childStartTime >= +starttime && childStartTime <= +endtime) ||
            (childEndTime >= +starttime && childEndTime <= +endtime)
          ) {
            this.db
              .list("/root/main-bookings/" + child["id"] + "/")
              .snapshotChanges()
              .pipe(
                map(snap => {
                  console.log(
                    "clearing array",
                    this.bookingListCompiled.length
                  );
                  this.store.pushBookingArraytoList([]); //lear

                  let booking: Booking = {
                    id: child["id"],
                    by: "",
                    confirmed: 0,
                    date: "",
                    description: "",
                    "end-time": "",
                    "start-time": "",
                    title: "",
                    "hall-id": "",
                    isDepartment: 0,
                    isStudent: 0,
                    "user-id": ""
                  };
                  for (let row of snap) {
                    booking[row.payload.key] = row.payload.val() + "";
                  }
                  booking["start-time"] = this.timeList.find(elem => {
                    return elem["id"] == booking["start-time"];
                  }).value;

                  booking["end-time"] = this.timeList.find(elem => {
                    return elem["id"] == booking["end-time"];
                  }).value;

                  booking["hall-id"] = this.hallList.find(elem => {
                    return elem["id"] == booking["hall-id"];
                  }).name;

                  if (booking.confirmed == 1) {
                    this.hasConfirmedBooking = true;
                  }
                  const findelm = this.bookingListCompiled.find(val => {
                    return val["id"] == booking["id"];
                  });
                  console.log("FINDELDM", findelm);
                  if (findelm == undefined) {
                    this.bookingListCompiled.push(booking);
                  } else {
                    const findelmindex = this.bookingListCompiled.findIndex(
                      val => {
                        return val["id"] == booking["id"];
                      }
                    );
                    this.bookingListCompiled[findelmindex] = booking;
                  }
                })
              )
              .subscribe(() => {
                this.store.pushBookingArraytoList(this.bookingListCompiled);
              });
          }
        }
      });
    return bookingsList;
  }
}
