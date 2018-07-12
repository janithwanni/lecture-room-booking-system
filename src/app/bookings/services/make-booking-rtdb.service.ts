import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { UserInfoManagerService } from "../../shared/services/user-info-manager.service";

@Injectable({
  providedIn: "root"
})
export class MakeBookingRtdbService {
  constructor(
    private db: AngularFireDatabase,
    private userinfo: UserInfoManagerService
  ) {}
  /*
  @Input() hall: string;
  @Input() date: Date;
  @Input() startingTime: string;
  @Input() endingTime: string;
  @Input() title: string;
  @Input() description: string;
  @Input() by: string;
  @Input() studentORdept: string;
  */

  makeBookingsRecord(
    hall: string,
    date: Date,
    startingTime: string,
    endingTime: string,
    by: string = " ",
    studentORdept: string = "Student Body",
    title: string = " ",
    description: string = " "
  ) {
    const mainPush = {
      "hall-id": "lct-hall-" + hall,
      "user-id": this.userinfo.getUserID(),
      date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
      title: title,
      description: description,
      confirmed: 0,
      "start-time": startingTime,
      "end-time": endingTime,
      by: by,
      isStudent: studentORdept == "Student Body" ? 1 : 0,
      isDepartment: studentORdept == "Department" ? 1 : 0
    };
    const newbookingref = this.db.list("/root/main-bookings").push(mainPush);
    const tentativePush = {
      id: newbookingref.key,
      "start-time": startingTime,
      "end-time": endingTime
    };
    this.db
      .list(
        "/root/tentative-bookings/" +
          date.getFullYear() +
          "/" +
          date.getMonth() +
          "/" +
          date.getDate() +
          "/lct-hall-" +
          hall +
          "/"
      )
      .push(tentativePush);
  }
}

/* const push = {
      "hall-id": "lct-hall-" + hall,
      "user-id": this.userinfo.getUserID(),
      date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
      title: title,
      description: description,
      confirmed: 0,
      timestamp: new Date().getTime(),
      timeslots: 0
    };
    const newbookingref = this.db.list("/root/main-bookings").push(push);
    for (const timeslot of timeSlot) {
      const timetext =
        +timeslot < 10 ? "time-0" + timeslot : "time-" + timeslot;
      this.db
        .list("/root/main-bookings/" + newbookingref.key + "/timeslots")
        .push(timetext);
      this.db
        .list(
          "/root/hall-bookings/lct-hall-" +
            hall +
            "/" +
            date.getFullYear() +
            "/" +
            date.getMonth() +
            "/" +
            date.getDate() +
            "/"
        )
        .set(timetext, newbookingref.key);
      this.db
        .list(
          "/root/time-bookings/" +
            date.getFullYear() +
            "/" +
            date.getMonth() +
            "/" +
            date.getDate() +
            "/" +
            timetext +
            "/"
        )
        .set("lct-hall-" + hall, newbookingref.key);
    }
    this.db
      .list("/root/user-bookings/" + this.userinfo.getUserID() + "/unconfirmed")
      .push(newbookingref.key); */
