import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/Services/user-service/user.service';
import {NgModel} from '@angular/forms';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Booking } from 'src/app/Models/booking';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bookingdate',
  templateUrl: './bookingdate.component.html',
  styleUrls: ['./bookingdate.component.scss'],
  providers: [DatePipe]
})
export class BookingdateComponent implements OnInit {
  Array: any;
  SDate: Date;
  EDate: Date;
  public bookingsearch: Booking;
  constructor(private httpservices: UserService, private datePipe: DatePipe, public snackBar: MatSnackBar) {
    this.bookingsearch = {
      StartDate: null, EndDate: null
    };
   }
  ngOnInit() {
    }
  search() {
    if (this.SDate > this.EDate) {
        this.openSnackBar('Start Date is greater than End Date');
      } else if (this.SDate == null || this.EDate == null) {
          this.openSnackBar('Start Date and End Date cannot be empty!!');
        } else {
    this.bookingsearch.StartDate = this.SDate ;
    this.bookingsearch.EndDate = this.EDate;
    this.httpservices.makeGetRequest(this.bookingsearch).subscribe((data: any) => {
      this.Array = data;
      console.log(this.Array);
    },
    error => {
    });

  }
}

 openSnackBar(message: string, action?: string) {
   this.snackBar.open(message, action, {
     duration: 2000,
   });
 }
}
