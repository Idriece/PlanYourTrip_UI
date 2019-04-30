import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UpdateCheckInStatus } from 'src/app/Models/update-check-in-status';
import { TransportownerService } from 'src/app/Modules/transport-owner/transport-owner.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
  checkin: UpdateCheckInStatus = new UpdateCheckInStatus();
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transportService: TransportownerService
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialog.closeAll();
  }
  updateCheckInStatus() {
    // debugger;
    this.checkin.CheckInID = this.data.dataKey.CheckInID;
    this.checkin.CheckInDate = this.data.dataKey.CheckInDate;
    this.checkin.HotelCheckINStatus = this.data.dataKey.HotelCheckINStatus;
    this.checkin.HotelID = this.data.dataKey.HotelID;
    this.checkin.PackageBookingID = this.data.dataKey.PackageBookingID;
    this.checkin.TransportationCheckINStatus = true;
    this.checkin.TransportationProviderID = this.data.dataKey.TransportationProviderID;
    this.transportService.updateCheckIn(this.checkin).subscribe(
      success => {
        this.dialog.closeAll();
      },
      error => {
        console.log('Some Error Occoured');
      }
    );
  }
}
