import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelOwnerRoutingModule } from './hotel-owner-routing.module';
import { HotelOwnerDefaultViewComponent } from './hotel-owner-default-view/hotel-owner-default-view.component';
import { HotelOwnerCheckInComponent } from './hotel-owner-check-in/hotel-owner-check-in.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatButtonModule, MatProgressBarModule } from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
// tslint:disable-next-line:max-line-length
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
// tslint:disable-next-line:quotemark
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { CheckINComponent } from './check-in/check-in.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  imports: [
    CommonModule,
    HotelOwnerRoutingModule,
    MatTabsModule,
    MatPaginatorModule,
    MatListModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatTooltipModule,
    MatGridListModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTabsModule,
    MatCardModule,
    MatSnackBarModule
    ],
  declarations: [HotelOwnerDefaultViewComponent, HotelOwnerCheckInComponent, CheckINComponent],
  entryComponents: [CheckINComponent]
})
export class HotelOwnerModule { }
