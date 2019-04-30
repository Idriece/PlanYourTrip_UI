import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelOwnerDefaultViewComponent } from 'src/app/Modules/hotel-owner/hotel-owner-default-view/hotel-owner-default-view.component';
import { HotelOwnerCheckInComponent } from 'src/app/Modules/hotel-owner/hotel-owner-check-in/hotel-owner-check-in.component';

const routes: Routes = [
  {path: '', component: HotelOwnerDefaultViewComponent},
  {path: 'checkin', component: HotelOwnerCheckInComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelOwnerRoutingModule { }
