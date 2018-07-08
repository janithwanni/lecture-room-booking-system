import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { take, takeLast } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HallInfoManagerService {

  constructor(private db: AngularFireDatabase) { }

  getTimeSlot(): string{
    return null;
  }
  getFreeHalls(year:string,month:string,day:string): Observable<any>{
    //retrieves the number of halls free right now at the given day
    return null;
  }

  getHalls():Observable<any>{
    var items:Observable<any> = this.db.list('/root/lecture-halls').valueChanges();
    return items;
  }
  
}
