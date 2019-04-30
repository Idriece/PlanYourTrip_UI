import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

import { PackageModel } from 'src/app/Models/PackageModel/package-model';
import { PackageBookingModel } from 'src/app/Models/PackageBookingModel/package-booking-model';
import { CustomPackage } from 'src/app/Models/PackageModel/custom-package';
import { UserCustomization } from 'src/app/Models/PackageModel/custom-itinerary';
import { PaymentModel } from 'src/app/Models/PackageBookingModel/payment-model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  package: PackageModel;
  customPackage: CustomPackage;
  customItineraries: UserCustomization[];
  totalPrice: number;

  RootUrl = environment.RootUrl; 
  constructor(private http: HttpClient) { }

  // Stores the package as a JSON object in local storage
  setPackage(packages: PackageModel): void {
    localStorage.removeItem('isCustomizedPackage');
    this.package = packages;
    localStorage.setItem('bookingPackage', JSON.stringify(this.package));
  }

  setCustomPackage(customPackage: CustomPackage, customItineraries: UserCustomization[], totalPrice: number) {
    this.customPackage = customPackage;
    localStorage.setItem('customPackage', JSON.stringify(this.customPackage));
    this.customItineraries = customItineraries;
    localStorage.setItem('customItineraries', JSON.stringify(this.customItineraries));
    this.totalPrice = totalPrice;
    localStorage.setItem('bookingPrice', this.totalPrice.toString());
    localStorage.setItem('isCustomizedPackage', 'true');
  }

  // Clear package from local storage
  clearBooking(): void {
    localStorage.removeItem('bookingPackage');
    localStorage.removeItem('customPackage');
    localStorage.removeItem('customItineraries');
    localStorage.removeItem('isCustomizedPackage');
  }

  // Get the package stored in the service
  async getPackage(): Promise<PackageModel> {
    return this.package;
  }

  // API call to book package
  bookPackage(booking: PackageBookingModel) {
    return this.http.post<PackageBookingModel>(this.RootUrl + 'packages/book', booking);
  }

  // API call to book package without payment
  bookWithPayment(booking: PackageBookingModel, payment: PaymentModel) {
    return this.http.post<{PackageBookingModel, PaymentModel}>(this.RootUrl + 'packages/bookWithPayment', { booking, payment });
  }

  bookCustomPackage(userCustomizations: UserCustomization[], booking: PackageBookingModel) {
    console.log(JSON.stringify(userCustomizations));
    return this.http.post<{Array<UserCustomization>(), PackageBookingModel}>(this.RootUrl + 'packages/bookCustom', { userCustomizations, booking });
  }

  bookCustomPackagePayment(userCustomizations: UserCustomization[], booking: PackageBookingModel, payment: PaymentModel) {
    console.log(userCustomizations);
    return this.http.post<{Array<UserCustomization>(), PackageBookingModel, PaymentModel}>(this.RootUrl + 'packages/bookCustomPayment', { userCustomizations, booking, payment });
  }
}


