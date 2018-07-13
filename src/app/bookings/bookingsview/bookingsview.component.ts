import { Component } from "@angular/core";
import { MakebookingsComponent } from "./makebookings/makebookings.component";
import { ShowbookingsComponent } from "./showbookings/showbookings.component";

@Component({
  selector: "bookings/bookingsview",
  templateUrl: "./bookingsview.component.html",
  styleUrls: ["./bookingsview.component.css"]
})
export class BookingsviewComponent {
  MakebookingsComponent = MakebookingsComponent;
  ShowbookingsComponent = ShowbookingsComponent;
  cards = [
    {
      title: "Make bookings",
      cols: 1,
      rows: 1,
      component: MakebookingsComponent
    },
    {
      title: "Track bookings",
      cols: 1,
      rows: 2,
      component: ShowbookingsComponent
    }
  ];
}
