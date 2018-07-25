import { Component, OnInit, ViewChild, DoCheck } from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { TrackbookingsDataSource } from "./trackbookings-datasource";
import { DatastoreManagerService } from "../../../shared/services/datastore-manager.service";
import { SearchbookingsRtdbService } from "../../services/searchbookings-rtdb.service";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Booking } from "../../../shared/models/booking";
import { BookingsOpsRtdbService } from "../../services/bookings-ops-rtdb.service";
import { of, Observable } from "rxjs";

@Component({
  selector: "bookings/bookingsview/trackbookings",
  templateUrl: "./trackbookings.component.html",
  styleUrls: ["./trackbookings.component.css"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class TrackbookingsComponent implements OnInit, DoCheck {
  constructor(
    public store: DatastoreManagerService,
    public search: SearchbookingsRtdbService,
    private ops: BookingsOpsRtdbService,
    private searchbookings: SearchbookingsRtdbService
  ) {}
  isFree: boolean;
  expandedBooking: Booking;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TrackbookingsDataSource;
  isSearched: Observable<boolean> = of(this.search.isDataSearched);
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["date", "start-time", "end-time", "by", "hall-id"];

  ngOnInit() {
    this.dataSource = new TrackbookingsDataSource(
      this.paginator,
      this.sort,
      this.store
    );
  }
  ngDoCheck() {
    this.isSearched = of(this.searchbookings.isDataSearched);

    if (this.searchbookings.isDataSearched == true) {
      this.isFree = true;
    } else {
      this.isFree = false;
    }
  }

  confirmBooking(booking: Booking) {
    this.ops.confirmBookings(booking);
  }

  deleteBooking(booking: Booking) {
    //open the are you sure dialog
    //run only when confirmed
    this.ops.deleteBooking(booking);
  }

  updateBooking(booking: Booking) {
    //open the update dialog
  }
}
