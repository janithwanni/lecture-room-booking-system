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
import { User } from "../../shared/models/user";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "home/mainview",
  templateUrl: "./mainview.component.html",
  styleUrls: ["./mainview.component.css"]
})
export class MainviewComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  username: Observable<string>;
  usernameStr: Observable<User>;
  /* username: string; */
  constructor(
    private breakpointObserver: BreakpointObserver,
    private userauth: UserauthService,
    private userinfo: UserInfoManagerService,
    private store: DatastoreManagerService,
    private db: AngularFireDatabase
  ) {
    this.username = this.userinfo.getUsername();
    this.usernameStr = this.store.getCurrentUser();
    this.usernameStr.subscribe(data => {
      if (data.uid === " ") {
        this.userauth.firebaseUser.subscribe(auth => {
          this.db
            .list("/root/users/" + auth.uid + "/")
            .snapshotChanges()
            .subscribe(values => {
              let name: string, level: string;
              for (let data of values) {
                name =
                  data.payload.key == "name" ? data.payload.val() + "" : name;
                level =
                  data.payload.key == "level" ? data.payload.val() + "" : level;
              }
              this.store.setCurrentUser({
                uid: auth.uid,
                username: name,
                level: level,
                email: auth.email
              });
            });
          this.usernameStr = this.store.getCurrentUser();
        });
      } else {
        this.usernameStr = this.store.getCurrentUser();
      }
    });
    /* this.username = this.store.getCurrentUser().getUserName().toString(); */
    /* console.log(this.username); */
    /* this.username = "apples"; */
  }

  fireLogout() {
    this.userauth.fireLogout();
  }
}
