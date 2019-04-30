import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminHotelManagementRoutingModule } from './admin-hotel-management-routing.module';
import { AdminHotelManagementDefaultViewComponent } from './admin-hotel-management-default-view.component';
import { MatButtonModule, MatProgressBarModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { AdminViewHotelsComponent } from './admin-view-hotels/admin-view-hotels.component';
import { AdminAddNewHotelComponentComponent } from './admin-add-new-hotel-component/admin-add-new-hotel-component.component';
// tslint:disable-next-line:max-line-length
import { AdminEditExistingHotelComponentComponent } from './admin-edit-existing-hotel-component/admin-edit-existing-hotel-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
// tslint:disable-next-line:quotemark
import { AdminManageHotelService } from "src/app/Modules/admin/admin-hotel-management/AdminHotelService/admin-manage-hotel.service";
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    AdminHotelManagementRoutingModule,
    MatButtonModule,
    MatTabsModule,
    MatTooltipModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    MatPaginatorModule
  ],
  providers: [AdminManageHotelService],
  declarations: [
    AdminHotelManagementDefaultViewComponent,
    AdminViewHotelsComponent,
    AdminAddNewHotelComponentComponent,
    AdminEditExistingHotelComponentComponent
  ],
  entryComponents: [
    AdminEditExistingHotelComponentComponent,
    AdminAddNewHotelComponentComponent
  ]
})
export class AdminHotelManagementModule {}
