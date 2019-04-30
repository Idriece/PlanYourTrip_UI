import { Component, OnInit } from '@angular/core';
import { FeedbackComponent } from 'src/app/Modules/userprofile/feedback/feedback.component';
import { PackageService } from 'src/app/Modules/admin/admin-user-management/package.service';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  NgForm
} from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {
  MatDialog,
  MatProgressSpinner,
  MatTooltipModule,
  MatSnackBar,
  MatDialogRef,
  MatProgressBar,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material';

// tslint:disable-next-line:max-line-length
import {
  MatFormField,
  MatFormFieldControl,
  MatExpansionPanelTitle
} from '@angular/material';
import { Cancel } from 'src/app/Models/cancel';
import { ItineraryComponent } from 'src/app/Modules/userprofile/bookinglist/itinerary/itinerary.component';

@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.scss']
})
export class BookinglistComponent implements OnInit {
  wait = true;
  public Upcoming = [];
  public Current = [];
  public History = [];
  userNameStr: string;
  PackageId: number;
  IsCustomized: boolean;

  constructor(private httpservices: PackageService, public snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit() {
    this.userNameStr = sessionStorage.getItem('userName');
    console.log(this.userNameStr);
    // Function to get Upcoming booking list
    this.httpservices.makeGetUpBookingList(this.userNameStr).subscribe(
      (data: any) => {
        this.Upcoming = data;
        console.log(this.Upcoming);
        this.wait = false;
      },
      error => {}
    );
    // Function to get Current booking list
    this.httpservices.makeGetCurrentBookingList(this.userNameStr).subscribe(
      (data: any) => {
        this.Current = data;
        this.wait = false;
      },
      error => {}
    );
    // Function to get History booking list
    this.httpservices.makeGetHistoryBookingList(this.userNameStr).subscribe(
      (data: any) => {
        this.History = data;
        this.wait = false;
      },
      error => {}
    );
  }
  // Function send cancel booking request to the API
  Cancel(i) {
    const booking = new Cancel();
    booking.Id = this.Upcoming[i].UserId;
    booking.PackageId = this.Upcoming[i].PackageId;
    booking.PackageBookingId = this.Upcoming[i].PackageBookingId;

    this.httpservices.makePutCancelRequest(booking).subscribe(data => {
      this.ngOnInit();
      this.snackBar.open(this.Upcoming[i].PackageName, 'Booking Cancelled', {
        duration: 4000
      });
    });
  }
  // Function Open the dialog box to display Itinerary values
  View(packageID: number, isCustomized: boolean) {
    console.log(packageID);
    console.log(isCustomized);
    this.PackageId = packageID;
    this.IsCustomized = isCustomized;
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.autoFocus = true;
    addDialogConfig.width = '1200px';
    addDialogConfig.height = '800px';
    const viewDailogBox = this.dialog.open(ItineraryComponent, {
      data: {
        PackageId: packageID,
        IsCustomized: isCustomized 
      }
    });
  }

  openFeedback(id: number) {
    // tslint:disable-next-line:prefer-const
    let feedbackDialog = this.dialog.open(FeedbackComponent, {
      data: { packageID: id },
      panelClass: 'feedback-dialog',
      id: 'feedback-dialog'
    });
  }

}
