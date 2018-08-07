import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
/*login imports*/
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";
/*material imports*/
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
/*firebase imports*/
import { AngularFireAuth } from "angularfire2/auth";
import { UserauthService } from "./services/userauth.service";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginDialogComponent } from "./login-dialog/login-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    HttpClientModule,
    /*material imports */
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    LoginRoutingModule
  ],
  providers: [UserauthService, AngularFireAuth],
  declarations: [LoginDialogComponent]
})
export class LoginModule {}
