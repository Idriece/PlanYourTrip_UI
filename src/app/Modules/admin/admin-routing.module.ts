import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDefaultViewComponent } from '../admin/admin-default-view/admin-default-view.component';
import { CreatepackageComponent } from './admin-package-management/createpackage/createpackage.component';
import { BookingdateComponent } from 'src/app/Modules/admin/bookingdate/bookingdate.component';
const routes: Routes = [
  { path: '', component: AdminDefaultViewComponent },
  {
    path: 'package',
    loadChildren:
      './admin-package-management/admin-package-management.module#AdminPackageManagementModule'
  },
  {
    path: 'hotel',
    loadChildren:
      './admin-hotel-management/admin-hotel-management.module#AdminHotelManagementModule'
  },
  {
    path: 'trans',
    loadChildren:
      './admin-transportation-management/admin-transportation-management.module#AdminTransportationManagementModule'
  },
  {
    path: 'user',
    loadChildren:
      './admin-user-management/admin-user-management.module#AdminUserManagementModule'
  },
  { path: 'bookingdate', component: BookingdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
