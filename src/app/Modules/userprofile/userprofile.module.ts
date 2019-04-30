import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserprofileRoutingModule } from './userprofile-routing.module';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatTableModule, MatListModule, MatProgressBarModule, MatExpansionModule, MatChipsModule } from '@angular/material';
import { UserDetailComponent } from 'src/app/Modules/userprofile/user-details/user-details.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import { MatIconModule, MatDialogModule, MatSnackBarModule, MatGridListModule, MatStepperModule } from '@angular/material';
import { EditComponent } from './edit/edit.component';

import {MatDividerModule} from '@angular/material/divider';
import { BookinglistComponent } from 'src/app/Modules/userprofile/bookinglist/bookinglist.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ItineraryComponent } from './bookinglist/itinerary/itinerary.component';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  imports: [
    CommonModule,
    MatChipsModule,
    MatStepperModule,
    UserprofileRoutingModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSelectModule

  ],
  entryComponents: [
    BookinglistComponent, ItineraryComponent
  ],
  declarations: [UserDetailComponent, EditComponent, BookinglistComponent, ItineraryComponent, FeedbackComponent]
})
export class UserprofileModule { }
