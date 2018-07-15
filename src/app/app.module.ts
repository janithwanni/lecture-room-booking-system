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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    /*custom modules to import to app*/
    LoginModule,
    HomeModule,
    /*firebase injection and init app */
    AngularFireModule.initializeApp(environment.firebase),

    AppRoutingModule,

    BrowserAnimationsModule
  ],
  providers: [AngularFireDatabase, DataStore],
  bootstrap: [AppComponent]
})
export class AppModule {}
