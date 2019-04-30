import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Headers, Response, RequestMethod, RequestOptions } from '@angular/http';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { PackageType } from '../Models/packagetypemodel';
import { Package } from '../Models/packages/package';
import { UpdateChangeRole } from 'src/app/Models/update-change-role';
import { AdminPackage } from '../Models/packages/adminpackage';
import { PackageName } from 'src/app/Models/packages/packagename';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  id: number;
  RootUrl = environment.RootUrl;
  constructor(private http: HttpClient) { }
  GetPackageTypes() {
   return this.http.get<Array<PackageType>>(this.RootUrl + 'packages/packagetypes');
  }

  GetPackages(): Observable<AdminPackage[]> {
    return this.http.get<AdminPackage[]>(this.RootUrl + 'packages/getpackages');
  }

  PostPackage(pack: AdminPackage) {
    const body = JSON.stringify(pack);
   const header = new HttpHeaders().set('Content-type', 'application/json');
   return this.http.post<AdminPackage>(this.RootUrl + 'packages/postpackage', body, {headers: header});
  }
  PutPackage(id, pack: AdminPackage){
    var body = JSON.stringify(pack);
    let header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.put<AdminPackage>(this.RootUrl+ 'packages/putpackage/'+id, body, {headers:header})
    }
  GetPackageName() {
    return this.http.get<Array<PackageName>>(this.RootUrl + 'packages/GetPackageName');
  }
  public makeGetRequest(): Observable<any> {
    return this.http.get(this.RootUrl + 'User/Users');
  }
  public makePutRequest(changerole: UpdateChangeRole) {
    const body = JSON.stringify(changerole);
    const httpHeaders = new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    .set('Content-Type', 'application/json');
    return this.http.put(this.RootUrl + 'User/Users', body, {headers: httpHeaders});
  }
}
