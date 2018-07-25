import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

/*custom module imports*/
import { LoginModule } from "./login/login.module";
import { HomeModule } from "./home/home.module";
/*angular fire module import */
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { AngularFireDatabase } from "angularfire2/database";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DataStore } from "./shared/models/data-store";
import { MatDialogModule, MatDialog } from "@angular/material";

import { BookingsModule } from "./bookings/bookings.module";
import { ConfirmDialogComponent } from "./bookings/dialogs/confirm-dialog/confirm-dialog.component";

@NgModule({
  entryComponents: [ConfirmDialogComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    /*custom modules to import to app*/
    BookingsModule,
    LoginModule,
    HomeModule,

    /*firebase injection and init app */
    AngularFireModule.initializeApp(environment.firebase),
    MatDialogModule,
    AppRoutingModule,

    BrowserAnimationsModule
  ],
  providers: [AngularFireDatabase, DataStore, MatDialogModule, MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule {}
