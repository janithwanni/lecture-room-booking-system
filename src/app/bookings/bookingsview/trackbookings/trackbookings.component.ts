import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { TrackbookingsDataSource } from "./trackbookings-datasource";
import { DatastoreManagerService } from "../../../shared/services/datastore-manager.service";

@Component({
  selector: "bookings/bookingsview/trackbookings",
  templateUrl: "./trackbookings.component.html",
  styleUrls: ["./trackbookings.component.css"]
})
export class TrackbookingsComponent implements OnInit {
  constructor(public store: DatastoreManagerService) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TrackbookingsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["by", "title", "description"];

  ngOnInit() {
    this.dataSource = new TrackbookingsDataSource(
      this.paginator,
      this.sort,
      this.store
    );
  }
}
