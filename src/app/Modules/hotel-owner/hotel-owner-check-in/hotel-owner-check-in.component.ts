import { Component, OnInit } from '@angular/core';
import { HotelOwnerService } from '../hotel-owner-service/hotel-owner.service';
import { CheckIn } from 'src/app/Models/check-in';
import { PastNUpcomingCheckIn } from 'src/app/Models/past-nupcoming-check-in';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckINComponent } from 'src/app/Modules/hotel-owner/check-in/check-in.component';

@Component({
  selector: 'app-hotel-owner-check-in',
  templateUrl: './hotel-owner-check-in.component.html',
  styleUrls: ['./hotel-owner-check-in.component.scss']
})
export class HotelOwnerCheckInComponent implements OnInit {
  hotelId: number;
  todaysCheckIns: Array<CheckIn>;
  todayCheckedIn: Array<CheckIn>;
  todayNotcheckedIn: Array<CheckIn>;
  upcomingCheckIn: Array<PastNUpcomingCheckIn>;
  pastBooking: Array<PastNUpcomingCheckIn>;
  pastCheckedIn: Array<PastNUpcomingCheckIn>;
  pastNotCheckedIn: Array<PastNUpcomingCheckIn>;

  constructor(private hotelOwner: HotelOwnerService, public dailog: MatDialog) {}

  ngOnInit() {
    this.hotelOwner.castHotelId.subscribe(hotelid => {
      this.hotelId = hotelid;
    });
    this.hotelOwner.getTodayCheckIn(this.hotelId).subscribe(
      data => {
        this.todaysCheckIns = data;
        this.todayCheckedIn = this.todaysCheckIns.filter(
          x => x.HotelCheckINStatus === true
        );
        this.todayNotcheckedIn = this.todaysCheckIns.filter(
          x => x.HotelCheckINStatus === false
        );
      },
      failure => {
        console.error(failure);
      }
    );

    this.hotelOwner.getUpcomingBooking(this.hotelId).subscribe(
      data => {
        this.upcomingCheckIn = data;
      },
      failure => {
        console.log('Can\'t fetch upcoming hotel details');
      }
    );

    this.hotelOwner.getPastBooking(this.hotelId).subscribe(
      data => {
        this.pastBooking = data;
        console.log(this.pastBooking);
        this.pastCheckedIn = this.pastBooking.filter(
          x => x.HotelCheckINStatus === true
        );
        console.log(this.pastCheckedIn.length);
        this.pastNotCheckedIn = this.pastBooking.filter(
          x => x.HotelCheckINStatus === false
        );
      },
      failure => {
        console.log('Failure in getting data');
      }
    );
  } // ng on init ends here

  UpdateCheckInStatus(checkin: CheckIn) {
    const checkInDialogBox = this.dailog.open(CheckINComponent,
    {
      data : {
        dataKey: checkin
      }
    });
    checkInDialogBox.afterClosed().subscribe(success => {this.ngOnInit(); } );
  }
}
