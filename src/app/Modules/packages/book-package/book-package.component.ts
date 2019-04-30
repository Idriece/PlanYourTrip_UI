import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PackageModel } from 'src/app/Models/PackageModel/package-model';
import { PackageBookingModel } from 'src/app/Models/PackageBookingModel/package-booking-model';
import { PaymentModel } from 'src/app/Models/PackageBookingModel/payment-model';
import { UserCustomization } from 'src/app/Models/PackageModel/custom-itinerary';
import { PackageServiceService } from 'src/app/Modules/packages/package-service.service';
import { BookingService } from 'src/app/Modules/packages/booking.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-book-package',
  templateUrl: './book-package.component.html',
  styleUrls: ['./book-package.component.scss']
})
export class BookPackageComponent implements OnInit {

  package: PackageModel;
  booking: PackageBookingModel;
  payment: PaymentModel;

  numPeopleOptions: number[];
  numPeople: number;

  today: Date = new Date();
  latest: Date = new Date(2025, 11);
  startDate: Date;
  endDate: Date;

  // tslint:disable-next-line:no-inferrable-types
  payLater: boolean = false;
  payMethod: string;
  creditCard: string;
  creditName: string;
  // tslint:disable-next-line:no-inferrable-types
  gotPackage: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  isCustomized: boolean = false;
  customizedPrice: number;
  fees: number;

  constructor(private packageService: PackageServiceService,
              private bookingService: BookingService,
              private route: ActivatedRoute,
              private router: Router,
              public snackBar: MatSnackBar) {
    this.numPeopleOptions = [];
    this.getPackage();
    this.fees = this.package.Price * (this.package.ProfitPercentage / 100);
    for (let i = this.package.MinPeople; i <= this.package.MaxPeople; i++) {
      this.numPeopleOptions.push(i);
    }
    if (localStorage.getItem('isCustomizedPackage') === 'true') {
      this.customizedPrice = parseFloat(localStorage.getItem('bookingPrice'));
      this.isCustomized = true;
    }
  }

  ngOnInit() {
    console.log(localStorage.getItem('customItineraries'));
  }

  getPackage(): void {
     this.package = JSON.parse(localStorage.getItem('bookingPackage'));
  }

  updateEnd(newStart: Date) {
    this.endDate = new Date(newStart);
    this.endDate.setDate(this.endDate.getDate() + this.package.Days - 1);
  }

  test(): void {
    console.log(this.package.PackageName);
    this.numPeopleOptions = [];
    // tslint:disable-next-line:no-var-keyword
    for (var i = this.package.MinPeople; i <= this.package.MaxPeople; i++) {
      this.numPeopleOptions.push(i);
    }
  }

  bookPackage(): void {
    // Determine payment method
    if (this.payLater) {
      this.payMethod = 'PayLater';
    } else {
      this.payMethod = 'PayNow';
    }
    // Advance for time difference
    this.startDate.setDate(this.startDate.getDate() + 1);
    this.endDate.setDate(this.endDate.getDate() + 1);
    // Get information for booking
    if (!this.isCustomized) {
      this.booking = new PackageBookingModel(
        this.package.PackageID,
        sessionStorage.getItem('userName'),
        this.numPeople,
        this.startDate,
        this.endDate,
        this.payMethod,
        false,
        this.package.Price * this.numPeople + (this.fees * this.numPeople),
        'Coming-Up'
      );
      console.log(JSON.stringify(this.booking));
      // If pay later, don't add payment method
      if (this.payLater) {
        this.bookingService.bookPackage(this.booking).subscribe();
      } else {
        this.payment = new PaymentModel(
          this.package.PackageID,
          this.creditCard,
          this.creditName,
          this.package.Price * this.numPeople + (this.fees * this.numPeople)
        );
        console.log(this.payment.CreditCardNumber);
        this.bookingService.bookWithPayment(this.booking, this.payment).subscribe();
      }
    } else {
      const itinerary: UserCustomization[] = JSON.parse(localStorage.getItem('customItineraries'));
      this.booking = new PackageBookingModel(
        this.package.PackageID,
        sessionStorage.getItem('userName'),
        this.numPeople,
        this.startDate,
        this.endDate,
        this.payMethod,
        this.isCustomized,
        this.customizedPrice * this.numPeople + (this.fees * this.numPeople),
        'Coming-Up'
      );
      console.log(JSON.stringify(itinerary));
      console.log(JSON.stringify(this.booking));
      if (this.payLater) {
        console.log(itinerary[0]);
        this.bookingService.bookCustomPackage(JSON.parse(localStorage.getItem('customItineraries')), this.booking).subscribe();
      } else {
        this.payment = new PaymentModel(
          this.package.PackageID,
          this.creditCard,
          this.creditName,
          this.customizedPrice * this.numPeople + (this.fees * this.numPeople),
        );
        console.log(this.payment.CreditCardNumber);
        // tslint:disable-next-line:max-line-length
        this.bookingService.bookCustomPackagePayment(JSON.parse(localStorage.getItem('customItineraries')), this.booking, this.payment).subscribe();
      }
    }

    this.bookingService.clearBooking();
    this.snackBar.open('Thank you for booking your trip with us!', '', { duration: 3000 });
    this.router.navigateByUrl('');
  }
}
