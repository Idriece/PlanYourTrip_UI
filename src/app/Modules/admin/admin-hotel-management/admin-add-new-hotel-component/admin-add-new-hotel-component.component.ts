import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';  // Step 1: Import FC
import { Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { AdminManageHotelService } from '../../admin-hotel-management/AdminHotelService/admin-manage-hotel.service';
import { OwnerDetail } from 'src/app/Models/AdminHotelModels/hotel-owner-detail';
import { City } from 'src/app/Models/SharedModels/city';
import { HotelDetail } from 'src/app/Models/AdminHotelModels/hotel-detail';
import { RoomPrice } from 'src/app/Models/AdminHotelModels/room-price';
import { AdminViewHotelsComponent } from 'src/app/Modules/admin/admin-hotel-management/admin-view-hotels/admin-view-hotels.component';
import { AllHotelDetailsModel } from 'src/app/Models/AdminHotelModels/all-hotel-details-model';
import { HotelCity } from 'src/app/Models/AdminHotelModels/hotel-city';

@Component({
  selector: 'app-admin-add-new-hotel-component',
  templateUrl: './admin-add-new-hotel-component.component.html',
  styleUrls: ['./admin-add-new-hotel-component.component.scss']
})

// ===========================================================================================================================

export class AdminAddNewHotelComponentComponent implements OnInit {

  HotelCreation: FormGroup;
  cities: Array<City>;
  users: Array<OwnerDetail>;
  hotelCity: Array<HotelCity>;
  fileToUpload: File = null;
// ======================================CONTROL VISIBILITY OF INPUT FEILDS===========================================================

// The Visibility Of divs where we input the Room Price are  handled by these Variables
  StandardRoomPriceInput = false;
  StandardRoomPriceCheckBox = true;
  DeluxeRoomPriceInput = false;
  DeluxeRoomPriceCheckBox = true;
  PremiumRoomPriceInput = false;
  PremiumRoomPriceCheckBox = true;
  saveVisibility = true;
  isProgressBar = false;

  // These Methods Change the Visibility of divs where we take input for price
  StandardRoomPriceInputVisibility() {
    if (!this.StandardRoomPriceInput) {
      this.StandardRoomPriceInput = true;
    } else {
      this.StandardRoomPriceInput = false;
    }
  }

  DeluxeRoomPriceInputVisibility() {
    if (!this.DeluxeRoomPriceInput) {
      this.DeluxeRoomPriceInput = true;
    } else {
      this.DeluxeRoomPriceInput = false;
    }
  }

  PremiumRoomPriceInputVisibility() {
    if (!this.PremiumRoomPriceInput) {
      this.PremiumRoomPriceInput = true;
    } else {
      this.PremiumRoomPriceInput = false;
    }
  }



  // ================================================================================================================================

  constructor(private dailog: MatDialog, private hotelManager: AdminManageHotelService) { }

// ==================================================NG ON INIT======================================================================

  ngOnInit() {

    // Getting The Data Which will be required  for operations

    this.hotelManager.getAllCitiesList().subscribe(data => { this.cities = data; },
                                                   error => {console.log('couldn\'t get cities list'); });
    this.hotelManager.getAllOwnerList().subscribe( data => {this.users = data; },
                                                   error => { console.log('Couldn\'t get all hotel details'); });
    this.hotelManager.getAllHotelCity().subscribe(data => {this.hotelCity = data; },
                                                  error => {console.log('couldn\'t fetch hotel city list'); });

    // ===================================================================FORM FOR HOTEL CREATION ==================================
   // tslint:disable-next-line:no-debugger
    this.HotelCreation = new FormGroup({
      HotelName: new FormControl(null, [this.uniqueHotelNameValidator(this.hotelCity), Validators.minLength(3), Validators.maxLength(100),
                                        Validators.pattern('^[a-zA-Z]+(([\' ][a-zA-Z ])?[a-zA-Z]*)*$')]),
      CityID: new FormControl(null, Validators.required),
      UserID: new FormControl(null, Validators.required),
      Image: new FormControl(null, [Validators.required, Validators.pattern('^.*\.(jpg|jpeg|gif|JPG|png|PNG)$' )]),
      PriceCheckBox : new FormControl(''),
      StandardPrice: new FormControl(null, [Validators.min(500), Validators.max(100000)]),
      DeluxePrice: new FormControl(null, [Validators.min(700), Validators.max(100000)]),
      PremiumPrice: new FormControl(null, [Validators.min(1000), Validators.max(100000)])
    });
  } // NG ON INIT ENDS HERE

  // ==========================================GETTERS FOR FORM CONTROL ===================================================================

  get _getCity(): FormControl {
    const cityIDControl = this.HotelCreation.get('CityID');
    if (!cityIDControl) {
      return new FormControl();
    }
    return cityIDControl as FormControl;
  }

  get _getImage(): FormControl {
    const Image = this.HotelCreation.get('Image');
    if (!Image) {
      return new FormControl();
    }
    return Image as FormControl;
  }
  get _getUser(): FormControl {
    const userIDControl = this.HotelCreation.get('UserID');
    if (!userIDControl) {
      return new FormControl();
    }
    return userIDControl as FormControl;
  }

  get _getHotelName(): FormControl {
    const hotelName = this.HotelCreation.get('HotelName');
    if (!hotelName) {
      return new FormControl();
    }
    return hotelName as FormControl;
  }

  get _standarrdPrice(): FormControl {
    return this.HotelCreation.get('StandardPrice') as FormControl;
  }

  get _deluxePrice(): FormControl {
    return this.HotelCreation.get('DeluxePrice') as FormControl;
  }

  get _premiumPrice(): FormControl {
    return this.HotelCreation.get('PremiumPrice') as FormControl;
  }

  // ============================VALIDATOR FOR UNIQUE NAME===================================================================

uniqueHotelNameValidator(hotel: Array<HotelCity>): ValidatorFn  {

  return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (typeof hotel === 'undefined') { hotel = this.hotelCity; }
      if (control.value !== undefined) {
          if (isNaN(control.value)) {
            if (!control.value) {} else {
          if (hotel.find(x => x.HotelName.toLowerCase() === control.value.toLowerCase())) {
          return { 'unique': true };
      }}}
      return null;
  }
};
}

AvailableOwners(): boolean {
  if (this.users) {
    return true;
  }
  return true;
}

  // ==================================FORM SUBMIT POST HOTEL DETAILS===================================================================

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }
  HandleHotelFormSubmit(hotel: NgForm) {
  this.saveVisibility = false;
  this.isProgressBar = true;
    // tslint:disable-next-line:prefer-const
    let hotelDetail: HotelDetail =  new HotelDetail();

    // FOLLOWING DETAILS ARE MANDATORY TO FILL FOR FORM SUBMISSION

    hotelDetail.HotelName = hotel.value.HotelName;
    hotelDetail.CityId = this.cities.filter(x => x.CityName === hotel.value.CityID)[0].CityID;
    hotelDetail.UserId = this.users.filter(x => x.Email === hotel.value.UserID)[0].Id;
    hotelDetail.Image = 'NoImageAvailable';

    if (this._standarrdPrice.value >= 500 && this._standarrdPrice.value < 100000) {
      hotelDetail.RoomPrices.push({
        RoomTypeID: 1,
        Price: hotel.value.StandardPrice
      });
    }

    if (this._deluxePrice.value && this._standarrdPrice.value < 100000) {
      hotelDetail.RoomPrices.push({
        RoomTypeID : 2,
       Price : hotel.value.DeluxePrice
      });
    }

    if (this._premiumPrice.value && this._standarrdPrice.value < 100000) {
      hotelDetail.RoomPrices.push({
        RoomTypeID : 3,
        Price : hotel.value.PremiumPrice
      });
    }

    this.hotelManager.PostHotelDetails(hotelDetail, this.fileToUpload).subscribe(success => { this.dailog.closeAll(); },
                                                              error => {   console.log('Error in Posting the hotel details '); });

  } // FORM SUBMIT FUNCTION ENDS HERE

  onNoClick(): void {
      this.dailog.closeAll();
      if (!this.hotelCity.find(x => x.HotelName === this._getHotelName.value)) { console.log('undefined is handled'); } else {
        console.log('not handled'); }
  }

  checkValid() {
    // tslint:disable-next-line:max-line-length
    if ((((this._getHotelName.value) && (this._getHotelName.valid)) && (this._getImage.value && this._getImage.valid) && ((this._getCity.value) && (this._getCity.valid)) && ((this._getUser.valid) && (this._getUser.value))) && (((this._standarrdPrice.value) && (this._standarrdPrice.valid)) || ((this._deluxePrice.value) && (this._deluxePrice.valid)) || ((this._premiumPrice.value) && (this._premiumPrice.valid)))) { return false; } else {return true; }
  }
} // CLASS ENDS HERE




