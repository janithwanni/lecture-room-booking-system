import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { DatastoreManagerService } from "../../shared/services/datastore-manager.service";
import { User } from "../../shared/models/user";
import { AngularFireDatabase } from "angularfire2/database";
@Injectable({
  providedIn: "root"
})
export class UserauthService {
  firebaseUser: Observable<firebase.User>;
  constructor(
    public ngFireAuth: AngularFireAuth,
    private router: Router,
    private store: DatastoreManagerService,
    private db: AngularFireDatabase
  ) {
    //angular fire auth is a service used to do the auth processes
    this.firebaseUser = ngFireAuth.authState;
  }

  fireLogin(email: string, password: string) {
    this.ngFireAuth.auth
      .setPersistence("local")
      .then(() => {
        return this.ngFireAuth.auth
          .signInWithEmailAndPassword(email, password)
          .then(value => {
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
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ERROR: " + errorCode + " ===> " + errorMessage);
          });
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ERROR: " + errorCode + " ===> " + errorMessage);
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
