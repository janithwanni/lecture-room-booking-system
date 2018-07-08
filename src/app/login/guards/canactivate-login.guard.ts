import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserauthService } from '../services/userauth.service';

@Injectable({
  providedIn: 'root'
})
export class CanactivateLoginGuard implements CanActivate {

  constructor(private userauth: UserauthService,private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log("entering can activate method at least");
      if(this.userauth.firebaseUser){ //firebase user exists
        console.log("firebase user available");
        this.router.navigateByUrl('/home/bookings/status');
        return false;
      }else{
        console.log("firebase user not available YET");
        return true;
      }
      
  }
}
