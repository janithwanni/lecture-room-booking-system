import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { merge, Observable, of } from "rxjs";
import { startWith, switchMap, flatMap, catchError, map } from "rxjs/operators";
import { ModifybookingsRtdbService } from "../../services/modifybookings-rtdb.service";
import { TableRow } from "./modifybookings-data-interface";
import { ModifybookingsCdkDatasource } from "./modifybookings-cdk-datasource";
@Component({
  selector: "app-trackbookings",
  templateUrl: "./trackbookings.component.html",
  styleUrls: ["./trackbookings.component.scss"]
})
export class TrackbookingsComponent implements OnInit {
  displayedColumns: string[] = [
    "title",
    "hall",
    "date",
    "starttime",
    "confirmed",
    "modify"
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  data: ModifybookingsCdkDatasource;

  constructor(private modbook: ModifybookingsRtdbService) {}

  ngOnInit() {
    this.data = new ModifybookingsCdkDatasource(this.modbook);
    this.data.loadRow();
  }
} /* .subscribe(data=>{this.data = data;console.log(this.data)}); */
//data:Observable<TableRow[]>;
/* this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0); */
/* this.data = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(()=>{return this.modbook.makeRows()})        
      ) */
/* columns to display are
['title','hall','date','starttime','confirmed','modify'];
*/
