import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {flatMap, map} from 'rxjs/operators';
import { AngularFireDatabase , DatabaseSnapshot} from 'angularfire2/database';
import { UserauthService } from '../../login/services/userauth.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoManagerService {

  authstate: any = null;
  constructor(private db: AngularFireDatabase,
              public userauth: UserauthService) { }
  
  getUserID():string{
    return this.userauth.ngFireAuth.auth.currentUser.uid;
  }
  getUsername() : Observable<any>{
    return this.userauth.firebaseUser.pipe(flatMap(auth =>  this.db.object('root/users/'+auth.uid+'/name').valueChanges() ));
  }

  isLoggedin(): Observable<boolean>{
    return this.userauth.firebaseUser.pipe(map(auth=>auth!==null ? true : false));
  }

  
}
