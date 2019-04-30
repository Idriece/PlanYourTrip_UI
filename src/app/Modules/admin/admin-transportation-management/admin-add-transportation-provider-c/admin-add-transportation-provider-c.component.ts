import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { City } from 'src/app/Models/SharedModels/city';
import { OwnerDetail } from 'src/app/Models/AdminHotelModels/hotel-owner-detail';
import { MatDialog } from '@angular/material/dialog';
import { TProviderManagerService } from '../../admin-transportation-management/TProviderServices/tprovider-manager.service';
import { TProviderCreateDTO } from 'src/app/Models/TProviderModel/tprovider-create-dto';
import { TransportCityPair } from 'src/app/Models/TProviderModel/transport-city-pair';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-admin-add-transportation-provider-c',
  templateUrl: './admin-add-transportation-provider-c.component.html',
  styleUrls: ['./admin-add-transportation-provider-c.component.scss']
})
export class AdminAddTransportationProviderCComponent implements OnInit {
  // =================================================================================================================================
  transportCity = new Array<TransportCityPair>();
  TransportationCreation: FormGroup;
  cities: Array<City>;
  users: Array<OwnerDetail>;
  CarPricePriceInput = false;
  SUVRoomPriceInput = false;
  Traveller12PriceInput = false;
  Traveller16RoomPriceInput = false;
  saveVisibility = true;
  isProgressBar = false;
  // ====================================================================================================================================
  constructor(
    private dailog: MatDialog,
    private tManager: TProviderManagerService
  ) {}

  ngOnInit() {
    this.tManager.getAllTransportCity().subscribe(
      data => {
        this.transportCity = data;
      },
      error => {
        console.log('Error in fetching hotel transport list');
      }
    );
    this.tManager.getAllOwnerList().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log('Error fetching the users list');
      }
    );
    // CREATE A FORM GROUP
    // ========MAKING A FORM GROUP FOR TRANPOTATION PROVIDER CREATION=====================================================================

    this.TransportationCreation = new FormGroup({
      TransportProviderName: new FormControl('', [
        // tslint:disable-next-line:quotemark
        Validators.pattern("^[a-zA-Z]+(([' ][a-zA-Z ])?[a-zA-Z]*)*$"),
        this.uniqueTransportNameValidator(this.transportCity),
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required
      ]),
      CityID: new FormControl(null, Validators.required),
      UserID: new FormControl(null, Validators.required),
      PriceCheckBox: new FormControl(''),
      CarPrice: new FormControl(null, [
        Validators.min(500),
        Validators.max(100000)
      ]),
      SUVPrice: new FormControl(null, [
        Validators.min(1000),
        Validators.max(100000)
      ]),
      Traveller12Price: new FormControl(null, [
        Validators.min(400),
        Validators.max(100000)
      ]),
      Traveller16Price: new FormControl(null, [
        Validators.min(500),
        Validators.max(100000)
      ])
    });

    this.onChanges();
    // ====================================================================================================================================

    this.tManager.getAllCitiesList().subscribe(
      data => {
        this.cities = data;
      },
      error => {
        console.log('couldn\'t get cities list');
      }
    );
    this.tManager.getAllOwnerList().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log('Couldn\'t get all hotel details');
      }
    );
  } // NGONIT ENDS HERE

  onChanges(): void {
    this.TransportationCreation.valueChanges.subscribe(
      success => {
        this.checkValid();
      },
      error => {
        this.checkValid();
      }
    );
  }
  // ==============================CUSTOM VALIDATOR FOR UNIQUE Transport NAME =============================================================

  uniqueTransportNameValidator(
    transport: Array<TransportCityPair>
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (typeof transport === 'undefined') {
        transport = this.transportCity;
      }
      if (control.value !== undefined) {
        if (isNaN(control.value)) {
          if (!control.value) {
          } else {
            const trans = transport.find(
              x =>
                x.TransportationProviderName.toLowerCase() ===
                control.value.toLowerCase()
            );
            if (trans) {
              return { unique: true };
            }
          }
        }
        return null;
      }
    };
  }
  // =================THESE FUNCTIONS ENABLE AND DISABLE VISIBILITY OF INPUT FEILDS =======================================================

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

  // =====================================================GETTER FOR FORM CONTROL===========================================================

  get _getTProviderName(): FormControl {
    const transportationProvider = this.TransportationCreation.get(
      'TransportProviderName'
    ) as FormControl;
    if (!transportationProvider) {
      return new FormControl();
    }
    return transportationProvider as FormControl;
  }
  get _getCity(): FormControl {
    const cityIDControl = this.TransportationCreation.get('CityID');

    if (!cityIDControl) {
      return new FormControl();
    }

    return cityIDControl as FormControl;
  }

  get _getUser(): FormControl {
    const userIDControl = this.TransportationCreation.get('UserID');
    if (!userIDControl) {
      return new FormControl();
    }

    return userIDControl as FormControl;
  }

  get _CarPrice(): FormControl {
    return this.TransportationCreation.get('CarPrice') as FormControl;
  }

  get _SUVPrice(): FormControl {
    return this.TransportationCreation.get('SUVPrice') as FormControl;
  }

  get _T12Price(): FormControl {
    return this.TransportationCreation.get('Traveller12Price') as FormControl;
  }

  get _T16Price(): FormControl {
    return this.TransportationCreation.get('Traveller16Price') as FormControl;
  }

  // ==============HANDLE FORM SUBMIT================================================================================================
  HandleTransportFormSubmit(Transport: NgForm) {
    this.saveVisibility = false;
    this.isProgressBar = true;
    const newTProvider = new TProviderCreateDTO();

    newTProvider.TransportationProviderName =
      Transport.value.TransportProviderName;
    newTProvider.CityId = this.cities.filter(
      x => x.CityName === Transport.value.CityID
    )[0].CityID;
    newTProvider.UserId = this.users.filter(
      x => x.Email === Transport.value.UserID
    )[0].Id;
    if (Transport.value.CarPrice) {
      newTProvider.TransportationPrices.push({
        TransportationModeID: 1,
        Price: Transport.value.CarPrice
      });
    }
    if (Transport.value.SUVPrice) {
      newTProvider.TransportationPrices.push({
        TransportationModeID: 2,
        Price: Transport.value.SUVPrice
      });
    }
    if (Transport.value.Traveller12Price) {
      newTProvider.TransportationPrices.push({
        TransportationModeID: 3,
        Price: Transport.value.Traveller12Price
      });
    }
    if (Transport.value.Traveller16Price) {
      newTProvider.TransportationPrices.push({
        TransportationModeID: 3,
        Price: Transport.value.Traveller16Price
      });
    }
    console.log(newTProvider);
    this.tManager.PostTProviderDetails(newTProvider).subscribe(success => {
      this.dailog.closeAll();
    });
  }

  onNoClick(): void {
    this.dailog.closeAll();
  }

  checkValid() {
    if (
      this._getCity.value &&
      this._getUser.value &&
      this._getTProviderName.value &&
      this._getTProviderName.valid &&
      this._getCity.valid &&
      this._getUser.valid
    ) {
      if (
        (this._CarPrice.value > 500 && this._CarPrice.value < 100000) ||
        (this._SUVPrice.value > 700 && this._SUVPrice.value < 100000) ||
        (this._T12Price.value > 400 && this._T12Price.value < 100000) ||
        (this._T16Price.value > 500 && this._T16Price.value < 100000)
      ) {
        return false;
      }
    } else {
      return true;
    }
  }
} // CLASS ENDS HERE
