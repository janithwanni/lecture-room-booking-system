import { Component, OnInit, Input, DoCheck } from "@angular/core";
import { HallInfoManagerService } from "../../../shared/services/hall-info-manager.service";
import { Observable, of } from "rxjs";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MakeBookingRtdbService } from "../../services/make-booking-rtdb.service";
import { TimeslotManagerService } from "../../../shared/services/timeslot-manager.service";
import { SearchbookingsRtdbService } from "../../services/searchbookings-rtdb.service";
import { count } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";
import { Booking } from "../../../shared/models/booking";

@Component({
  selector: "app-makebookings",
  templateUrl: "./makebookings.component.html",
  styleUrls: ["./makebookings.component.scss"]
})
export class MakebookingsComponent implements OnInit, DoCheck {
  minDate = new Date();
  maxDate = new Date(
    new Date().getFullYear() + 1,
    new Date().getMonth(),
    new Date().getDay()
  );

  items: Observable<any>;
  endTime: Observable<string[]>;
  startTime: Observable<string[]>;

  studOrDeptOptions: string[] = ["Student Body", "Department"];
  isFree = false;
  madeBooking = false;
  @Input() hall: string;
  @Input() date: Date;
  @Input() startingTime: string;
  @Input() endingTime: string;
  @Input() title: string;
  @Input() description: string;
  @Input() by: string;
  @Input() studentORdept: string;

  constructor(
    private hallinfo: HallInfoManagerService,
    private timeslotmanager: TimeslotManagerService,
    private makebookings: MakeBookingRtdbService,
    private searchbookings: SearchbookingsRtdbService,
    private snackbar: MatSnackBar
  ) {
    this.items = hallinfo.getHalls();
    this.timeslotmanager.generateTimeLists();
    this.startTime = this.timeslotmanager.generateStartTimes();
    this.endTime = this.timeslotmanager.generateEndTimes();
    this.hallinfo.generateHallList();
  }

  ngDoCheck() {
    /* console.log(
      "DO CHECK" +
        this.madeBooking +
        "," +
        this.searchbookings.isDataSearched +
        "," +
        this.searchbookings.hasConfirmedBooking
    ); */
    if (
      this.madeBooking == false &&
      this.searchbookings.isDataSearched == true &&
      this.searchbookings.hasConfirmedBooking == false
    ) {
      this.isFree = true;
    } else {
      this.isFree = false;
    }
  }
  ngOnInit() {}

  pickDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = event.target.value;
  }

  searchBookings() {
    const month = this.date.getMonth() + 1;
    let listHall = [this.hall];
    //switching to stage 1
    this.madeBooking = false;
    this.searchbookings.isDataSearched = false;
    this.searchbookings.hasConfirmedBooking = false;

    this.searchbookings.bookingListCompiled = [];
    const list = this.searchbookings.getBookingsInRangeDev(
      this.date.getFullYear() + "",
      month + "",
      this.date.getDate() + "",
      listHall,
      this.startingTime,
      this.endingTime
    );
    //scenario 1 search from date
    //search all halls and all times
    //scenario 2 search with date and time
    //search all halls
    //scenario 3 search with hall
    //search on today with all times
    //scenario 4 search with hall date
    //search on hall and all times
    //scenario 5 search with hall time
    //search on hall and today
    //scenario 6 search with hall date and time
    //normal search
  }
  makeBookingClick(event) {
    if (
      this.hall != null &&
      this.date != null &&
      this.date <= this.maxDate &&
      this.date >= this.minDate &&
      this.startingTime != null &&
      this.endingTime != null &&
      this.startingTime < this.endingTime // lets make the following terms optional &&
      /* this.title != null &&
      this.description != null &&
      this.by != null &&
      this.studentORdept != null */
    ) {
      this.title = this.title == null ? "undefined" : this.title;
      this.description =
        this.description == null ? "undefined" : this.description;
      this.by = this.by == null ? "undefined" : this.by;
      this.studentORdept =
        this.studentORdept == null ? "Student Body" : this.studentORdept;
      const startingTimeText =
        +this.startingTime < 10
          ? "time-0" + this.startingTime
          : "time-" + this.startingTime;
      const endTimeText =
        +this.endingTime < 10
          ? "time-0" + this.endingTime
          : "time-" + this.endingTime;
      this.makebookings.makeBookingsRecord(
        this.hall,
        this.date,
        startingTimeText,
        endTimeText,
        this.by,
        this.studentORdept,
        this.title,
        this.description
      );
      //switching to stage 4
      this.madeBooking = true;
      this.searchbookings.isDataSearched = false;
      this.searchbookings.hasConfirmedBooking = false;

      let snackBarRef = this.snackbar.open(
        "Made Booking Successfulyy",
        "Dismiss"
      );
      snackBarRef.onAction().subscribe(() => {
        snackBarRef.dismiss();
      });
    } else {
      console.log("error found");
      console.log(
        this.hall,
        this.date,
        this.startingTime,
        this.endingTime,
        this.by,
        this.studentORdept,
        this.title,
        this.description
      );
      let snackBarRef = this.snackbar.open(
        "Required Data not filled",
        "Dismiss"
      );
      snackBarRef.onAction().subscribe(() => {
        snackBarRef.dismiss();
      });
    }
    //disable make booking panel

    //recall the searchbookings function to reload the database
    /* const month = this.date.getMonth() + 1;
    let listHall = [this.hall];
    const list = this.searchbookings.getBookingsInRangeDev(
      this.date.getFullYear() + "",
      month + "",
      this.date.getDate() + "",
      listHall,
      this.startingTime,
      this.endingTime
    ); */
  }
}
/*TODO add the validation stuff*/
/* if(this.hall != null && this.date != null && this.timeSlot != null && this.title != null && this.description != null){
      this.makebookings.makeBookingsRecord(this.hall,this.date,this.timeSlot,this.title,this.description);
    }
    else{
      alert("Fill the rest of the contents");
    } */
