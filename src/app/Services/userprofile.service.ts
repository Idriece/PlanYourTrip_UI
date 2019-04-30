import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Userprofile } from 'src/app/Models/userprofile.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService implements OnInit {
  readonly RootUrl = environment.RootUrl;
  user: Userprofile;
userlist: Userprofile[] = [];
  constructor(private Http: HttpClient) { }
  ngOnInit() {

  }



  }
