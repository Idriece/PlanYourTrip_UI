import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  ValidatorFn,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroupDirective,
  FormGroup,
  Validators,
  FormArray,
  FormArrayName,
  FormGroupName
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  MatError,
  MatCheckbox,
  MatHint,
  MAT_DIALOG_DATA,
  MatIcon,
  MatStepLabel,
  MatStepper,
  MatStep,
  MatHorizontalStepper,
  MatStepperNext,
  MatStepperPrevious,
  MatSuffix,
  MatSnackBar,
  MatProgressBar,
  MatDialogConfig,
  MatTextareaAutosize
} from '@angular/material';
import { Router } from '@angular/router';
import { PackageService } from 'src/app/Modules/admin/admin-package-management/service/package.service';
import { PackageType } from 'src/app/Models/packagetypemodel';
import { AdminPackage } from 'src/app/Models/packages/adminpackage';
import { NgForm } from '@angular/forms';
import { Inject } from '@angular/core';
import { Package } from 'src/app/Models/packages/package';
import { City } from 'src/app/Models/SharedModels/city';
import { AdminManageHotelService } from '../../admin-hotel-management/AdminHotelService/admin-manage-hotel.service';
import { AllHotelDetailsModel } from 'src/app/Models/AdminHotelModels/all-hotel-details-model';
import { TransportationProviderAllDetails } from 'src/app/Models/TProviderModel/transportation-provider-all-details';
import { TProviderManagerService } from '../../admin-transportation-management/TProviderServices/tprovider-manager.service';
import { RoomPrice } from 'src/app/Models/AdminHotelModels/room-price';
import { Roomprices } from 'src/app/Models/AdminHotelModels/room-prices';
import { AdminPackageDTO } from 'src/app/Models/packages/adminpackagedto';
import { ItineraryDTO } from 'src/app/Models/packages/adminpackageitinerary';
import { PackageName } from 'src/app/Models/packages/packagename';
import { TransportationProviderPriceDetails } from 'src/app/Models/TProviderModel/transportation-provider-price-details';
import { UpdatedTProviderPrice } from 'src/app/Models/TProviderModel/updated-tprovider-price';
import { ItineraryRoomPrice } from 'src/app/Models/roomprice';
import { ItineraryTransportationPrice } from 'src/app/Models/transportationprice';
import { ItineraryPrice } from 'src/app/Models/packages/itineraryprice';
import { ViewChild } from '@angular/core';
import { SuccessmessageComponent } from 'src/app/Modules/admin/admin-package-management/successmessage/successmessage.component';

