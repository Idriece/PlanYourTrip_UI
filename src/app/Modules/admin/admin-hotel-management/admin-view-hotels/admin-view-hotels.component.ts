import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
// tslint:disable-next-line:max-line-length
import { AdminEditExistingHotelComponentComponent } from '../admin-edit-existing-hotel-component/admin-edit-existing-hotel-component.component';
import { AdminAddNewHotelComponentComponent } from '../admin-add-new-hotel-component/admin-add-new-hotel-component.component';
import { AdminManageHotelService } from '../../admin-hotel-management/AdminHotelService/admin-manage-hotel.service';
import { AllHotelDetailsModel } from 'src/app/Models/AdminHotelModels/all-hotel-details-model';

@Component({
  selector: 'app-admin-view-hotels',
  templateUrl: './admin-view-hotels.component.html',
  styleUrls: ['./admin-view-hotels.component.scss']
})
export class AdminViewHotelsComponent implements OnInit {

  isProgressBar = true;

  constructor(public dailog: MatDialog, private hotelManager: AdminManageHotelService, private toastr: ToastrService) { }

  allHotelDetails = Array<AllHotelDetailsModel>();
  ngOnInit() {

    this.hotelManager.getAllHotelDetails().subscribe(data => {
      this.allHotelDetails = data;
      this.isProgressBar = false;
    },
      error => {
        console.log(error);
        this.isProgressBar = true;
      });
  }  // ng on init ends here

  // method to open an dialog box for editing purpose and this accepts current hotel details as input parameter
  openDialog(hotel: AllHotelDetailsModel) {
    console.log(hotel);
    const dailogConfig = new MatDialogConfig();
    dailogConfig.disableClose = true;
    dailogConfig.autoFocus = true;
    const editDialogBox = this.dailog.open(AdminEditExistingHotelComponentComponent,
      {
        data: {
          dataKey: hotel
        }
      }
    );
    editDialogBox.afterClosed().subscribe(
      success => {
        console.log('ngOninit run again');
        this.ngOnInit();
      },
      Error => { console.log('Can\'t refresh after edit a new hotel'); }
    );
  }
// Method to open new dialog box where admin can add new hotels.
  openAddDialog() {
    const addDailogConfig = new MatDialogConfig();
    addDailogConfig.disableClose = false;
    addDailogConfig.autoFocus = true;

    const viewDailogBox = this.dailog.open(AdminAddNewHotelComponentComponent, addDailogConfig);
    viewDailogBox.afterClosed().subscribe(success => {
      this.ngOnInit();
      console.log('OK');
    },
      error => {
        console.log('Error');
      });
    viewDailogBox.afterClosed().subscribe(
      success => {
        this.ngOnInit(),

          console.log('ngOninti run again');
      },
      Error => {
        console.log('Can\'t refresh after edit a new hotel');

      }
    );
  }
}
