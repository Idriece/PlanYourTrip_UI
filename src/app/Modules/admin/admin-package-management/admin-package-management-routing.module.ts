import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../admin-package-management/default/default.component';
import { PackagelistComponent } from '../admin-package-management/packagelist/packagelist.component';
import { CreatepackageComponent } from '../admin-package-management/createpackage/createpackage.component';
import { EditpackageComponent } from '../admin-package-management/editpackage/editpackage.component';

const routes: Routes = [
  {path : '', component: DefaultComponent},
  {path: 'createpackage', component: CreatepackageComponent},
  {path: 'packagelist', component: PackagelistComponent},
  {path: 'editpackage', component: EditpackageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPackageManagementRoutingModule { }
