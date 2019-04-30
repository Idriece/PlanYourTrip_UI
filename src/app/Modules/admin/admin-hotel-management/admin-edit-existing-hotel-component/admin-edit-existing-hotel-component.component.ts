import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AllHotelDetailsModel } from 'src/app/Models/AdminHotelModels/all-hotel-details-model';
import {
  FormGroup,
  FormControl,
  Validators,
  NgForm,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { UpdatedHotelDetailDTO } from 'src/app/Models/AdminHotelModels/updated-hotel-detail-dto';
import { AdminManageHotelService } from '../../admin-hotel-management/AdminHotelService/admin-manage-hotel.service';
import { AddPriceDTO } from 'src/app/Models/AdminHotelModels/add-price-dto';
import { AdminViewHotelsComponent } from 'src/app/Modules/admin/admin-hotel-management/admin-view-hotels/admin-view-hotels.component';
import { HotelCity } from 'src/app/Models/AdminHotelModels/hotel-city';

@Component({
  selector: 'app-admin-edit-existing-hotel-component',
  templateUrl: './admin-edit-existing-hotel-component.component.html',
  styleUrls: ['./admin-edit-existing-hotel-component.component.scss']
})

// ======================================================================================================================================
export class AdminEditExistingHotelComponentComponent implements OnInit {
  EditHotel: FormGroup;
  hotelCity: Array<HotelCity>;
  hotelDetialForEdit: AllHotelDetailsModel;
  StandardRoomPriceCheckBox = true;
  StandardRoomPriceInput = false;
  DeluxeRoomPriceInput = false;
  DeluxeRoomPriceCheckBox = true;
  PremiumRoomPriceInput = false;
  PremiumRoomPriceCheckBox = true;
  saveVisibility = true;
  isProgressBar = false;
  constructor(
    private dailog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hotelManager: AdminManageHotelService
  ) {}

  // =========================================================NG ON INIT ==================================================================

  ngOnInit() {
    this.hotelManager.getAllHotelCity().subscribe(
      data => {
        this.hotelCity = data;
      },
      error => {
        console.log('couldn\'t fetch hotel city list');
      }
    );

    this.EditHotel = new FormGroup({
      HotelName: new FormControl('', [
        this.uniqueHotelNameValidator(this.hotelCity, this.data.dataKey),
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-Z]+(([\' ][a-zA-Z ])?[a-zA-Z]*)*$')
      ]),
      PriceCheckBox: new FormControl(''),
      StandardPrice: new FormControl(null, [
        Validators.min(500),
        Validators.required,
        Validators.max(100000)
      ]),
      DeluxePrice: new FormControl(null, [
        Validators.min(700),
        Validators.max(100000)
      ]),
      PremiumPrice: new FormControl(null, [
        Validators.min(1000),
        Validators.max(100000)
      ])
    });

    this.onChanges();
  } // NG ON INIT ENDS HERE

  onChanges(): void {
    this.EditHotel.valueChanges.subscribe(
      success => {
        this.checkValid();
      },
      failure => {}
    );
  } // onChanges ends here
  // =========================================================VARIABLES  AND FUNCTION CONTROLLING VISIBILITY OF PRICE TEXT FEILDS ==========

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

  // =========================================================CUSTOM VALIDATOR FOR UNIQUE HOTEL NAME ===================================

  uniqueHotelNameValidator(
    hotel: Array<HotelCity>,
    hotelName: string
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (typeof hotel === 'undefined') {
        hotel = this.hotelCity;
      }
      if (typeof hotelName === 'undefined') {
        hotelName = this.data.dataKey.HotelName;
      }
      if (control.value !== undefined) {
        if (isNaN(control.value)) {
          if (!control.value) {
          } else {
            const search = hotel.find(
              x => x.HotelName.toLowerCase() === control.value.toLowerCase()
            );
            if (search) {
              if (search.HotelName !== this.data.dataKey.HotelName) {
                return { unique: true };
              }
            }
          }
        }
        return null;
      }
    };
  }

  // =========================================================GETTERS FOR FORM CONTROL============================================

  get _getHotelName() {
    const hotelaccessor = this.EditHotel.get('HotelName');
    if (!hotelaccessor) { return new FormControl(); }
    return hotelaccessor as FormControl;
  }
  get _getStandardPrice() {
    const standardPrice = this.EditHotel.get('StandardPrice');
    if (!standardPrice) { return new FormControl(); }
    return standardPrice as FormControl;
  }

  get _getDeluxePrice() {
    const deluxePrice = this.EditHotel.get('DeluxePrice');
    if (!deluxePrice) { return new FormControl(); }
    return deluxePrice as FormControl;
  }

  get _getPremiumPrice() {
    const premiumPrice = this.EditHotel.get('PremiumPrice');
    if (!premiumPrice) { return new FormControl(); }
    return premiumPrice as FormControl;
  }
  // ==========================HANDLE FORMSUBMIT AND DISCARD BUTTON CLICK=================================================================

  HandleHotelEditFormSubmit(updatedHotelDetail: NgForm) {
    this.saveVisibility = false;
    this.isProgressBar = true;
    // tslint:disable-next-line:prefer-const
    let updatedHotelDetailDTO = new UpdatedHotelDetailDTO();

    // DETAILS WHICH ARE GOING TO BE SAME FOR UPDATE

    updatedHotelDetailDTO.HotelID = this.data.dataKey.HotelID;
    updatedHotelDetailDTO.CityID = this.data.dataKey.CityID;
    updatedHotelDetailDTO.Id = this.data.dataKey.Id;
    updatedHotelDetailDTO.HotelImage = this.data.dataKey.HotelImage;

    // DETAILS WHICH MAY CHANGE DURING A UPDATE SCENARIO
    if (this._getHotelName.value && this._getHotelName.valid) {
      updatedHotelDetailDTO.HotelName = this._getHotelName.value;
    } else {
      updatedHotelDetailDTO.HotelName = this.data.dataKey.HotelName;
    }

    if (
      updatedHotelDetail.value.StandardPrice >= 500 &&
      updatedHotelDetail.value.StandardPrice < 100000
    ) {
      const filteredStandardRooms = this.data.dataKey.RoomPrices.filter(
        x => x.RoomTypeName === 'Standard'
      )[0];
      // Handle addition of new Standard Price
      if (!filteredStandardRooms) {
        // tslint:disable-next-line:prefer-const
        let newPrice = new AddPriceDTO();
        newPrice.RoomTypeID = 1;
        newPrice.HotelID = this.data.dataKey.HotelID;
        newPrice.Price = updatedHotelDetail.value.StandardPrice;
        this.hotelManager.AddNewPrice(newPrice).subscribe(
          success => {
            console.log('Standard Price added successfully');
          },
          error => {
            console.log('error in adding new standard price');
          }
        );
      } else {
        // handle price updation
        updatedHotelDetailDTO.updatedHotelPriceDTO.push({
          RoomPriceID: this.data.dataKey.RoomPrices.filter(
            x => x.RoomTypeName === 'Standard'
          )[0].RoomPriceID,
          RoomTypeID: 1,
          Price: updatedHotelDetail.value.StandardPrice
        });
      }
    }

    if (
      updatedHotelDetail.value.DeluxePrice >= 700 &&
      updatedHotelDetail.value.DeluxePrice < 100000
    ) {
      const filteredDeluxeRooms = this.data.dataKey.RoomPrices.filter(
        x => x.RoomTypeName === 'Deluxe'
      )[0];
      // Handle addition of new Deluxe Price
      if (!filteredDeluxeRooms) {
        const newPrice = new AddPriceDTO();
        newPrice.RoomTypeID = 2;
        newPrice.HotelID = this.data.dataKey.HotelID;
        newPrice.Price = updatedHotelDetail.value.DeluxePrice;
        this.hotelManager.AddNewPrice(newPrice).subscribe(
          success => {
            console.log('Deluxe pricr successfully added');
          },
          error => {
            console.log('Deluxe price didntget added');
          }
        );
      } else {
        // handle price updation
        const foundDeluxeRoomPriceID = filteredDeluxeRooms.RoomPriceID;
        updatedHotelDetailDTO.updatedHotelPriceDTO.push({
          RoomPriceID: foundDeluxeRoomPriceID,
          RoomTypeID: 2,
          Price: updatedHotelDetail.value.DeluxePrice
        });
      }
    }

    if (
      updatedHotelDetail.value.PremiumPrice >= 1000 &&
      updatedHotelDetail.value.PremiumPrice < 100000
    ) {
      const filteredPremiumRooms = this.data.dataKey.RoomPrices.filter(
        x => x.RoomTypeName === 'Premium'
      )[0];
      // Handle addition of new Deluxe Price
      if (!filteredPremiumRooms) {
        const newPrice = new AddPriceDTO();
        newPrice.RoomTypeID = 3;
        newPrice.HotelID = this.data.dataKey.HotelID;
        newPrice.Price = updatedHotelDetail.value.PremiumPrice;
        this.hotelManager.AddNewPrice(newPrice).subscribe(
          success => {
            console.log('a new price for hotel added successfully');
          },
          error => {
            console.log('error while adding new price');
          }
        );
      } else {
        const foundPremiumRoomPriceID = filteredPremiumRooms.RoomPriceID;
        updatedHotelDetailDTO.updatedHotelPriceDTO.push({
          RoomPriceID: foundPremiumRoomPriceID,
          RoomTypeID: 3,
          Price: updatedHotelDetail.value.PremiumPrice
        });
      }
    }

    // call to api for updating the provided details
    this.hotelManager
      .UpdateHotel(this.data.dataKey.HotelID, updatedHotelDetailDTO)
      .subscribe(
        data => {
          this.dailog.closeAll();
          console.log('Hotel Details Updated SuccessFully');
        },
        error => {
          console.log('Error during updating hotel details');
        }
      );
  } // handle form submit function works

  onNoClick(): void {
    this.dailog.closeAll();
  }
  // =========================Makes Form Submit Button Enabled or disabled=================================================================
  checkValid() {
    if (
      (this._getHotelName.value && this._getHotelName.valid) ||
      (this._getStandardPrice.value >= 500 &&
        this._getStandardPrice.value < 100000 &&
        this._getStandardPrice.valid) ||
      (this._getDeluxePrice.value >= 700 &&
        this._getDeluxePrice.value < 100000) ||
      (this._getPremiumPrice.value > 1000 &&
        this._getPremiumPrice.value < 100000)
    ) {
      return false;
    } else {
      return true;
    }
  }
}
