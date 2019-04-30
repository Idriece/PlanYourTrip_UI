import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HotelOwnerService } from 'src/app/Modules/hotel-owner/hotel-owner-service/hotel-owner.service';
import { UpdateCheckInStatus } from 'src/app/Models/update-check-in-status';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckINComponent implements OnInit {

  checkin: UpdateCheckInStatus = new UpdateCheckInStatus;
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private hotelCheckin: HotelOwnerService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }
  updateCheckInStatus() {

    this.checkin.CheckInID = this.data.dataKey.CheckInID;
    this.checkin.CheckInDate = this.data.dataKey.CheckInDate;
    this.checkin.HotelCheckINStatus = true;
    this.checkin.HotelID = this.data.dataKey.HotelID;
    this.checkin.PackageBookingID = this.data.dataKey.PackageBookingID;
    this.checkin.TransportationCheckINStatus = this.data.dataKey.TransportationCheckINStatus;
    this.checkin.TransportationProviderID = this.data.dataKey.TransportationProviderID;
    this.hotelCheckin.updateCheckIn(this.checkin).subscribe(success => { this.dialog.closeAll(); },
                                                            error => {console.log('Some Error Occoured'); });

  }
}

