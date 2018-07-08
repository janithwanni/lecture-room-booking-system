import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainviewComponent } from './home/mainview/mainview.component';
import { CanactivateLoginGuard } from './login/guards/canactivate-login.guard';
import { CanactivateHomeGuard } from './home/guards/canactivate-home.guard';

const routes: Routes = [
  {path:'login',loadChildren:'app/login/login.module#LoginModule'},
  {path:'home',component:MainviewComponent,
        children:[
          {path:'bookings',loadChildren:'app/bookings/bookings.module#BookingsModule'}
          
          
        ]},
  {path:'',redirectTo:'/login/',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/* {path:'login',loadChildren:'app/login/login.module#LoginModule',canActivate:[CanactivateLoginGuard]},
  {path:'home',component:MainviewComponent,canActivate:[CanactivateHomeGuard],
        children:[
          {path:'bookings',loadChildren:'app/bookings/bookings.module#BookingsModule'}
          
          
        ]},
  {path:'',redirectTo:'/login/',pathMatch:'full'} */