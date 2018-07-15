import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TrackbookingsDataSource } from './trackbookings-datasource';

@Component({
  selector: 'bookings/bookingsview/trackbookings',
  templateUrl: './trackbookings.component.html',
  styleUrls: ['./trackbookings.component.css']
})
export class TrackbookingsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TrackbookingsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new TrackbookingsDataSource(this.paginator, this.sort);
  }
}
