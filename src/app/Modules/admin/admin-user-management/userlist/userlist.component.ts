import { Component, OnInit } from '@angular/core';
import {
  MatPaginator,
  MatFormField,
  MatProgressSpinner,
  MatFormFieldControl,
  MatChipsModule,
  MatCardModule
} from '@angular/material';
import { PackageService } from 'src/app/Modules/admin/admin-user-management/package.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  panelOpenState = false;
  public Array = [];
  wait: boolean;
  constructor(private httpservices: PackageService) {}
  // Function to get the list of user details
  ngOnInit() {
    this.wait = true;
    this.httpservices.makeGetListRequest().subscribe(
      (data: any) => {
        this.Array = data;
        this.wait = false;
      },
      error => {}
    );
  }
}
