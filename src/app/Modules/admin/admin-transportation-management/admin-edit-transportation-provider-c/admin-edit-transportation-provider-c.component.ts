import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import {
  FormGroup,
  FormControl,
  Validators,
  NgForm,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { TProviderManagerService } from '../../admin-transportation-management/TProviderServices/tprovider-manager.service';
import { UpdatedTProvider } from 'src/app/Models/TProviderModel/updated-tprovider';
import { AddTPrice } from 'src/app/Models/TProviderModel/add-tprice';
import { TransportCityPair } from 'src/app/Models/TProviderModel/transport-city-pair';

@Component({
  selector: 'app-admin-edit-transportation-provider-c',
  templateUrl: './admin-edit-transportation-provider-c.component.html',
  styleUrls: ['./admin-edit-transportation-provider-c.component.scss']
})
export class AdminEditTransportationProviderCComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tManager: TProviderManagerService
  ) {}
  editTransportProvider: FormGroup;
  CarPricePriceInput = false;
  SUVRoomPriceInput = false;
  Traveller12PriceInput = false;
  Traveller16RoomPriceInput = false;
  saveVisibility = true;
  isProgressBar = false;
  transportCity: Array<TransportCityPair>;

  ngOnInit() {
    this.tManager.getAllTransportCity().subscribe(
      data => {
        this.transportCity = data;
      },
      error => {
        console.log('Error in fetching hotel transport list');
      }
    );
    this.editTransportProvider = new FormGroup({
      TransportProviderName: new FormControl(
        this.data.dataKey.TransportProviderName,
        [
          this.uniqueTransportNameValidator(
            this.transportCity,
            this.data.dataKey.TransportationProviderName
          ),
          Validators.minLength(3),
          Validators.maxLength(100),
          // tslint:disable-next-line:quotemark
          Validators.pattern("^[a-zA-Z]+(([' ][a-zA-Z ])?[a-zA-Z]*)*$")
        ]
      ),
      PriceCheckBox: new FormControl(''),
      CarPrice: new FormControl(null, [
        Validators.min(500),
        Validators.max(4000)
      ]),
      SUVPrice: new FormControl(null, [
        Validators.min(1000),
        Validators.max(6000)
      ]),
      Traveller12Price: new FormControl(null, [
        Validators.min(400),
        Validators.max(1500)
      ]),
      Traveller16Price: new FormControl(null, [
        Validators.min(500),
        Validators.max(2000)
      ])
    });
    this.onChanges();
  } // ng on init ends here

  onChanges(): void {
    this.editTransportProvider.valueChanges.subscribe(
      success => {
        this.checkValid();
      },
      error => {
        this.checkValid();
      }
    );
  }
  CarInputVisibility() {
    if (!this.CarPricePriceInput) {
      this.CarPricePriceInput = true;
    } else {
      this.CarPricePriceInput = false;
    }
  }

  SUVPriceInputVisibility() {
    if (!this.SUVRoomPriceInput) {
      this.SUVRoomPriceInput = true;
    } else {
      this.SUVRoomPriceInput = false;
    }
  }

  Traveller12PriceInputVisibility() {
    if (!this.Traveller12PriceInput) {
      this.Traveller12PriceInput = true;
    } else {
      this.Traveller12PriceInput = false;
    }
  }

  Traveller16PriceInputVisibility() {
    if (!this.Traveller16RoomPriceInput) {
      this.Traveller16RoomPriceInput = true;
    } else {
      this.Traveller16RoomPriceInput = false;
    }
  }
  // =======================================GETTER FOR FORM CONTROL===========================================================

  get _getTProviderName(): FormControl {
    return this.editTransportProvider.get(
      'TransportProviderName'
    ) as FormControl;
  }
  get _CarPrice(): FormControl {
    return this.editTransportProvider.get('CarPrice') as FormControl;
  }

  get _SUVPrice(): FormControl {
    return this.editTransportProvider.get('SUVPrice') as FormControl;
  }

  get _T12Price(): FormControl {
    return this.editTransportProvider.get('Traveller12Price') as FormControl;
  }

  get _T16Price(): FormControl {
    return this.editTransportProvider.get('Traveller16Price') as FormControl;
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }
  //  =================================CUSTOM VALIDATOR FOR UNIQUE HOTEL NAME =============================================================

  uniqueTransportNameValidator(
    transport: Array<TransportCityPair>,
    TransportName: string
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (typeof transport === 'undefined') {
        transport = this.transportCity;
      }
      if (typeof TransportName === 'undefined') {
        TransportName = this.data.dataKey.TransportationProviderName;
      }
      if (control.value !== undefined) {
        if (isNaN(control.value)) {
          if (!control.value) {
          } else {
            const name = transport.find(
              x =>
                x.TransportationProviderName.toLowerCase() ===
                control.value.toLowerCase()
            );
            if (name) {
              if (
                name.TransportationProviderName.toLowerCase() !==
                this.data.dataKey.TransportationProviderName.toLowerCase()
              ) {
                return { unique: true };
              }
            }
          }
        }
        return null;
      }
    };
  }
  // =============================================================================================================================

  HandleTransportFormSubmit(Transport: NgForm) {
    this.saveVisibility = false;
    this.isProgressBar = true;
    // tslint:disable-next-line:prefer-const
    let updatedTProvider = new UpdatedTProvider();
    updatedTProvider.TransportationProviderID = this.data.dataKey.TransportationProviderID;
    updatedTProvider.CityID = this.data.dataKey.CityID;
    if (this._getTProviderName.value && this._getTProviderName.valid) {
      updatedTProvider.TransportationProviderName =
        Transport.value.TransportProviderName;
    } else {
      updatedTProvider.TransportationProviderName = this.data.dataKey.TransportationProviderName;
    }

    updatedTProvider.Id = this.data.dataKey.Id;

    if (Transport.value.CarPrice >= 500 && Transport.value.CarPrice < 100000) {
      const filteredCar = this.data.dataKey.TransportationPrices.filter(
        x => x.Name === 'Car'
      )[0];
      if (!filteredCar) {
        const newPrice = new AddTPrice();
        newPrice.TransportationProviderID = this.data.dataKey.TransportationProviderID;
        newPrice.TransportationModeID = 1;
        newPrice.Price = Transport.value.CarPrice;
        this.tManager.AddNewPrice(newPrice).subscribe(
          success => {
            console.log('New Car Price Added');
          },
          error => {
            console.log('Error in adding New Car Price');
          }
        );
      } else {
        updatedTProvider.updatedTProviderPrice.push({
          TransportationPriceID: filteredCar.TransportationPriceID,
          TransportationModeID: 1,
          Price: Transport.value.CarPrice
        });
      }
    }

    if (Transport.value.SUVPrice >= 1000 && Transport.value.SUVPrice < 100000) {
      const filteredSUV = this.data.dataKey.TransportationPrices.filter(
        x => x.Name === 'SUV'
      )[0];
      if (!filteredSUV) {
        const newPrice = new AddTPrice();
        newPrice.TransportationProviderID = this.data.dataKey.TransportationProviderID;
        newPrice.TransportationModeID = 2;
        newPrice.Price = Transport.value.SUVPrice;
        this.tManager.AddNewPrice(newPrice).subscribe(
          success => {
            console.log('New Car Price Added');
          },
          error => {
            console.log('Error in adding New Car Price');
          }
        );
      } else {
        updatedTProvider.updatedTProviderPrice.push({
          TransportationPriceID: filteredSUV.TransportationPriceID,
          TransportationModeID: 2,
          Price: Transport.value.SUVPrice
        });
      }
    }

    if (
      Transport.value.Traveller12Price >= 400 &&
      Transport.value.Traveller12Price < 100000
    ) {
      const filteredT12 = this.data.dataKey.TransportationPrices.filter(
        x => x.Name === 'Traveller12'
      )[0];
      if (!filteredT12) {
        const newPrice = new AddTPrice();
        newPrice.TransportationProviderID = this.data.dataKey.TransportationProviderID;
        newPrice.TransportationModeID = 3;
        newPrice.Price = Transport.value.Traveller12Price;
        this.tManager.AddNewPrice(newPrice).subscribe(
          success => {
            console.log('New Car Price Added');
          },
          error => {
            console.log('Error in adding New Car Price');
          }
        );
      } else {
        const t12Price = filteredT12.TransportationPriceID;
        updatedTProvider.updatedTProviderPrice.push({
          TransportationPriceID: t12Price,
          TransportationModeID: 3,
          Price: Transport.value.Traveller12Price
        });
      }
    }

    if (
      Transport.value.Traveller16Price >= 500 &&
      Transport.value.Traveller16Price < 100000
    ) {
      const filteredT16 = this.data.dataKey.TransportationPrices.filter(
        x => x.Name === 'Traveller16'
      )[0];
      if (!filteredT16) {
        const newPrice = new AddTPrice();
        newPrice.TransportationProviderID = this.data.dataKey.TransportationProviderID;
        newPrice.TransportationModeID = 4;
        newPrice.Price = Transport.value.Traveller16Price;
        this.tManager.AddNewPrice(newPrice).subscribe(
          success => {
            console.log('New Car Price Added');
          },
          error => {
            console.log('Error in adding New Car Price');
          }
        );
      } else {
        updatedTProvider.updatedTProviderPrice.push({
          TransportationPriceID: filteredT16.TransportationPriceID,
          TransportationModeID: 4,
          Price: Transport.value.Traveller16Price
        });
      }
    }
    this.tManager.UpdateTProviderDetails(updatedTProvider).subscribe(
      success => {
        this.dialog.closeAll();
        console.log('TProviders details updated successfully');
      },
      Error => {
        console.log('TProviders detials not updated successfully');
      }
    );
  } // form submit ends here

  checkValid() {
    // tslint:disable-next-line:max-line-length
    if (
      (this._getTProviderName.value && this._getTProviderName.valid) ||
      (this._CarPrice.value >= 700 && this._CarPrice.value < 100000) ||
      (this._SUVPrice.value >= 1000 && this._SUVPrice.value < 100000) ||
      (this._T12Price.value >= 400 && this._T12Price.value < 100000) ||
      (this._T16Price.value >= 500 && this._T16Price.value < 100000)
    ) {
      return false;
    } else {
      return true;
    }
  }
}
