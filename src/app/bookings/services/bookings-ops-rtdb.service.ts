import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Booking } from "../../shared/models/booking";
import { Time } from "../../shared/models/time";
import { Hall } from "../../shared/models/hall";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ConfirmDialogComponent } from "../dialogs/confirm-dialog/confirm-dialog.component";
import { UpdateDialogComponent } from "../dialogs/update-dialog/update-dialog.component";
import { DatastoreManagerService } from "../../shared/services/datastore-manager.service";

@Injectable({
  providedIn: "root"
})
export class BookingsOpsRtdbService {
  constructor(
    private db: AngularFireDatabase,
    private dialog: MatDialog,
    private store: DatastoreManagerService,
    private snackbar: MatSnackBar
  ) {
    this.store.getTimeList().subscribe(times => {
      //console.log("got thetimes");
      this.timeList = times;
    });
    this.store.getHallList().subscribe(halls => {
      //console.log("got the halls");
      this.hallList = halls;
    });
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
        let snackbarRef = this.snackbar.open("Confirmed Booking", "Dismiss");
        snackbarRef.onAction().subscribe(() => {
          snackbarRef.dismiss();
        });
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
        const year = booking.date.split("-")[0];
        const month = booking.date.split("-")[1];
        const day = booking.date.split("-")[2];
        const bookingHallID = this.hallList.find(elem => {
          return elem.name == booking["hall-id"];
        }).id;
        this.db
          .list(
            "/root/date-bookings/" +
              year +
              "/" +
              month +
              "/" +
              day +
              "/" +
              bookingHallID +
              "/",
            ref =>
              ref
                .orderByChild("id")
                .equalTo(booking.id)
                .limitToFirst(1)
          )
          .snapshotChanges()
          .subscribe(snap => {
            console.log(snap[0].key);
            this.db
              .list(
                "/root/date-bookings/" +
                  year +
                  "/" +
                  month +
                  "/" +
                  day +
                  "/" +
                  bookingHallID +
                  "/" +
                  snap[0].key +
                  "/"
              )
              .remove();
            console.log("removed booking");
            let snackbarRef = this.snackbar.open("Deleted Booking", "Dismiss");
            snackbarRef.onAction().subscribe(() => {
              snackbarRef.dismiss();
            });
          });
      }
    });
  }
  updateBooking(booking: Booking) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: "550px",
      height: "550px",
      data: booking
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      let edited: Booking = result;
      console.log(
        booking["start-time"],
        edited["start-time"],
        booking["end-time"],
        edited["end-time"]
      );
      //check whether start and end time of the result and the original booking
      if (
        booking["start-time"] ==
          this.timeList.find(val => {
            return val.id == edited["start-time"];
          }).value &&
        booking["end-time"] ==
          this.timeList.find(val => {
            return val.id == edited["end-time"];
          }).value
      ) {
        Object.entries(edited).forEach(([key, value]) => {
          console.log(key, value);
          if (key != "id") {
            this.db
              .object("/root/main-bookings/" + edited.id + "/" + key)
              .set(value);
          }
        });
      } else {
        //delete the one at the date bookings and then make a new one at the set date
        let bookingDateArr = booking.date.split("-");
        let year = bookingDateArr[0];
        let month = bookingDateArr[1];
        let day = bookingDateArr[2];
        let hallid = this.hallList.find(hall => {
          return hall.name == booking["hall-id"];
        }).id;
        this.db
          .list(
            "/root/date-bookings" +
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
      }
    });
  }
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
