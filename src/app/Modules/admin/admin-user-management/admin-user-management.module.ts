import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminUserManagementRoutingModule } from './admin-user-management-routing.module';
import { ChangeRoleComponent } from '../../../Modules/admin/admin-user-management/change-role/change-role.component';
// tslint:disable-next-line:max-line-length
import {
  MatDialogRef,
  MatSortModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatGridListModule,
  // tslint:disable-next-line:max-line-length
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatTabsModule,
  MatChipsModule,
  MatRadioModule,
  // tslint:disable-next-line:max-line-length
  MatDialogModule,
  MatSnackBarModule,
  MatIconModule,
  MatTooltipModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatTreeModule
} from '@angular/material/';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { UserlistComponent } from './userlist/userlist.component';
import { DefaultAdminUserComponent } from './default-admin-user/default-admin-user.component';

@NgModule({
  imports: [
    CommonModule,
    AdminUserManagementRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatListModule,
    MatGridListModule,
    MatRadioModule,
    FormsModule,
    MatPaginatorModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatTreeModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  entryComponents: [ChangeRoleComponent, EditRoleComponent],
  declarations: [
    ChangeRoleComponent,
    EditRoleComponent,
    UserlistComponent,
    DefaultAdminUserComponent
  ]
})
export class AdminUserManagementModule {}
