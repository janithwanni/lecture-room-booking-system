import { Component } from '@angular/core';
import { CurrenthallstatusComponent } from './currenthallstatus/currenthallstatus.component';
import { StatusatglanceComponent } from './statusatglance/statusatglance.component';


@Component({
  selector: 'bookings/statusview',
  templateUrl: './statusview.component.html',
  styleUrls: ['./statusview.component.css']
})
export class StatusviewComponent {
  
  StatusatglanceComponent = StatusatglanceComponent;
  CurrenthallstatusComponent = CurrenthallstatusComponent;
  cards = [
    { title: 'Status at a glance', cols: 3, rows: 1, component: StatusatglanceComponent},
    {title: 'Current hall status',cols:3,rows:1,component:CurrenthallstatusComponent},
    {title: 'Current hall status',cols:3,rows:1,component:CurrenthallstatusComponent}
  ];
}
