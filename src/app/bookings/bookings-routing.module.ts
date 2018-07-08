import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusviewComponent } from './statusview/statusview.component';
import { BookingsviewComponent } from './bookingsview/bookingsview.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'status'},
  {path:'status',component:StatusviewComponent},
  {path:'main',component:BookingsviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
