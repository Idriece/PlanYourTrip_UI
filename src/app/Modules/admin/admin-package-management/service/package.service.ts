import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Headers,
  Response,
  RequestMethod,
  RequestOptions
} from '@angular/http';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PackageType } from 'src/app/Models/packagetypemodel';
import { Package } from 'src/app/Models/packages/package';
import { UpdateChangeRole } from 'src/app/Models/update-change-role';
import { AdminPackage } from 'src/app/Models/packages/adminpackage';
import { PackageName } from 'src/app/Models/packages/packagename';
import { HttpParams } from '@angular/common/http';
import { EditPackage } from 'src/app/Models/packages/editpackage';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  id: number;
  RootUrl = environment.RootUrl;
  constructor(private http: HttpClient) {}
  GetPackageTypes() {
    return this.http
      .get<Array<PackageType>>(this.RootUrl + 'packages/packagetypes')
      .pipe(catchError(this.handleError));
  }

  GetPackages() {
    return this.http
      .get<Array<AdminPackage>>(this.RootUrl + 'packages/getpackages')
      .pipe(catchError(this.handleError));
  }

  PostPackage(form: FormData) {
    const httpHeaders = new HttpHeaders().set(
      'Access-Control-Allow-Origin',
      '*'
    );
    // tslint:disable-next-line:max-line-length
    return this.http
      .post<AdminPackage>(this.RootUrl + 'packages/AddPackage', form, {
        headers: httpHeaders
      })
      .pipe(catchError(this.handleError));
  }
  AddPackageType(type: PackageType) {
    const body = JSON.stringify(type);
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<PackageType>(
      this.RootUrl + 'packages/AddPackageType',
      body,
      { headers: header }
    );
  }
  PutPackage(id, pack: EditPackage) {
    const body = JSON.stringify(pack);
    const header = new HttpHeaders().set('Content-type', 'application/json');
    // tslint:disable-next-line:max-line-length
    return this.http
      .put<EditPackage>(this.RootUrl + 'packages/putpackage/' + id, body, {
        headers: header
      })
      .pipe(catchError(this.handleError));
  }
  GetPackageName() {
    return this.http
      .get<Array<PackageName>>(this.RootUrl + 'packages/GetPackageName')
      .pipe(catchError(this.handleError));
  }
  GetRoomPrice(): Observable<any> {
    return this.http
      .get(this.RootUrl + 'packages/GetRoomPriceForAdmin')
      .pipe(catchError(this.handleError));
  }
  GetTransportationPrice(): Observable<any> {
    return this.http
      .get(this.RootUrl + 'packages/GetTransportationPriceForAdmin')
      .pipe(catchError(this.handleError));
  }
  public makeGetRequest(): Observable<any> {
    return this.http
      .get(this.RootUrl + 'User/Users')
      .pipe(catchError(this.handleError));
  }
  public makePutRequest(changerole: UpdateChangeRole) {
    const body = JSON.stringify(changerole);
    const httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/json');
    return this.http
      .put(this.RootUrl + 'User/Users', body, { headers: httpHeaders })
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
