import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { AdminViewTransportationProviderCComponent } from './admin-view-transportation-provider-c/admin-view-transportation-provider-c.component';
// tslint:disable-next-line:max-line-length
import { AdminEditTransportationProviderCComponent } from './admin-edit-transportation-provider-c/admin-edit-transportation-provider-c.component';
// tslint:disable-next-line:max-line-length
import { AdminAddTransportationProviderCComponent } from './admin-add-transportation-provider-c/admin-add-transportation-provider-c.component';

const routes: Routes = [
  {path: '', component: AdminViewTransportationProviderCComponent},
  {path: 'edit', component: AdminEditTransportationProviderCComponent},
  {path: 'add', component: AdminAddTransportationProviderCComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTransportationManagementRoutingModule { }
