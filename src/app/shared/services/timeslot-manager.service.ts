import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeslotManagerService {

  constructor(private db:AngularFireDatabase) { }

  generateTimeslots():Observable<any>{
    return this.db.list('/root/timeslots').valueChanges();
  }
}
