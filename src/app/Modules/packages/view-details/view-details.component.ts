import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { PackageModel } from 'src/app/Models/PackageModel/package-model';
import { ItineraryModel } from 'src/app/Models/PackageModel/itinerary-model';
import { FeedbackModel } from 'src/app/Models/PackageModel/feedback-model';
import { RoomModel } from 'src/app/Models/PackageModel/room-model';
import { TransportationModel } from 'src/app/Models/PackageModel/transportation-model';
import { CustomPackage } from 'src/app/Models/PackageModel/custom-package';
import { UserCustomization } from 'src/app/Models/PackageModel/custom-itinerary';
import { WishlistModel } from 'src/app/Models/PackageModel/wishlist-model';
import { PackageServiceService } from 'src/app/Modules/packages/package-service.service';
import { BookingService } from 'src/app/Modules/packages/booking.service';
import { SignInComponent } from 'src/app/Modules/user-signup-login/user/sign-in/sign-in.component';


@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  package: PackageModel;
  itineraries: ItineraryModel[];
  feedBacks: FeedbackModel[];
  roomOptions: RoomModel[];
  transportOptions: TransportationModel[];
  stars: number[] = [1, 2, 3, 4, 5];

  wishlist: WishlistModel;
  loggedIn = false;
  onWishlist: boolean;
  wishlistButtonDisabled = false;
  isCustomizing = false;
  totalPrice: number;
  customPackage: CustomPackage;
  customItinerary: UserCustomization;
  customItineraries: UserCustomization[] = [];
  baseUrl: string;
  constructor(private packageService: PackageServiceService,
              private bookingService: BookingService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
            ) {}

  // On initialization get package details based on ID
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getPackage(+params['id']);
      this.getItinerary(+params['id']);
      this.getFeedback(+params['id']);
      this.getRoomOptions(+params['id']);
      this.getTransportOptions(+params['id']);
      this.wishlist = new WishlistModel();
      this.wishlist.UserName = sessionStorage.getItem('userName');
      this.wishlist.PackageId = +params['id'];
      console.log(this.wishlist.UserName);
      if (this.wishlist.UserName) {
        this.packageService.inWishlist(this.wishlist).subscribe(result => { this.onWishlist = result;
                                                                            this.loggedIn = true; });
      }
    });
  }

  getRoomOptions(id: number) {
    this.packageService.getRoomOptions(id).subscribe(room => this.roomOptions = room);
  }

  getTransportOptions(id: number) {
    this.packageService.getTransportOptions(id).subscribe(transport => this.transportOptions = transport);
  }

  filterRoomOptions(id: number) {
    return this.roomOptions.filter(room => room.ItineraryID === id);
  }

  filterTransportationOptions(id: number) {
    return this.transportOptions.filter(transport => transport.ItineraryID === id);
  }

  // Get package details from service
  async getPackage(id: number) {
    await this.packageService.getPackage(id).subscribe(pack => { this.package = pack[0]; this.totalPrice = this.package.Price; });
  }

  // Get itinerary details from service
  getItinerary(id: number): void {
    // tslint:disable-next-line:max-line-length
    this.packageService.getItinerary(id).subscribe(itinerary => {this.itineraries = itinerary; console.log(this.itineraries[0].RoomPrice); });
  }

  // Get feedback from service
  getFeedback(id: number): void {
    this.packageService.getFeedback(id).subscribe(feedback => this.feedBacks = feedback);
  }

  // tslint:disable-next-line:member-ordering
  test: PackageModel;

  // Stores current package in the booking service to retrieve information when booking
  // helps limit API calls
  async bookPackage() {
    if (!sessionStorage.getItem('userName')) {
      localStorage.setItem('url', this.router.url);
      this.openLoginDialog();
      return;
    }
    if (!this.isCustomizing) {
      await this.bookingService.setPackage(this.package);
      this.router.navigateByUrl('/packages/book');
    } else {
      await this.bookingService.setPackage(this.package);
      this.customPackage = await {
          CustomPackageID: null,
          UserName: sessionStorage.getItem('userName')
      };
      await this.itineraries.forEach((itinerary, i) => {
        this.customItinerary = {
          CustomizationID: 0,
          CustomPackageID: 0,
          PackageID: this.package.PackageID,
          RoomPriceID: itinerary.CustomizedRoomPriceID,
          TransportationPriceID: itinerary.CustomizedTransportationPriceID,
          DayNumber: itinerary.DayNumber
        };
        this.customItineraries.push(this.customItinerary);
      });
      await this.bookingService.setCustomPackage(this.customPackage, this.customItineraries, this.totalPrice);
      this.router.navigateByUrl('/packages/book');
    }
  }

  setRoomPrice(customizedPrice: number, i: number) {
    this.itineraries[i].CustomizedRoomPrice = customizedPrice;
    this.totalPrice = 0;
    // tslint:disable-next-line:no-shadowed-variable
    this.itineraries.forEach((itinerary, i) => {
      this.totalPrice += itinerary.CustomizedRoomPrice + itinerary.CustomizedTransportationPrice;
    });
  }

  openLoginDialog() {
    // tslint:disable-next-line:prefer-const
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    const viewDialog = this.dialog.open(SignInComponent, addDialogConfig);
    viewDialog.afterClosed().subscribe(data => {
    });
  }

  setRoomPriceID(roomPriceID: number, i: number) {
    this.itineraries[i].CustomizedRoomPriceID = roomPriceID;
    console.log(this.itineraries[i].CustomizedRoomPriceID);
  }

  setTransportationPrice(customizedPrice: number, i: number) {
    this.itineraries[i].CustomizedTransportationPrice = customizedPrice;
    this.totalPrice = 0;
    // tslint:disable-next-line:no-shadowed-variable
    this.itineraries.forEach((itinerary, i) => {
      this.totalPrice += itinerary.CustomizedRoomPrice + itinerary.CustomizedTransportationPrice;
    });
  }

  setTransportationPriceID(transportPriceID: number, i: number) {
    this.itineraries[i].CustomizedTransportationPriceID = transportPriceID;
    console.log(this.itineraries[i].CustomizedTransportationPriceID);
  }

  customizePackage() {
    this.isCustomizing = true;
    this.totalPrice = 0;
    this.itineraries.forEach((itinerary, i) => {
      this.totalPrice += itinerary.CustomizedRoomPrice + itinerary.CustomizedTransportationPrice;
    });
    console.log(this.feedBacks);
  }

  cancelCustomize() {
    this.isCustomizing = false;
    this.totalPrice = 0;
    this.itineraries.forEach((itinerary, i) => {
      this.totalPrice += itinerary.RoomPrice + itinerary.TransportationPrice;
    });
    this.itineraries.forEach((itineray, i) => {console.log( i + ' ' + itineray.RoomPriceID); });
  }

  addToWishlist() {
    this.wishlistButtonDisabled = true;
    this.packageService.addToWishlist(this.wishlist).subscribe(
      result => {
        this.onWishlist = true;
        this.wishlistButtonDisabled = false;
      },
      error => 'Failed to add to wishlist');
  }

  removeFromWishlist() {
    this.wishlistButtonDisabled = true;
    this.packageService.removeFromWishlist(this.wishlist).subscribe(
      result => {
        this.onWishlist = false;
        this.wishlistButtonDisabled = false;
      },
      error => 'Failed to remove from wishlist');
  }
}
