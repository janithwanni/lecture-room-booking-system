import { Component, OnInit, Input, DoCheck } from "@angular/core";
import { HallInfoManagerService } from "../../../shared/services/hall-info-manager.service";
import { Observable, of } from "rxjs";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MakeBookingRtdbService } from "../../services/make-booking-rtdb.service";
import { TimeslotManagerService } from "../../../shared/services/timeslot-manager.service";
import { SearchbookingsRtdbService } from "../../services/searchbookings-rtdb.service";

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
    private hallinfo: HallInfoManagerService,
    private timeslotmanager: TimeslotManagerService,
    private makebookings: MakeBookingRtdbService,
    private searchbookings: SearchbookingsRtdbService
  ) {
    this.items = hallinfo.getHalls();
    this.timeslotmanager.generateTimeLists();
    this.startTime = this.timeslotmanager.generateStartTimes();
    this.endTime = this.timeslotmanager.generateEndTimes();
    this.hallinfo.generateHallList();
  }

  ngDoCheck() {
    if (this.searchbookings.isDataSearched == true) {
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
    const list = this.searchbookings.getBookingsInRange(
      this.date.getFullYear() + "",
      month + "",
      this.date.getDate() + "",
      this.hall,
      this.startingTime,
      this.endingTime
    );
  }
  makeBookingClick(event) {
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
    }

    //recall the searchbookings function to reload the database
    const month = this.date.getMonth() + 1;
    const list = this.searchbookings.getBookingsInRange(
      this.date.getFullYear() + "",
      month + "",
      this.date.getDate() + "",
      this.hall,
      this.startingTime,
      this.endingTime
    );

    this.isFree = false;
  }
}
/*TODO add the validation stuff*/
/* if(this.hall != null && this.date != null && this.timeSlot != null && this.title != null && this.description != null){
      this.makebookings.makeBookingsRecord(this.hall,this.date,this.timeSlot,this.title,this.description);
    }
    else{
      alert("Fill the rest of the contents");
    } */
