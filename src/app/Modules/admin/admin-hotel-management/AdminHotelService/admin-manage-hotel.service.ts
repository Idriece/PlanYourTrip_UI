import { Injectable } from '@angular/core';
import { HotelDetail } from 'src/app/Models/AdminHotelModels/hotel-detail';
import { OwnerDetail } from 'src/app/Models/AdminHotelModels/hotel-owner-detail';
import { City } from 'src/app/Models/SharedModels/city';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AllHotelDetailsModel } from 'src/app/Models/AdminHotelModels/all-hotel-details-model';
import { UpdatedHotelDetailDTO } from 'src/app/Models/AdminHotelModels/updated-hotel-detail-dto';
import { AddPriceDTO } from 'src/app/Models/AdminHotelModels/add-price-dto';
import { HotelCity } from 'src/app/Models/AdminHotelModels/hotel-city';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminManageHotelService {

  id: number;
  RootUrl = environment.RootUrl;
  constructor(private httpClient: HttpClient) { }

  // returns a list which has hotel name and city name for that hotel
  getAllHotelCity() {
    return this.httpClient.get<Array<HotelCity>>(this.RootUrl + 'AdminHotelManager/GetHotelCity').pipe(catchError(this.handleError));
  }

  // returns list of all cities from db, this is used to select a city while addin an hotel
  getAllCitiesList() {
    return this.httpClient.get<Array<City>>(this.RootUrl + 'Cities').pipe(catchError(this.handleError));
  }

  // this gets hotel's owner email address so that admin can select an owner from drop down and associate to an user
  getAllOwnerList() {
    return this.httpClient.get<Array<OwnerDetail>>(this.RootUrl + 'OwnerList').pipe(catchError(this.handleError));
  }

  // this method is used to post hotel and price details when we are adding an new hotel
  PostHotelDetails(hotelDetail: HotelDetail, file: File) {
    const hotelData = JSON.stringify(hotelDetail);
    const formData = new FormData();
    formData.append('hotelData', hotelData);
    if (file) {
      formData.append('ImageFile', file, file.name);
    }
    const httpHeaders = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    console.log(formData);
    return this.httpClient.post<HotelDetail>(this.RootUrl + 'AdminHotelManager', formData, { headers: httpHeaders})
    .pipe(catchError(this.handleError));

  }

  // during update when we try to provide a price which was not previously added then we use this method
  AddNewPrice(price: AddPriceDTO) {
    const body = JSON.stringify(price);
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<AddPriceDTO>(this.RootUrl + 'addNewPrice', body, { headers: header }).pipe(catchError(this.handleError));
  }

  // this get's all hotel details for a all hotel in db
  getAllHotelDetails() {
    return this.httpClient.get<Array<AllHotelDetailsModel>>(this.RootUrl + 'getAllHotelDetails').pipe(catchError(this.handleError));
  }

  // this method is used to handle updates of a particular hotel
  UpdateHotel(id, updatedHotel: UpdatedHotelDetailDTO) {
    console.log(updatedHotel);
    const body = JSON.stringify(updatedHotel);
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<UpdatedHotelDetailDTO>(this.RootUrl + 'AdminHotelManager/' + id, body, { headers: header })
    .pipe(catchError(this.handleError));
  }

  // this method is used to handle the errors
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      // Client Side or Network Error 4XX
      console.error('Error Status Code: ', errorResponse.status);
      console.error('CLientSide Error: ', errorResponse.error.message);
    } else {
      // server side error, logging the complete error response 5XX
      console.error('Backend Returned Status Code: ', errorResponse.status);
      console.error('Server Side Error Response Body: ', errorResponse.message);
    }
    return throwError('There is some problem with the service. We are working on it. Please try again later');
  }

}
