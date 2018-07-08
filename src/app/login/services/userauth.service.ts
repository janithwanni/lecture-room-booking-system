import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class UserauthService {

  firebaseUser : Observable<firebase.User>;
  constructor(public ngFireAuth: AngularFireAuth,
              private router: Router) {
    //angular fire auth is a service used to do the auth processes
    this.firebaseUser = ngFireAuth.authState;
   }

   fireLogin(email: string, password: string){
     this.ngFireAuth.auth.setPersistence("local")
        .then(()=>{
          return this.ngFireAuth.auth.signInWithEmailAndPassword(email,password)
          .then(value=>{
                    console.log("logging in");
                    //navigate to the homepage URL
                    this.router.navigateByUrl('/home/bookings/status');
                  }
                )
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ERROR: "+errorCode+" ===> "+errorMessage);
          });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("ERROR: "+  errorCode+" ===> "+errorMessage);
        });
     
   }

   fireLogout(){
     this.ngFireAuth.auth.signOut()
          .then(value=>{
            this.router.navigateByUrl('/login');
          }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ERROR: "+errorCode+" ===> "+errorMessage); 
          });
     /*  this.router.navigateByUrl('/login');
      this.ngFireAuth.auth.signOut().then(value=>{console.log('value is ?'+value);}).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ERROR: "+errorCode+" ===> "+errorMessage); 
      }); */
   }



}
