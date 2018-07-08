import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserInfoManagerService } from '../../shared/services/user-info-manager.service';

@Injectable({
  providedIn: 'root'
})
export class MakeBookingRtdbService {

  constructor(private db:AngularFireDatabase,private userinfo:UserInfoManagerService) { }
  /*
  @Input() hall:string;
  @Input() date:Date;
  @Input() timeSlot:string[];
  @Input() title:string;
  @Input() description:string;
  */
 /*
 "main-bookings":{
      "bkn-1":{
        "hall-id":"lct-hall-1",
        "timeslots":{
          "push-id1":"time-slt-1",
          "push-id2":"time-slt-2"
        },
        "user-id":"5KZKcCq8ZjWyCrZKoxQJAuWlOFa2",
        "date":"YYYY-MM-DD",
        "title":"title",
        "description":"description",
        "confirmed":0,
        "timestamp":21342352
      }
    }
 */
  makeBookingsRecord(hall:string,date:Date,timeSlot:string[],title:string,description:string){
      var push = {"hall-id":"lct-hall-"+hall,
                  "user-id":this.userinfo.getUserID(),
                  "date":date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate(),
                  "title":title,
                  "description":description,
                  "confirmed":0,
                  "timestamp":new Date().getTime(),
                  "timeslots":0
                };
      var newbookingref = this.db.list('/root/main-bookings').push(push);
      for(let timeslot of timeSlot){
        var timetext = +timeslot < 10 ? "time-0"+timeslot:"time-"+timeslot;
        this.db.list('/root/main-bookings/'+newbookingref.key+'/timeslots').push(timetext);
        this.db.list('/root/hall-bookings/lct-hall-'+hall+'/'+date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate()+'/').set(timetext,newbookingref.key);
        this.db.list('/root/time-bookings/'+date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate()+'/'+timetext+'/').set('lct-hall-'+hall,newbookingref.key);
      }
      this.db.list('/root/user-bookings/'+this.userinfo.getUserID()+'/unconfirmed').push(newbookingref.key);
      
      


  }
}
