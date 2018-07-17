import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { TrackbookingsDataSource } from "./trackbookings-datasource";
import { DatastoreManagerService } from "../../../shared/services/datastore-manager.service";
import { SearchbookingsRtdbService } from "../../services/searchbookings-rtdb.service";
import { Time } from "../../../shared/models/time";
import { Hall } from "../../../shared/models/hall";

@Component({
  selector: "bookings/bookingsview/trackbookings",
  templateUrl: "./trackbookings.component.html",
  styleUrls: ["./trackbookings.component.css"]
})
export class TrackbookingsComponent implements OnInit {
  /* tableTimeList: Time[];
  tableHallList: Hall[]; */
  constructor(
    public store: DatastoreManagerService,
    public search: SearchbookingsRtdbService
  ) {
    /* this.store.getHallList().subscribe(value => {
      this.tableHallList = value;
    });
    this.store.getTimeList().subscribe(value => {
      this.tableTimeList = value;
    }); */
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TrackbookingsDataSource;
  isSearched: boolean = this.search.isDataSearched;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["date", "start-time", "end-time", "by", "hall-id"];

  ngOnInit() {
    this.dataSource = new TrackbookingsDataSource(
      this.paginator,
      this.sort,
      this.store
    );
  }
}
