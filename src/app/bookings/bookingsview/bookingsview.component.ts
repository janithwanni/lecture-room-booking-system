import { Component } from "@angular/core";
import { MakebookingsComponent } from "./makebookings/makebookings.component";
import { TrackbookingsComponent } from "./trackbookings/trackbookings.component";

@Component({
  selector: "bookings/bookingsview",
  templateUrl: "./bookingsview.component.html",
  styleUrls: ["./bookingsview.component.css"]
})
export class BookingsviewComponent {
  MakebookingsComponent = MakebookingsComponent;
  TrackbookingsComponent = TrackbookingsComponent;
  cards = [
    {
      title: "Search bookings",
      cols: 1,
      rows: 2,
      component: MakebookingsComponent
    },
    {
      title: "Track bookings",
      cols: 1,
      rows: 2,
      component: TrackbookingsComponent
    }
  ];
}
