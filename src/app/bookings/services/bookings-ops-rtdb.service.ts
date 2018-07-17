import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Booking } from "../../shared/models/booking";
import { DatastoreManagerService } from "../../shared/services/datastore-manager.service";

@Injectable({
  providedIn: "root"
})
export class BookingsOpsRtdbService {
  constructor(
    private db: AngularFireDatabase,
    private store: DatastoreManagerService
  ) {}

  confirmBookings(booking: Booking) {
    //update confirmed field of the bookings to true
    this.db.list("/root/main-bookings/").update(booking.id, { confirmed: 1 });
    console.log("updated confirmed key in bookings");
    //delete the booking id on tentative
    let bookingDateArr = booking.date.split("-");
    let year = bookingDateArr[0];
    let month = bookingDateArr[1];
    let day = bookingDateArr[2];
    /*THIS DOES NOT WORK DO NOT RUN UNTIL THIS IS FIXED */
    this.store.getHallList().subscribe(data => {
      for (let dat of data) {
        if (dat.name == booking["hall-id"]) {
          let hallid = dat.id;
          let startID = "";
          let endID = "";
          this.store.getTimeList().subscribe(times => {
            for (let time of times) {
              if (time.value == booking["start-time"]) {
                startID = time.id;
              }
            }
            for (let time of times) {
              if (time.value == booking["end-time"]) {
                endID = time.id;
              }
            }
            this.db
              .list(
                "/root/tentative-bookings/" +
                  year +
                  "/" +
                  month +
                  "/" +
                  day +
                  "/" +
                  hallid +
                  "/",
                ref =>
                  ref
                    .orderByChild("id")
                    .equalTo(booking.id)
                    .limitToFirst(1)
              )
              .remove();
            console.log("removed from tentative bookings");
            const pushList = {
              id: booking.id,
              "start-time": startID,
              "end-time": endID
            };
            /* this.db
              .list(
                "/root/confirmed-bookings/" +
                  year +
                  "/" +
                  month +
                  "/" +
                  day +
                  "/" +
                  hallid +
                  "/"
              )
              .push(pushList); */
            console.log("pushed to confirm bookings");
          });
          break;
        }
      }
    });

    //make the field on confirmed
  }
}
