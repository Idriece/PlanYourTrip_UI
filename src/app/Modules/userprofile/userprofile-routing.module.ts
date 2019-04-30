import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from 'src/app/Modules/userprofile/user-details/user-details.component';
import { EditComponent } from 'src/app/Modules/userprofile/edit/edit.component';
import {MatSelectModule} from '@angular/material/select';
import { BookinglistComponent } from 'src/app/Modules/userprofile/bookinglist/bookinglist.component';
import { FeedbackComponent } from 'src/app/Modules/userprofile/feedback/feedback.component';

const routes:  Routes =  [
  { path:  'userdetail',  component: UserDetailComponent },
  { path: 'editProfile', component: EditComponent},
 { path: 'booklist', component: BookinglistComponent},
 { path: 'feedback', component: FeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserprofileRoutingModule { }



