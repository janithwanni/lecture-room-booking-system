import { Component, OnInit, Input } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { UserauthService } from "../services/userauth.service";
import { Observable, of } from "rxjs";

//class used to define the errors from mistyped email addresses
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-login-dialog",
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["./login-dialog.component.scss"]
})
export class LoginDialogComponent implements OnInit {
  @Input() email: string;
  @Input() password: string;
  emailFormControl;
  matcher;
  isLoaded: Observable<boolean> = of(false);
  loadLevel: number;
  constructor(private auth: UserauthService) {
    //email form control
    this.emailFormControl = new FormControl("", [
      Validators.required,
      Validators.email
    ]);

    //finding error state of email
    this.matcher = new MyErrorStateMatcher();
  }

  fireLogin(email: string, password: string) {
    //call login method from service
    console.log("tis the email " + email + " tis the password " + password);

    this.auth.fireLogin(email, password);
  }

  ngOnInit() {}
}
