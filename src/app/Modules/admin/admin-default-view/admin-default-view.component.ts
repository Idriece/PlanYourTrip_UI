import { Component, OnInit } from '@angular/core';
import { MatGridList, MatGridTile, MatCard, MatButton, MatCardTitle, MatProgressBarModule } from '@angular/material';
import { PackageService } from 'src/app/Modules/admin/admin-user-management/package.service';

@Component({
  selector: 'app-admin-default-view',
  templateUrl: './admin-default-view.component.html',
  styleUrls: ['./admin-default-view.component.scss']
})
export class AdminDefaultViewComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  Array = [{UserCount: null, PackageCount: null, HotelCount: null, AverageProfit: null, TotalPrice: null, TransportationCount: null, BookingCount: null}];
  wait: boolean;

  color = 'warn';
  mode = 'determinate';
  value1 = 0;
  value2 = 0;

  constructor(private httpservices: PackageService) {}

  ngOnInit() {
    this.wait = true;
    this.httpservices.makeGetCountRequest().subscribe(
      (data: any) => {
        this.wait = false;
        this.Array = data;
        this.value1 = this.Array[0].AverageProfit;
      },
      error => {}
    );

  }
}
