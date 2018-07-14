import { Component } from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { Observable, Observer } from "rxjs";
import { map } from "rxjs/operators";
import { UserauthService } from "../../login/services/userauth.service";
import { UserInfoManagerService } from "../../shared/services/user-info-manager.service";
import { DatastoreManagerService } from "../../shared/services/datastore-manager.service";

@Component({
  selector: "home/mainview",
  templateUrl: "./mainview.component.html",
  styleUrls: ["./mainview.component.css"]
})
export class MainviewComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  /* username: Observable<string>;   */
  username: string;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private userauth: UserauthService,
    private userinfo: UserInfoManagerService,
    private store: DatastoreManagerService
  ) {
    /* this.username = this.userinfo.getUsername(); */
    console.log(this.store.getCurrentUser().getUserName());
    this.username = this.store.getCurrentUser().getUserName().toString();
    /* console.log(this.username); */
    /* this.username = "apples"; */
  }

  fireLogout() {
    this.userauth.fireLogout();
  }
}
