import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminPackageManagementRoutingModule } from './admin-package-management-routing.module';
import { PackagelistComponent } from './packagelist/packagelist.component';
import { CreatepackageComponent } from './createpackage/createpackage.component';
import { EditpackageComponent } from './editpackage/editpackage.component';
import { DefaultComponent } from './default/default.component';
import {
  MatToolbarModule,
  MatTabsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatInputModule,
  MatBadgeModule,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatButtonModule,
  MatGridListModule,
  MatGridList,
  MatGridTile,
  MatTooltipModule,
  // tslint:disable-next-line:max-line-length
  MatCardModule,
  MatTableModule,
  MatCheckboxModule,
  MatSortModule,
  MatStepperModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatPaginatorModule
} from '@angular/material';
import { PackagetypeComponent } from './packagetype/packagetype.component';
import { SuccessmessageComponent } from './successmessage/successmessage.component';

@NgModule({
  imports: [
    CommonModule,
    AdminPackageManagementRoutingModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatStepperModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatPaginatorModule
  ],
  declarations: [
    PackagelistComponent,
    CreatepackageComponent,
    EditpackageComponent,
    DefaultComponent,
    PackagetypeComponent,
    SuccessmessageComponent
  ],
  entryComponents: [
    DefaultComponent,
    CreatepackageComponent,
    EditpackageComponent,
    PackagetypeComponent,
    SuccessmessageComponent
  ]
})
export class AdminPackageManagementModule {}
