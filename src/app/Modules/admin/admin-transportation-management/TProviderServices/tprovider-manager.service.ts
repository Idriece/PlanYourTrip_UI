import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { City } from 'src/app/Models/SharedModels/city';
import { OwnerDetail } from 'src/app/Models/AdminHotelModels/hotel-owner-detail';
import { TProviderCreateDTO } from 'src/app/Models/TProviderModel/tprovider-create-dto';
import { TransportationProviderAllDetails } from 'src/app/Models/TProviderModel/transportation-provider-all-details';
import { UpdatedTProviderPrice } from 'src/app/Models/TProviderModel/updated-tprovider-price';
import { UpdatedTProvider } from 'src/app/Models/TProviderModel/updated-tprovider';
import { AddTPrice } from 'src/app/Models/TProviderModel/add-tprice';
import { TransportCityPair } from 'src/app/Models/TProviderModel/transport-city-pair';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TProviderManagerService {

  RootUrl = environment.RootUrl;
  constructor(private httpClient: HttpClient) { }
    getAllCitiesList() {
      return this.httpClient.get<Array<City>>(this.RootUrl + 'Cities').pipe(catchError(this.handleError));
    }

    getAllTransportCity() {
      return this.httpClient.get<Array<TransportCityPair>>(this.RootUrl + 'AdminTManager/GetAllTransportCityList')
      .pipe(catchError(this.handleError));
    }

    getAllOwnerList() {
      return this.httpClient.get<Array<OwnerDetail>>(this.RootUrl + 'AdminTManager/transowner').pipe(catchError(this.handleError));
    }

    getAllTProvidersDetails() {
      return this.httpClient.get<Array<TransportationProviderAllDetails>>(this.RootUrl + 'AdminTManager/GetAllTProviderDetails')
      .pipe(catchError(this.handleError));
    }

    PostTProviderDetails( tProvider: TProviderCreateDTO) {
      const body = JSON.stringify(tProvider);
      const header = new HttpHeaders().set('Content-Type', 'application/json');
      return this.httpClient.post<TProviderCreateDTO>(this.RootUrl + 'AdminTManager/createTProvider', body, {headers : header})
      .pipe(catchError(this.handleError));
    }

    UpdateTProviderDetails(tProviderDetails: UpdatedTProvider ) {
      const body = JSON.stringify(tProviderDetails);
      const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<UpdatedTProvider>(this.RootUrl + 'AdminTManager/UpdateTProvider', body, {headers : header})
    .pipe(catchError(this.handleError));
    }

    AddNewPrice(price: AddTPrice) {
      const body = JSON.stringify(price);
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.httpClient.post<AddTPrice>(this.RootUrl + 'AdminTManager/AddNewPrice', body, {headers : headers} )
      .pipe(catchError(this.handleError));
    }

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
