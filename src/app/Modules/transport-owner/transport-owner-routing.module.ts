import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportviewComponent } from 'src/app/Modules/transport-owner/transportview/transportview.component';
// tslint:disable-next-line:max-line-length
import { TransportOwnerCheckInComponent } from 'src/app/Modules/transport-owner/transport-owner-check-in/transport-owner-check-in.component';

const routes: Routes = [
  { path: '', component: TransportviewComponent },
  { path: 'checkin', component: TransportOwnerCheckInComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportOwnerRoutingModule {}
