import { Injectable } from "@angular/core";

import { AngularFireDatabase } from "angularfire2/database";
import { map, flatMap } from "rxjs/operators";
import { Booking } from "../../shared/models/booking";
import { DatastoreManagerService } from "../../shared/services/datastore-manager.service";
import { Time } from "../../shared/models/time";
import { Hall } from "../../shared/models/hall";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SearchbookingsRtdbService {
  constructor(
    private db: AngularFireDatabase,
    private store: DatastoreManagerService
  ) {
    this.store.getTimeList().subscribe(times => {
      console.log("got thetimes");
      this.timeList = times;
    });
    this.store.getHallList().subscribe(halls => {
      console.log("got the halls");
      this.hallList = halls;
    });
  }
  timeList: Time[] = [];
  hallList: Hall[] = [];
  isDataSearched: boolean = false;
  optionCounts: { confirmed: number; tentative: number } = {
    confirmed: 0,
    tentative: 0
  };
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
    const options = ["tentative", "confirmed"];
    for (let option of options) {
      this.isDataSearched = true;
      this.db
        .list(
          "/root/" +
            option +
            "-bookings/" +
            year +
            "/" +
            month +
            "/" +
            day +
            "/lct-hall-" +
            (hall + 1)
        )
        .valueChanges()
        .pipe(
          map(optionDetail => {
            for (let option of optionDetail) {
              //get every booking in tent or conf
              //get bookingstart and endtime
              //check if it fits
              //get details and push to bookingList in state
              let bookingStartTime = +option["start-time"].slice(
                option["start-time"].length - 2,
                option["start-time"].length
              );
              let bookingEndTime = +option["end-time"].slice(
                option["end-time"].length - 2,
                option["end-time"].length
              );
              if (
                (bookingStartTime >= +starttime &&
                  bookingStartTime <= +endtime) ||
                (bookingEndTime >= +starttime && bookingEndTime <= +endtime)
              ) {
                this.db
                  .list("/root/main-bookings/" + option["id"] + "/")
                  .snapshotChanges()
                  .subscribe(snap => {
                    let booking: Booking = {
                      id: option["id"],
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
                    for (let time of this.timeList) {
                      if (booking["start-time"] == time.id) {
                        booking["start-time"] = time.value;
                      }
                      if (booking["end-time"] == time.id) {
                        booking["end-time"] = time.value;
                      }
                    }
                    for (let hall of this.hallList) {
                      if (booking["hall-id"] == hall.id) {
                        booking["hall-id"] = hall.name;
                        break;
                      }
                    }
                    this.store.pushBookingtoList(booking);
                  });
              }
            }
          })
        )
        .subscribe(() => {});
    }

    return bookingsList;
  }
}
