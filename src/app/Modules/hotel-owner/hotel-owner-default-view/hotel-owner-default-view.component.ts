import { Component, OnInit } from '@angular/core';
import { AllHotelDetailsModel } from 'src/app/Models/AdminHotelModels/all-hotel-details-model';
import { HotelOwnerService } from '../hotel-owner-service/hotel-owner.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hotel-owner-default-view',
  templateUrl: './hotel-owner-default-view.component.html',
  styleUrls: ['./hotel-owner-default-view.component.scss']
})
export class HotelOwnerDefaultViewComponent implements OnInit {
  hotelDetails: Array<AllHotelDetailsModel>;
  constructor(private hotelService: HotelOwnerService, private router: Router, public snackBar: MatSnackBar) {}
  userName: string;
  isProgressBar = true;
  ngOnInit() {

    this.userName = sessionStorage.getItem('userName');
    this.hotelService.getAllHotelDetails(this.userName).subscribe( data => { this.hotelDetails = data;
                                                                   this.isProgressBar = false; },
                                                                   error => { console.error(error);
                                                                   this.isProgressBar = false; });
  }

  ViewCheckIns(hotelID: number ) {
    this.hotelService.updateHotelId(hotelID);
    this.router.navigate(['hotel/checkin']);
  }

}
