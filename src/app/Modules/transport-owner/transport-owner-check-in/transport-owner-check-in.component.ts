import { Component, OnInit } from '@angular/core';
import { TransportownerService } from 'src/app/Modules/transport-owner/transport-owner.service';
import { TodaysCheckIn } from 'src/app/Models/todays-check-in';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { PastNUpcomingCheckIn } from 'src/app/Models/past-nupcoming-check-in';
import { MatDialog } from '@angular/material/dialog';
import { CheckInComponent } from 'src/app/Modules/transport-owner/check-in/check-in.component';

@Component({
  selector: 'app-transport-owner-check-in',
  templateUrl: './transport-owner-check-in.component.html',
  styleUrls: ['./transport-owner-check-in.component.scss']
})
export class TransportOwnerCheckInComponent implements OnInit {
  transportId: number;
  todaysCheckIns: Array<TodaysCheckIn>;
  todayCheckedIn: Array<TodaysCheckIn>;
  todayNotcheckedIn: Array<TodaysCheckIn>;
  upcomingCheckIn: Array<PastNUpcomingCheckIn>;
  pastBooking: Array<TodaysCheckIn>;
  pastCheckedIn: Array<TodaysCheckIn>;
  pastNotCheckedIn: Array<TodaysCheckIn>;
  constructor(
    private transportOwner: TransportownerService,
    public dailog: MatDialog
  ) {}

  ngOnInit() {
    this.transportOwner.UpdatedtransportproviderId.subscribe(transportid => {
      this.transportId = transportid;
    });
    this.transportOwner.getTodaysCheckIn(this.transportId).subscribe(
      data => {
        // debugger;
        this.todaysCheckIns = data;
        console.log(this.todaysCheckIns);
        this.todayCheckedIn = this.todaysCheckIns.filter(
          x => x.TransportationCheckINStatus === true
        );
        this.todayNotcheckedIn = this.todaysCheckIns.filter(
          x => x.TransportationCheckINStatus === false
        );
      },
      failure => {
        console.log('Can\'t fetch transportation details');
      }
    );

    this.transportOwner.getUpcomingBooking(this.transportId).subscribe(
      data => {
        this.upcomingCheckIn = data;
        console.log(this.upcomingCheckIn);
      },
      failure => {
        console.log('Can\'t fetch upcoming transport details');
      }
    );

    this.transportOwner.getPastBooking(this.transportId).subscribe(
      data => {
        this.pastBooking = data;
        console.log(this.pastBooking);
        this.pastCheckedIn = this.pastBooking.filter(
          x => x.TransportationCheckINStatus === true
        );
        this.pastNotCheckedIn = this.pastBooking.filter(
          x => x.TransportationCheckINStatus === false
        );
        console.log(this.pastNotCheckedIn.length);
      },
      failure => {
        console.log('Failure in getting data');
      }
    );
  }

  UpdateCheckInStatus(checkin: TodaysCheckIn) { // debugger;
    //   console.log(checkin);
    const checkInDialogBox = this.dailog.open(CheckInComponent, {
      data: {
        dataKey: checkin
      }
    });
    checkInDialogBox.afterClosed().subscribe(success => {
      this.ngOnInit();
    });
  }
}
