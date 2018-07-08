import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

const routes: Routes = [
  {path:'',pathMatch:'full',component:LoginDialogComponent},
  /*TODOs for future releases
  {path:'reset',component:ForgotPasswordComponent}
  possibly add a logout screen component
  */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