@Component({
  selector: 'app-createpackage',
  templateUrl: './createpackage.component.html',
  styleUrls: ['./createpackage.component.scss']
})
export class CreatepackageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public packageService: PackageService,
    public cityService: AdminManageHotelService,
    public hotelService: AdminManageHotelService,
    public transportationService: TProviderManagerService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dailog: MatDialog
  ) {}

  packageForm: FormGroup;
  itineraryForm: FormGroup;
  packagetypelist = Array<PackageType>();
  citylist = Array<City>();
  itinerarylist: Array<ItineraryDTO>;
  packagenamelist: Array<PackageName>;
  transportationlist = Array<TransportationProviderAllDetails>();
  hotellist = Array<AllHotelDetailsModel>();
  roomlist = Array<RoomPrice>();
  filteredhotellist = [];
  filteredtransportationlist = [];
  filteredroomlist = [];
  filteredtransportationmodelist = [];
  filteredroomprice = [];
  roomprice = Array<ItineraryRoomPrice>();
  transportationprice = Array<ItineraryTransportationPrice>();
  transportationmodelist = Array<TransportationProviderPriceDetails>();
  selectHotel: AllHotelDetailsModel;
  isError: false;
  isFormFilled: boolean;
  disable: boolean;
  isProgress: boolean;
  isempty: number;
  fileToUpload: File = null;
  imagefile: File;
  // tslint:disable-next-line:no-inferrable-types
  imageUrl: string = '/src/assets/default_image_upload.png';
  @ViewChild('Image')
  package_image;
  isBasicDetailsSubmitted: boolean;
  ngOnInit() {
    this.isBasicDetailsSubmitted = false;
    this.disable = true;
    this.packageForm = new FormGroup({
      // tslint:disable-next-line:max-line-length
      packageName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+(([\' ][a-zA-Z ])?[a-zA-Z]*)*$'),
        Validators.maxLength(100),
        Validators.minLength(3),
        this.uniquePackageName(this.packagenamelist)
      ]),
      packagetypeid: new FormControl(),
      days: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(7)
      ]),
      summary: new FormControl('', [
        Validators.required,
        // Validators.pattern('^[A-Za-z ]*$'),
        Validators.maxLength(1000)
      ]),
      numAvailable: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(20)
      ]),
      minimumPeople: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(14)
      ]),
      maximumPeople: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(15),
        this.passValidation()
      ]),

      Image: new FormControl('', [
        Validators.required,
        Validators.pattern('^.*.(jpg|jpeg|gif|JPG|png|PNG)$')
      ]),
      itineraries: new FormArray([]),

      Price: new FormControl(null, [Validators.required, Validators.min(1)]),
      profitPercentage: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ])
    });
    ////////// services call to fetch different data/////////////////
    this.Services();

    this.packageForm.get('minimumPeople').valueChanges.subscribe(data => {
      this.packageForm
        .get('maximumPeople')
        .updateValueAndValidity({ onlySelf: true });
    });

    this.packageForm.get('itineraries').valueChanges.subscribe(data => {
      this.packageForm.get('Price').reset(0);
      this.packageForm.get('profitPercentage').reset(0);
    });

    this.packageForm.get('profitPercentage').valueChanges.subscribe(data => {
      this.packageForm.get('Price').reset(0);
    });

    this.packageForm.get('Image').valueChanges.subscribe(data => {
      this.onchange();
    });
  }

  Services() {
    this.packageService.GetPackageName().subscribe(data => {
      this.packagenamelist = data;
    });

    this.packageService.GetRoomPrice().subscribe(data => {
      this.roomprice = data;
    });

    this.packageService.GetTransportationPrice().subscribe(data => {
      this.transportationprice = data;
    });

    this.hotelService.getAllCitiesList().subscribe(
      data => {
        this.citylist = data;
      },
      error => {
        console.log('error');
      }
    );

    this.packageService.GetPackageTypes().subscribe(
      data => {
        this.packagetypelist = data;
      },
      error => {
        console.log('error');
      }
    );

    this.hotelService.getAllHotelDetails().subscribe(
      data => {
        this.hotellist = data;
      },
      error => {
        console.log('error');
      }
    );

    this.transportationService.getAllTProvidersDetails().subscribe(
      data => {
        this.transportationlist = data;
      },
      error => {
        console.log('error');
      }
    );
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    if (file.item(0)) {
      reader.readAsDataURL(this.fileToUpload);
    } else {
      this.imageUrl = '/src/assets/default_image_upload.png';
    }
  }

  createItinerary(dayiterin: number): FormGroup {
    return this.formBuilder.group({
      day: new FormControl(dayiterin, [Validators.required]),
      city: new FormControl(null, Validators.required),
      hotel: new FormControl(null, Validators.required),
      RoomPriceID: new FormControl(null, Validators.required),
      transportation: new FormControl(null, Validators.required),
      TransportationPriceID: new FormControl(null, Validators.required),
      activity: new FormControl(null, [
        Validators.required,
        // Validators.pattern('^[A-Za-z ]*$'),
        Validators.maxLength(1000)
      ])
    });
  }

  ////////////////////////////////////////// To check package name is unique or not/////////////////////////////////////////////

  uniquePackageName(getPackage: Array<PackageName>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (typeof getPackage === 'undefined') {
        getPackage = this.packagenamelist;
      }
      if (control.value !== undefined) {
        if (isNaN(control.value)) {
          if (!control.value) {
          } else {
            const name = getPackage.indexOf(control.value);
            if (name >= 0) {
              return { unique: true };
            }
          }
        }
        return null;
      }
    };
  }
  /////////////////////////////// Minimum People Not Equal to Maximum People///////////////////////////////////////
  passValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== null || control.value !== undefined) {
        const maxValue = control.value;
        const minControl = control.root.get('minimumPeople');
        if (minControl) {
          const minValue = minControl.value;
          if (maxValue <= minValue) {
            return {
              isError: true
            };
          }
        }
      }
      return null;
    };
  }

  get max(): FormControl {
    return this.packageForm.get('maximumPeople') as FormControl;
  }

  get min(): FormControl {
    return this.packageForm.get('minimumPeople') as FormControl;
  }

  get _NumberOfDays(): FormControl {
    return this.packageForm.get('days') as FormControl;
  }

  get _getHotelName(): FormControl {
    const hotelName = this.itinerarie.get('hotel');
    if (!hotelName) {
      return new FormControl();
    }
    return hotelName as FormControl;
  }
  get image(): FormControl {
    const Image = this.packageForm.get('Image');
    if (!Image) {
      return new FormControl();
    }
    return Image as FormControl;
  }
  onchange() {
    if (this.image.value && this.image.valid) {
      return false;
    }
    return true;
  }

  addItinerary() {
    if (this._NumberOfDays.value > 7) {
      this.snackBar.open('Number of Days should be less than 7', '', {
        duration: 2000
      });
    } else {
      let i = 1;
      while (this.itinerarie.length !== 0) {
        this.itinerarie.removeAt(0);
      }
      while (i <= this._NumberOfDays.value) {
        this.itinerarie.push(this.createItinerary(i));
        ++i;
      }
    }
  }
  get itinerarie(): FormArray {
    return this.packageForm.get('itineraries') as FormArray;
  }

  get function() {
    return this.packageForm.controls;
  }

  get profit() {
    return this.packageForm.get('profitPercentage') as FormControl;
  }

  get price() {
    return this.packageForm.get('Price') as FormControl;
  }

  get packagetypes(): FormControl {
    const types = this.packageForm.get('packagetypeid');
    if (!types) {
      return new FormControl();
    }
    return types as FormControl;
  }
  get _packagename(): FormControl {
    const packagenames = this.packageForm.get('packageName');
    if (!packagenames) {
      return new FormControl();
    }
    return packagenames as FormControl;
  }
  ///////////////////////// get all city//////////////////////

  get cities(): FormControl {
    const city = this.packageForm.get('cityid');
    if (!city) {
      return new FormControl();
    }
    return city as FormControl;
  }

  //////////////////////// get all hotels////////////////////

  get hotels(): FormControl {
    const hotel = this.packageForm.get('hotelid');
    if (!hotel) {
      return new FormControl();
    }
    return hotel as FormControl;
  }

  get transportations(): FormControl {
    const transportation = this.packageForm.get('transportationproviderid');
    if (!transportation) {
      return new FormControl();
    }
    return transportation as FormControl;
  }

  filterRoomPrice(id: number, i) {
    if (id !== undefined) {
      if (this.roomprice[i].RoomPriceID !== undefined) {
        const roomprice = this.roomprice.filter(x => x.RoomPriceID === id);
        this.filteredroomprice[i] = roomprice[0].RoomPriceID;
      }
    }
  }
  ///////////////////////// filter room type based on particular hotel///////////////////

  filterRoom(id: number, i) {
    if (id !== undefined) {
      if (this.hotellist[i].RoomPrices !== undefined) {
        const hotel = this.hotellist.filter(x => x.HotelID === id);
        this.filteredroomlist[i] = hotel[0].RoomPrices;
      }
    }
  }

  ////////////////////////// filter transportation mode based on particular transporation/////////////////

  filterTransportationmode(id: number, i) {
    if (id !== undefined) {
      if (this.transportationlist[i].TransportationPrices !== undefined) {
        // tslint:disable-next-line:max-line-length
        this.filteredtransportationmodelist[i] = this.transportationlist.filter(
          x => x.TransportationProviderID === id
        )[0].TransportationPrices;
      }
    }
  }

  ////////////////////////// filter hotel provider based on cty///////////////////////////////////////////

  filterHotel(id: number, i) {
    if (id !== undefined) {
      if (this.hotellist[i].HotelID !== undefined) {
        this.filteredhotellist[i] = JSON.parse(
          JSON.stringify(this.hotellist.filter(x => x.CityID === id))
        );
      }
    }
  }

  ////////////////////////////// filter transportation provider based on city/////////////////

  filterTransportation(id: number, i) {
    if (id !== undefined) {
      if (this.transportationlist[i].TransportationProviderID !== undefined) {
        this.filteredtransportationlist[i] = this.transportationlist.filter(
          x => x.CityID === id
        );
      }
    }
  }

  packageTotalPrice() {
    this.isFormFilled = true;
    const iterinaryValue: ItineraryPrice[] = this.packageForm.get('itineraries')
      .value;
    if (this._NumberOfDays.value === null) {
      this.snackBar.open('Fill The Form', '', { duration: 2000 });
    } else {
      iterinaryValue.forEach(val => {
        if (val.RoomPriceID === null || val.TransportationPriceID === null) {
          this.isFormFilled = false;
        } else {
          const roomPrices = this.roomprice.filter(
            room => room.RoomPriceID === val.RoomPriceID
          );
          const transportationPrices = this.transportationprice.filter(
            trans => trans.TransportationPriceID === val.TransportationPriceID
          );
          if (
            roomPrices != null ||
            (roomPrices.length !== 0 && transportationPrices != null) ||
            transportationPrices.length !== 0
          ) {
            val.Price =
              roomPrices[0].RoomPrice +
              transportationPrices[0].TransportationPrice;
          }
        }
      });
      let i = 0;
      let Total = 0;
      while (i <= this._NumberOfDays.value - 1) {
        Total = Total + iterinaryValue[i].Price;
        ++i;
      }
      // const Profit: number = this.profit.value * Total / 100;
      // Total = Total + Profit;
      this.packageForm.get('Price').patchValue(Total);
      if (this.isFormFilled === true) {
        this.snackBar.open(
          '   Total Price of package is Rs.' + Total + '/-',
          '',
          {
            duration: 2000
          }
        );
      } else {
        this.snackBar.open('     Fill the Itinerary Form', '', {
          duration: 2000
        });
      }
    }
  }

  /////////////////////////////// Final Submit Event////////////////
  onSubmit(createpackage) {
    const iterinaryValue = [] = this.packageForm.get('itineraries').value;
    this.isempty = 0;
    const activityregex = /^[!1234567890@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    iterinaryValue.forEach(val => {
      if (val.activity.trim() === '' || activityregex.test(val.activity)) {
        this.isempty = this.isempty + 1;
      }
    });
    // tslint:disable-next-line:max-line-length
    if (this.packageForm.get('summary').value.trim() === '' || activityregex.test(this.packageForm.get('summary').value) || this.isempty > 0) {
        this.snackBar.open('Summary or Activity cannot be empty', '', {duration: 2000});
    } else {
      this.disable = false;
      const imageurl: File = this.fileToUpload;
      const formData: FormData = new FormData();
      formData.append('packageName', createpackage.packageName);
      formData.append('packagetypeid', createpackage.packagetypeid);
      formData.append('days', createpackage.days);
      formData.append('summary', createpackage.summary);
      formData.append('numAvailable', createpackage.numAvailable);
      formData.append('minimumPeople', createpackage.minimumPeople);
      formData.append('maximumPeople', createpackage.maximumPeople);
      formData.append('Image', imageurl, imageurl.name);
      let i;
      for (i = 0; i < this._NumberOfDays.value; i++) {
        formData.append(
          'itineraries[' + i + '].day',
          createpackage.itineraries[i].day
        );
        formData.append(
          'itineraries[' + i + '].city',
          createpackage.itineraries[i].city
        );
        formData.append(
          'itineraries[' + i + '].hotel',
          createpackage.itineraries[i].hotel
        );
        formData.append(
          'itineraries[' + i + '].RoomPriceID',
          createpackage.itineraries[i].RoomPriceID
        );
        formData.append(
          'itineraries[' + i + '].TransportationPriceID',
          createpackage.itineraries[i].TransportationPriceID
        );
        formData.append(
          'itineraries[' + i + '].transportation',
          createpackage.itineraries[i].transportation
        );
        formData.append(
          'itineraries[' + i + '].activity',
          createpackage.itineraries[i].activity
        );
      }
      formData.append('profitPercentage', createpackage.profitPercentage);
      formData.append('Price', createpackage.Price);
      this.isProgress = true;
      this.packageService.PostPackage(formData).subscribe(
        success => {
          this.isProgress = false;
          const dailogConfig = new MatDialogConfig();
          dailogConfig.disableClose = true;
          dailogConfig.autoFocus = true;
          dailogConfig.data = this.packageForm.value;
          const open = this.dailog.open(SuccessmessageComponent, dailogConfig);
          this.router.navigateByUrl('/admin/package');
        },
        error => {
          console.log('Error in posting package details');
        }
      );
    }
  }
}
