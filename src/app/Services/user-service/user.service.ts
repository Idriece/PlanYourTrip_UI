import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import { Response } from '@angular/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../../Models/user.model';
import { City } from 'src/app/Models/SharedModels/city';
import { Observable, BehaviorSubject, throwError, Subject } from 'rxjs';
import { Userprofile } from 'src/app/Models/userprofile.model';
import { Booking } from 'src/app/Models/booking';
import { EmailArray } from 'src/app/Models/EmailArray';
import { Updateuserprofile } from 'src/app/Models/updateuserprofile';
import { UserInterest } from 'src/app/Models/user-interest';
import { catchError } from 'rxjs/internal/operators/catchError';
import { SocialUser } from 'angularx-social-login';
import { ItineraryModel } from 'src/app/Models/PackageModel/itinerary-model';
import { SocialUserDTO } from '../../Models/SocialUserDTO';
import { RouterStateSnapshot } from '@angular/router';

@Injectable()
export class UserService {
  selectedCity = new BehaviorSubject<any>('');
  private myMethodSubject = new Subject<any>();
  Emails: string[];
  userprofile: Userprofile;
  readonly WithoutApi = environment.WithoutApi;
  readonly RootUrl = environment.RootUrl;
  userName: string;
  // state: RouterStateSnapshot;
  // url: string = this.state.url;
  constructor(private http: HttpClient) {
    this.userName = sessionStorage.getItem('userName');
    this.userprofile = {
      UserId: null,
      FirstName: null,
      LastName: null,
      Email: null,
      UserName: null,
      PhoneNumber: null,
      Interests: null,
      City: null,
      PasswordHash: null
    };
  }
myMethod(data) {
  console.log(data);
  this.selectedCity.next(data);
}
registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Email: user.Email,
      Password: user.Password,
      FirstName: user.FirstName,
      LastName: user.LastName,
      PhoneNumber: user.PhoneNumber,
      CityId: user.CityId,
    };
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post<User>(this.RootUrl + 'User/Register', body, {
      headers: reqHeader
    });
  }

  externalLogin(user: SocialUserDTO) {
    const body: SocialUserDTO =  {
      provider: user.provider,
      id: user.id,
      email: user.email,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      authToken: user.authToken,
      idToken: user.idToken,
      photoUrl: user.photoUrl,
      cityId: user.cityId
      };
      return this.http.post(this.RootUrl + 'ExternalLogin',  body);
  }

  userAuthentication(userName, password) {
    // console.log(this.state);
    const data =
      'username=' + userName + '&password=' + password + '&grant_type=password';
    const body = data;
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-urlencoded'
    });

    return this.http.post(this.WithoutApi + 'token', data, {
      headers: reqHeader
    });
  }
  // function for fetching email from the db
  public getEmail() {
    return this.http
      .get<Array<string>>(this.RootUrl + 'User/Email')
      .pipe(catchError(this.handleError));
  }

  public getCities() {
    return this.http
      .get<Array<string>>(this.RootUrl + 'Cities')
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

  public makeGetRequest(date: Booking) {
    // const body = JSON.stringify(date);
    // tslint:disable-next-line:max-line-length
    return this.http
      .get(
        this.RootUrl +
          'booking/bookinglist?Start=' +
          date.StartDate.toJSON() +
          '&End=' +
          date.EndDate.toJSON()
      )
      .pipe(catchError(this.handleError));
  }

  public GetRequest(userName: string): Observable<any> {
    return this.http.get(this.RootUrl + '' + userName + '');
  }
  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: string[] = JSON.parse(sessionStorage.getItem('userRoles'));
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  // To get the user details
  // tslint:disable-next-line:member-ordering
  founduser: Userprofile;
  getdetails(UserName: string) {
    return this.http
      .get(this.RootUrl + 'user/viewprofile?IUserName=' + UserName)
      .pipe(catchError(this.handleError));
  }

   // To get User Interests

   getUserInterests(id: string) {
    return this.http
      .get(this.RootUrl + 'user/FetchInterest?id=' + id)
      .pipe(catchError(this.handleError));
  }




  //  To Update the user details
  public putUser(changeprofile: Userprofile) {
    const body = JSON.stringify(changeprofile);
    const httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/json');
    return this.http
      .put(this.RootUrl + 'user/edit', body, { headers: httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // To Add User Interests
  AddNewInterest(interest: UserInterest) {
    const body = JSON.stringify(interest);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.RootUrl + 'user/addinterest', body, {
      headers: headers
    });
  }

  // To Delete User Interests
  deleteInterest(interestID: number) {
    // const body = JSON.stringify(interestID);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(
      this.RootUrl + 'user/deleteinterest?ID=' + interestID,
      { headers: headers }
    );
  }
  public makeGetIdDetails(userId: string): Observable<any> {
    return this.http.get(this.RootUrl + 'RecoveryId?emailId=' + userId + '');
  }
  // Function to update user table with new password
  public makePutIdDetails(user: User) {
    const body = JSON.stringify(user);
    const httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/json');
    return this.http.put(this.RootUrl + 'forget/changepassword', body, {
      headers: httpHeaders
    });
  }
  // Function to get OTP in Email Confirmation
  public makeGetOtp(userId: string): Observable<any> {
    return this.http.get(
      this.RootUrl + 'forgetpassword/otp?emailId=' + userId + ''
    );
  }
  // Function to get Itinerary details about the packages
  public getItinerary(id: number): Observable<any> {
    return this.http.get(this.RootUrl + 'packages/getItinerary/' + id);
  }

  getCustomItinerary(id: number): Observable<any> {
    return this.http.get(this.RootUrl + 'packages/getCustomItinerary/' + id);
  }
}
