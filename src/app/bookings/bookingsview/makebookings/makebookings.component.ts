import { Component, OnInit, Input } from '@angular/core';
import { HallInfoManagerService } from '../../../shared/services/hall-info-manager.service';
import { Observable } from 'rxjs';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { AngularFireDatabase } from 'angularfire2/database';
import { MakeBookingRtdbService } from '../../services/make-booking-rtdb.service';
import { TimeslotManagerService } from '../../../shared/services/timeslot-manager.service';

@Component({
  selector: 'app-makebookings',
  templateUrl: './makebookings.component.html',
  styleUrls: ['./makebookings.component.scss']
})
export class MakebookingsComponent implements OnInit {

  minDate = new Date();
  maxDate = new Date(new Date().getFullYear()+1,new Date().getMonth(),new Date().getDay());
  
  items:Observable<any>;
  slots:Observable<any>;

  @Input() hall:string;
  @Input() date:Date;
  @Input() timeSlot:string[];
  @Input() title:string;
  @Input() description:string;

  selected = '1';
  constructor(private hallinfo:HallInfoManagerService,
              private timeslotmanager:TimeslotManagerService,
              private makebookings:MakeBookingRtdbService) {
    this.items = hallinfo.getHalls();
    this.slots = timeslotmanager.generateTimeslots();
    this.items.subscribe((value)=>{console.log(value)});
    
   
   }

  ngOnInit() {
  }

  pickDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = event.target.value
  }
  makeBookingClick(event){
    /*TODO add the validation stuff*/
    if(this.hall != null && this.date != null && this.timeSlot != null && this.title != null && this.description != null){
      this.makebookings.makeBookingsRecord(this.hall,this.date,this.timeSlot,this.title,this.description);
    }
    else{
      alert("Fill the rest of the contents");
    }
  }
}
