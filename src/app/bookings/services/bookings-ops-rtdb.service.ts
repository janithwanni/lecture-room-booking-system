import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Booking } from "../../shared/models/booking";
import { Time } from "../../shared/models/time";
import { Hall } from "../../shared/models/hall";
import { MatDialog } from "@angular/material";
import { ConfirmDialogComponent } from "../dialogs/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: "root"
})
export class BookingsOpsRtdbService {
  constructor(private db: AngularFireDatabase, private dialog: MatDialog) {
    /* this.store.getTimeList().subscribe(times => {
      console.log("got thetimes");
      this.timeList = times;
    });
    this.store.getHallList().subscribe(halls => {
      console.log("got the halls");
      this.hallList = halls;
    }); */
  }

  timeList: Time[] = [];
  hallList: Hall[] = [];
  confirmBookings(booking: Booking) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      if (result == true) {
        this.db
          .list("/root/main-bookings/")
          .update(booking.id, { confirmed: 1 });
        console.log("updated confirmed key in bookings");
      }
    });
  }

  deleteBooking(booking: Booking) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      if (result == true) {
        this.db.list("/root/main-bookings/").remove(booking.id);
        console.log("removed booking");
      }
    });
  }
  updateBooking(booking: Booking) {}
}

/*  let confirmed: boolean = false;
    this.dialog
      .open(ConfirmDialogComponent, {
        width: "250px",
        height: "125px"
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log("result is ", result);
        } else {
          console.log("result is", result);
        }
      }); */

//update confirmed field of the bookings to true
//this.db.list("/root/main-bookings/").update(booking.id, { confirmed: 1 });

//delete the booking id on tentative
/* let bookingDateArr = booking.date.split("-");
    let year = bookingDateArr[0];
    let month = bookingDateArr[1];
    let day = bookingDateArr[2];
    let hallid = "";
    let startID = "";
    let endID = "";
    hallid = this.hallList.find(hall => {
      return hall.name == booking["hall-id"];
    }).id;
    startID = this.timeList.find(time => {
      return time.value == booking["start-time"];
    }).id;
    endID = this.timeList.find(time => {
      return time.value == booking["end-time"];
    }).id; */
/* for (let hall of this.hallList) {
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
    } */
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
//make the field on confirmed
