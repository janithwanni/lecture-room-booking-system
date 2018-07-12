import { Component, OnInit, Input } from "@angular/core";
import { HallInfoManagerService } from "../../../shared/services/hall-info-manager.service";
import { Observable, of } from "rxjs";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { AngularFireDatabase } from "angularfire2/database";
import { MakeBookingRtdbService } from "../../services/make-booking-rtdb.service";
import { TimeslotManagerService } from "../../../shared/services/timeslot-manager.service";

@Component({
  selector: "app-makebookings",
  templateUrl: "./makebookings.component.html",
  styleUrls: ["./makebookings.component.scss"]
})
export class MakebookingsComponent implements OnInit {
  minDate = new Date();
  maxDate = new Date(
    new Date().getFullYear() + 1,
    new Date().getMonth(),
    new Date().getDay()
  );

  items: Observable<any>;
  endTime: Observable<string[]>;
  startTime: Observable<string[]>;
  isFree: Observable<boolean> = of(false);
  studOrDeptOptions: string[] = ["Student Body", "Department"];

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
    private makebookings: MakeBookingRtdbService
  ) {
    this.items = hallinfo.getHalls();

    this.startTime = this.timeslotmanager.generateStartTimes();
    this.endTime = this.timeslotmanager.generateEndTimes();
    const d = new Date();
    this.hallinfo.getBookingsInRange(
      d.getFullYear() + "",
      d.getMonth() + "",
      d.getDate() + "",
      this.hall,
      this.startingTime,
      this.endingTime
    );
  }

  ngOnInit() {}

  pickDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = event.target.value;
  }
  makeBookingClick(event) {
    if (
      this.hall != null &&
      this.date != null &&
      this.startingTime != null &&
      this.endingTime != null &&
      this.title != null &&
      this.description != null &&
      this.by != null &&
      this.studentORdept != null
    ) {
      this.makebookings.makeBookingsRecord(
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
  }
}
/*TODO add the validation stuff*/
/* if(this.hall != null && this.date != null && this.timeSlot != null && this.title != null && this.description != null){
      this.makebookings.makeBookingsRecord(this.hall,this.date,this.timeSlot,this.title,this.description);
    }
    else{
      alert("Fill the rest of the contents");
    } */
