import { Injectable } from "@angular/core";
import { TimeslotManagerService } from "../../shared/services/timeslot-manager.service";
import { AngularFireDatabase } from "angularfire2/database";
import { flatMap, map } from "rxjs/operators";
import { Booking } from "../../shared/models/booking";
import { DatastoreManagerService } from "../../shared/services/datastore-manager.service";

@Injectable({
  providedIn: "root"
})
export class SearchbookingsRtdbService {
  constructor(
    private db: AngularFireDatabase,
    private timeslot: TimeslotManagerService,
    private store: DatastoreManagerService
  ) {}

  getBookingsInRange(
    year: string,
    month: string,
    day: string,
    hall: string,
    starttime: string,
    endtime: string
  ): Booking[] {
    let bookingsList: Booking[] = [];
    this.db
      .list(
        "/root/tentative-bookings/" +
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
                      endTime: "",
                      startTime: "",
                      title: "",
                      hallID: "",
                      isDepartment: 0,
                      isStudent: 0,
                      userid: ""
                    };
                    for (let row of result) {
                      booking[row.payload.key] = row.payload.val() + "";
                    }
                    this.store.pushBookingtoList(bookingsList);
                    bookingsList.push(booking);
                    console.log(bookingsList.length);
                  })
                )
                .subscribe(data => {
                  this.store.pushBookingtoList(bookingsList);
                });
            } else {
              this.store.pushBookingtoList(bookingsList);
            }
          }
        })
      )
      .subscribe(data => {});
    return bookingsList;
  }
}
