import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeRoleComponent } from 'src/app/Modules/admin/admin-user-management/change-role/change-role.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { EditRoleComponent } from 'src/app/Modules/admin/admin-user-management/edit-role/edit-role.component';
import { UserlistComponent } from 'src/app/Modules/admin/admin-user-management/userlist/userlist.component';
import { DefaultAdminUserComponent } from 'src/app/Modules/admin/admin-user-management/default-admin-user/default-admin-user.component';
const routes: Routes = [
  { path: '', component: DefaultAdminUserComponent},
  { path: 'changerole', component: ChangeRoleComponent},
  { path: 'userlist', component: UserlistComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserManagementRoutingModule { }
