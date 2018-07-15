import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BookingsRoutingModule } from "./bookings-routing.module";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatDividerModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from "@angular/material";
import { MatBadgeModule } from "@angular/material/badge";
import { MatRadioModule } from "@angular/material/radio";
/*components imported */
/* import { StatusviewComponent } from './statusview/statusview.component'; */
import { BookingsviewComponent } from "./bookingsview/bookingsview.component";
import { MakebookingsComponent } from "./bookingsview/makebookings/makebookings.component";
import { TrackbookingsComponent } from "./bookingsview/trackbookings/trackbookings.component";

@NgModule({
  entryComponents: [MakebookingsComponent, TrackbookingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*routing module */
    BookingsRoutingModule,
    /*material imports */
    MatRadioModule,
    CdkTableModule,
    CdkTreeModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatDividerModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    /*components to display */
    BookingsviewComponent,
    MakebookingsComponent,
    TrackbookingsComponent
  ]
})
export class BookingsModule {}
