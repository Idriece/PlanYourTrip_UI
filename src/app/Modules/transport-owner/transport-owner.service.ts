import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
// import { CheckIn } from 'src/app/Models/check-in';
import { PastNUpcomingCheckIn } from 'src/app/Models/past-nupcoming-check-in';
import { TransportationProviderAllDetails } from 'src/app/Models/TProviderModel/transportation-provider-all-details';
import { TodaysCheckIn } from 'src/app/Models/todays-check-in';
import { UpdateCheckInStatus } from 'src/app/Models/update-check-in-status';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportownerService {
  RootUrl = environment.RootUrl;
  private transportproviderId = new BehaviorSubject<number>(-1);
  UpdatedtransportproviderId = this.transportproviderId.asObservable();
  constructor(private httpClient: HttpClient) {}

  getAllTransportDetails(userName: string) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient
      .get<Array<TransportationProviderAllDetails>>(
        this.RootUrl + 'Transport/' + userName
      )
      .pipe(catchError(this.handleError));
  }
  updateTransportProviderId(newTransportProviderId) {
    this.transportproviderId.next(newTransportProviderId);
  }
  getTodaysCheckIn(id: number) {
    return this.httpClient
      .get<Array<TodaysCheckIn>>(this.RootUrl + 'Transport/CheckinsT/' + id)
      .pipe(catchError(this.handleError));
  }

  getUpcomingBooking(id: number) {
    return this.httpClient
      .get<Array<PastNUpcomingCheckIn>>(
        this.RootUrl + 'Transport/CheckinsF/' + id
      )
      .pipe(catchError(this.handleError));
  }
  updateCheckIn(checkIn: UpdateCheckInStatus) {
    const body = JSON.stringify(checkIn);
    console.log(body);
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    // tslint:disable-next-line:max-line-length
    return this.httpClient
      .put<UpdateCheckInStatus>(this.RootUrl + '/transportcheckin', body, {
        headers: header
      })
      .pipe(catchError(this.handleError));
  }

  getPastBooking(id: number) {
    return this.httpClient
      .get<Array<TodaysCheckIn>>(this.RootUrl + 'Transport/CheckinsP/' + id)
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
    return throwError(
      'There is some problem with the service. We are working on it. Please try again later'
    );
  }
}
