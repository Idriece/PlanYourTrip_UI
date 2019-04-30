import { Component, OnInit } from '@angular/core';
import { AdminManageHotelService } from '../../../admin/admin-hotel-management/AdminHotelService/admin-manage-hotel.service';
import { City } from '../../../../Models/SharedModels/city';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocialUser } from 'angularx-social-login';
import { UserService } from '../../../../Services/user-service/user.service';
import { MatDialog } from '@angular/material';
import { SocialUserDTO } from '../../../../Models/SocialUserDTO';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  cities: Array<City>;
  cityForm: FormGroup;
  isSave = false;
  user: SocialUserDTO = new SocialUserDTO();
  constructor(private hotelManager: AdminManageHotelService, private userService: UserService, private dialog: MatDialog ) {
    this.cityForm = new FormGroup({
      CityId: new FormControl(this.user.cityId)
   });
   }

  ngOnInit() {
    this.hotelManager.getAllCitiesList().subscribe(
      data => {
        this.cities = data;
      },
      error => {
        console.log('couldn\'t get cities list');
      }
    );
  }
SaveCity() {
  this.isSave = true;
  // tslint:disable-next-line:prefer-const
  this.user.cityId = this.cityForm.value.CityId;
  this.userService.myMethod(this.user.cityId);
}


}
