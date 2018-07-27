import { Component, OnInit, Inject, Input } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDatepickerInputEvent
} from "@angular/material";
import { Booking } from "../../../shared/models/booking";
import { Observable, of } from "rxjs";
import { DatastoreManagerService } from "../../../shared/services/datastore-manager.service";
import { Time } from "../../../shared/models/time";
import { Hall } from "../../../shared/models/hall";
import { HallInfoManagerService } from "../../../shared/services/hall-info-manager.service";
import { TimeslotManagerService } from "../../../shared/services/timeslot-manager.service";

@Component({
  selector: "app-update-dialog",
  templateUrl: "./update-dialog.component.html",
  styleUrls: ["./update-dialog.component.scss"]
})
export class UpdateDialogComponent implements OnInit {
  minDate = new Date();
  maxDate = new Date(
    new Date().getFullYear() + 1,
    new Date().getMonth(),
    new Date().getDay()
  );

  items: Observable<any>;
  endTime: Observable<string[]>;
  startTime: Observable<string[]>;
  timeList: Time[] = [];
  hallList: Hall[] = [];
  studOrDeptOptions: string[] = ["Student Body", "Department"];
  isFree = false;
  isNotFree = of(true);
  @Input() hall: string;
  @Input() date: Date;
  @Input() startingTime: string;
  @Input() endingTime: string;
  @Input() title: string;
  @Input() description: string;
  @Input() by: string;
  @Input() studentORdept: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Booking,
    private store: DatastoreManagerService,
    private hallinfo: HallInfoManagerService,
    private timeslotmanager: TimeslotManagerService
  ) {
    this.items = hallinfo.getHalls();
    this.timeslotmanager.generateTimeLists();
    this.startTime = this.timeslotmanager.generateStartTimes();
    this.endTime = this.timeslotmanager.generateEndTimes();
    this.hallinfo.generateHallList();

    this.store.getTimeList().subscribe(times => {
      console.log("got thetimes");
      this.timeList = times;
    });
    this.store.getHallList().subscribe(halls => {
      console.log("got the halls");
      this.hallList = halls;
    });

    this.startingTime =
      this.timeList.findIndex(time => {
        return time.value == this.data["start-time"];
      }) + "";
    console.log("startingtime", this.startingTime);

    this.endingTime =
      this.timeList.findIndex(time => {
        return time.value == this.data["end-time"];
      }) + "";
    console.log("endtingtime", this.endingTime);
    this.hall =
      this.hallList.findIndex(hall => {
        return hall.name == this.data["hall-id"];
      }) + "";
    console.log("hallid", this.hall);
    this.date = new Date(this.data["date"]);
    this.title = this.data["title"];
    this.by = this.data["by"];
    this.description = this.data["description"];
    this.studentORdept =
      this.data["isStudent"] == 1 ? "Student Body" : "Department";
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  pickDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = event.target.value;
  }

  updateBookingClick(booking: Booking) {
    if (
      this.hall != null &&
      this.date != null &&
      this.date <= this.maxDate &&
      this.date >= this.minDate &&
      this.startingTime != null &&
      this.endingTime != null &&
      this.startingTime < this.endingTime &&
      this.title != null &&
      this.description != null &&
      this.by != null &&
      this.studentORdept != null
    ) {
      console.log(
        this.timeList[this.endingTime].id,
        this.timeList[this.startingTime].id,
        this.endingTime,
        this.startingTime
      );
      let booking: Booking = {
        id: this.data.id,
        by: this.by,
        confirmed: this.data.confirmed,
        date:
          this.date.getFullYear() +
          "-" +
          (this.date.getMonth() + 1) +
          "-" +
          this.date.getDate(),
        description: this.description,
        "end-time": this.timeList[this.endingTime].id,
        "start-time": this.timeList[this.startingTime].id,
        title: this.title,
        "hall-id": this.hallList[this.hall].id,
        isDepartment: this.studentORdept == "Student Body" ? 0 : 1,
        isStudent: this.studentORdept == "Department" ? 0 : 1,
        "user-id": this.data["user-id"]
      };
      console.log(booking);
      this.dialogRef.close(booking);
      /* "hall-id": "lct-hall-" + (hall + 1),
      "user-id": this.userinfo.getUserID(),
      date:
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      title: title,
      description: description,
      confirmed: 0,
      "start-time": startingTime,
      "end-time": endingTime,
      by: by,
      isStudent: studentORdept == "Student Body" ? 1 : 0,
      isDepartment: studentORdept == "Department" ? 1 : 0
    }; */
    } else {
      console.log(
        this.hall,
        "\n",
        this.date,
        "\n",
        this.startingTime,
        "\n",
        this.endingTime,
        "\n",
        this.title,
        "\n",
        this.description,
        "\n",
        this.by,
        "\n",
        this.studentORdept,
        "\n"
      );
    }
  }
}
