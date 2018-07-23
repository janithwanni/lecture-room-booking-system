import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Booking } from "../../shared/models/booking";
import { DatastoreManagerService } from "../../shared/services/datastore-manager.service";
import { Time } from "../../shared/models/time";
import { Hall } from "../../shared/models/hall";

@Injectable({
  providedIn: "root"
})
export class BookingsOpsRtdbService {
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
  confirmBookings(booking: Booking) {
    console.log(booking);
    //update confirmed field of the bookings to true
    this.db.list("/root/main-bookings/").update(booking.id, { confirmed: 1 });
    console.log("updated confirmed key in bookings");
    //delete the booking id on tentative
    let bookingDateArr = booking.date.split("-");
    let year = bookingDateArr[0];
    let month = bookingDateArr[1];
    let day = bookingDateArr[2];
    let hallid = "";
    let startID = "";
    let endID = "";
    for (let hall of this.hallList) {
      if (hall.name == booking["hall-id"]) {
        hallid = hall.id;
        break;
      }
    }
    for (let time of this.timeList) {
      if (time.value == booking["start-time"]) {
        startID = time.id;
      }
      if (time.value == booking["end-time"]) {
        endID = time.id;
      }
    }
    /* this.db
      .object(
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
      .remove(); */
    console.log("removed from tentative bookings");
    //make the field on confirmed
  }
}
