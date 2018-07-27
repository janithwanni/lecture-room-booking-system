import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BookingsviewComponent } from "./bookingsview/bookingsview.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  /* { path: "status", component: StatusviewComponent }, */
  { path: "main", component: BookingsviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule {}
