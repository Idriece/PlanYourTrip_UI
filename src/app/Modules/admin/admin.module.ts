import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDefaultViewComponent } from './admin-default-view/admin-default-view.component';
// tslint:disable-next-line:max-line-length
import {
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatButtonModule,
  MatTableModule,
  MatListModule,
  // tslint:disable-next-line:max-line-length
  MatCardModule,
  MatIconModule,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatFormFieldModule
} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { BookingdateComponent } from './bookingdate/bookingdate.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  MatSliderModule,
  DateAdapter,
  MatGridListModule,
  MatFormField
} from '@angular/material';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  declarations: [AdminDefaultViewComponent, BookingdateComponent]
})
export class AdminModule {}
