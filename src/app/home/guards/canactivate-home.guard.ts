import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserauthService } from '../../login/services/userauth.service';

@Injectable({
  providedIn: 'root'
})
export class CanactivateHomeGuard implements CanActivate {

  constructor(private userauth: UserauthService,private router: Router){

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log("entering can activate method at least");
      if(this.userauth.firebaseUser != null){
        console.log("firebase user exists");
        return true;
      }else{
        return false;
      }
      
      

      
    
  }
}
