import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { DatastoreManagerService } from "../../shared/services/datastore-manager.service";
import { AngularFireDatabase } from "angularfire2/database";
import { MatSnackBar } from "@angular/material";
@Injectable({
  providedIn: "root"
})
export class UserauthService {
  firebaseUser: Observable<firebase.User>;
  loadingStatus: string = "WAITING";
  constructor(
    public ngFireAuth: AngularFireAuth,
    private router: Router,
    private store: DatastoreManagerService,
    private db: AngularFireDatabase,
    private snackbar: MatSnackBar
  ) {
    //angular fire auth is a service used to do the auth processes
    this.firebaseUser = ngFireAuth.authState;
  }

  fireLogin(email: string, password: string) {
    this.ngFireAuth.auth
      .setPersistence("local")
      .then(() => {
        let snackBarRef = this.snackbar.open("Signing in to the System");
        return this.ngFireAuth.auth
          .signInWithEmailAndPassword(email, password)
          .then(value => {
            snackBarRef.dismiss();
            this.db
              .list("/root/users/" + value.user.uid + "/")
              .snapshotChanges()
              .subscribe(values => {
                let name: string, level: string;
                for (let data of values) {
                  name =
                    data.payload.key == "name" ? data.payload.val() + "" : name;
                  level =
                    data.payload.key == "level"
                      ? data.payload.val() + ""
                      : level;
                }
                this.store.setCurrentUser({
                  uid: value.user.uid,
                  username: name,
                  level: level,
                  email: value.user.email
                });
                //navigate to the homepage URL
                this.router.navigateByUrl("/home/bookings/main");
              });
          })
          .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ERROR: " + errorCode + " ===> " + errorMessage);
            let snackbarRef = this.snackbar.open(
              "Error: Error Message: " + error.message
            );
          });
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ERROR: " + errorCode + " ===> " + errorMessage);
        let snackbarRef = this.snackbar.open(
          "Error: Error Message: " + error.message
        );
      });
  }

  fireLogout() {
    this.ngFireAuth.auth
      .signOut()
      .then(value => {
        this.router.navigateByUrl("/login");
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ERROR: " + errorCode + " ===> " + errorMessage);
      });
    /*  this.router.navigateByUrl('/login');
      this.ngFireAuth.auth.signOut().then(value=>{console.log('value is ?'+value);}).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ERROR: "+errorCode+" ===> "+errorMessage); 
      }); */
  }
}
