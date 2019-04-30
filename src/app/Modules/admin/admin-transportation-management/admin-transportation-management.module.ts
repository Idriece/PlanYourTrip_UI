import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { MatButtonModule, MatGridListModule , MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule, MatProgressBarModule} from '@angular/material';
import { AdminTransportationManagementRoutingModule } from './admin-transportation-management-routing.module';
// tslint:disable-next-line:max-line-length
import { AdminViewTransportationProviderCComponent } from './admin-view-transportation-provider-c/admin-view-transportation-provider-c.component';
// tslint:disable-next-line:max-line-length
import { AdminEditTransportationProviderCComponent } from './admin-edit-transportation-provider-c/admin-edit-transportation-provider-c.component';
// tslint:disable-next-line:max-line-length
import { AdminAddTransportationProviderCComponent } from './admin-add-transportation-provider-c/admin-add-transportation-provider-c.component';
import { TProviderManagerService } from '../admin-transportation-management/TProviderServices/tprovider-manager.service';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    AdminTransportationManagementRoutingModule,
    MatProgressBarModule,
    MatTabsModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatTooltipModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSelectModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule
  ],
  declarations: [
    AdminViewTransportationProviderCComponent,
    AdminEditTransportationProviderCComponent,
    AdminAddTransportationProviderCComponent
  ],
  providers: [TProviderManagerService ] ,
  entryComponents: [AdminEditTransportationProviderCComponent, AdminAddTransportationProviderCComponent]
})
export class AdminTransportationManagementModule { }
