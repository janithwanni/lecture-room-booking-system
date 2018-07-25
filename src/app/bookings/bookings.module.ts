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
import { MatExpansionModule } from "@angular/material/expansion";
import { MatBadgeModule } from "@angular/material/badge";
import { MatRadioModule } from "@angular/material/radio";
import { MatDialogModule } from "@angular/material/dialog";
/*components imported */
/* import { StatusviewComponent } from './statusview/statusview.component'; */
import { BookingsviewComponent } from "./bookingsview/bookingsview.component";
import { MakebookingsComponent } from "./bookingsview/makebookings/makebookings.component";
import { TrackbookingsComponent } from "./bookingsview/trackbookings/trackbookings.component";
import { ConfirmDialogComponent } from "./dialogs/confirm-dialog/confirm-dialog.component";
import { UpdateDialogComponent } from "./dialogs/update-dialog/update-dialog.component";

@NgModule({
  entryComponents: [
    MakebookingsComponent,
    TrackbookingsComponent,
    ConfirmDialogComponent,
    UpdateDialogComponent
  ],
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
    MatSortModule,
    MatExpansionModule,
    MatDialogModule
  ],
  declarations: [
    /*components to display */
    BookingsviewComponent,
    MakebookingsComponent,
    TrackbookingsComponent,
    ConfirmDialogComponent,
    UpdateDialogComponent
  ]
})
export class BookingsModule {}
