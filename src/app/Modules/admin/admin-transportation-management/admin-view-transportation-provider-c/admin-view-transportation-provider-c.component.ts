import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
// tslint:disable-next-line:max-line-length
import { AdminEditTransportationProviderCComponent } from '../admin-edit-transportation-provider-c/admin-edit-transportation-provider-c.component';
// tslint:disable-next-line:max-line-length
import { AdminAddTransportationProviderCComponent } from 'src/app/Modules/admin/admin-transportation-management/admin-add-transportation-provider-c/admin-add-transportation-provider-c.component';
import { TProviderManagerService } from '../../admin-transportation-management/TProviderServices/tprovider-manager.service';
import { TransportationProviderAllDetails } from 'src/app/Models/TProviderModel/transportation-provider-all-details';
import { MatProgressBarModule } from '@angular/material';
@Component({
  selector: 'app-admin-view-transportation-provider-c',
  templateUrl: './admin-view-transportation-provider-c.component.html',
  styleUrls: ['./admin-view-transportation-provider-c.component.scss']
})
export class AdminViewTransportationProviderCComponent implements OnInit {
  isProgressBar = true;
  constructor(private dailog: MatDialog, private transProviderManager: TProviderManagerService) { }

  allTProvidersDetails: Array<TransportationProviderAllDetails>;
  ngOnInit() {
    this.transProviderManager.getAllTProvidersDetails().subscribe(
      data => {
        this.allTProvidersDetails = data;
        this.isProgressBar = false;
      },
      error => {
        console.log('Error While fetching transportation provider details');
      });
  }

  openDialog(transport: TransportationProviderAllDetails ){
    const dailogConfig = new MatDialogConfig();
    dailogConfig.disableClose = true;
    dailogConfig.autoFocus = true;
    const editDialogBox =  this.dailog.open(AdminEditTransportationProviderCComponent,
      {
        data: {
          dataKey: transport
        }
      } );

      editDialogBox.afterClosed().subscribe(
        success => {
          this.ngOnInit();
       console.log('ngOninti run again');
     this.ngOnInit();
    },
        Error => { console.log('Can\'t refresh after edit a new hotel'); }
      );
  }

  openAddDialog() {
    const addDailogConfig = new MatDialogConfig();
    addDailogConfig.disableClose = false;
    addDailogConfig.autoFocus = true;

   const viewDailogBox =  this.dailog.open(AdminAddTransportationProviderCComponent , addDailogConfig);
    viewDailogBox.afterClosed().subscribe(success => {
      this.ngOnInit();
    },
    error => {
      console.log('Error');
    } );
  }
}
