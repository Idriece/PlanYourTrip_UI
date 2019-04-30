import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// tslint:disable-next-line:max-line-length
import { AdminEditExistingHotelComponentComponent } from './admin-edit-existing-hotel-component/admin-edit-existing-hotel-component.component';
import { AdminViewHotelsComponent } from './admin-view-hotels/admin-view-hotels.component';
import { AdminAddNewHotelComponentComponent } from './admin-add-new-hotel-component/admin-add-new-hotel-component.component';

const routes: Routes = [
  {path: '', component: AdminViewHotelsComponent},
  {path: 'edit', component: AdminEditExistingHotelComponentComponent},
  {path: 'add', component: AdminAddNewHotelComponentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHotelManagementRoutingModule { }
