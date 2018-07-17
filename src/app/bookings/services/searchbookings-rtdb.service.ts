import { Injectable } from "@angular/core";

import { AngularFireDatabase } from "angularfire2/database";
import { map } from "rxjs/operators";
import { Booking } from "../../shared/models/booking";
import { DatastoreManagerService } from "../../shared/services/datastore-manager.service";

@Injectable({
  providedIn: "root"
})
export class SearchbookingsRtdbService {
  constructor(
    private db: AngularFireDatabase,
    private store: DatastoreManagerService
  ) {}
  isDataSearched: boolean = false;
  optionCounts: { confirmed: number; tentative: number } = {
    confirmed: 0,
    tentative: 0
  };
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
          map(h => {
            for (let hall of h) {
              let hallStartTime = +hall["start-time"].slice(
                hall["start-time"].length - 2,
                hall["start-time"].length
              );
              let hallEndTime = +hall["end-time"].slice(
                hall["end-time"].length - 2,
                hall["end-time"].length
              );
              if (
                (hallStartTime >= +starttime && hallStartTime <= +endtime) ||
                (hallEndTime >= +starttime && hallEndTime <= +endtime)
              ) {
                this.db
                  .list("/root/main-bookings/" + hall["id"] + "/")
                  .snapshotChanges()
                  .pipe(
                    map(result => {
                      let booking: Booking = {
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
                      for (let row of result) {
                        booking[row.payload.key] = row.payload.val() + "";
                      }
                      this.store.getTimeList().subscribe(times => {
                        for (let time of times) {
                          if (booking["start-time"] == time.id) {
                            booking["start-time"] = time.value;
                          }
                          if (booking["end-time"] == time.id) {
                            booking["end-time"] = time.value;
                          }
                        }
                        this.store.getHallList().subscribe(halls => {
                          for (let h of halls) {
                            if (booking["hall-id"] == h.id) {
                              booking["hall-id"] = h.name + "";
                              bookingsList.push(booking);
                              console.log(bookingsList.length);
                              break;
                            }
                          }
                        });
                      });
                      //this.store.pushBookingtoList(bookingsList);
                    })
                  )
                  .subscribe(data => {
                    this.isDataSearched = true;
                    this.optionCounts[option] = bookingsList.length;
                    this.store.pushBookingtoList(bookingsList);
                  });
              } else {
                this.isDataSearched = true;
                this.optionCounts[option] = bookingsList.length;
                this.store.pushBookingtoList(bookingsList);
              }
            }
          })
        )
        .subscribe(data => {});
    }

    return bookingsList;
  }
}
