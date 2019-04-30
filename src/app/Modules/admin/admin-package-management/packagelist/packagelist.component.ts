import { Component, OnInit } from '@angular/core';
import {
  MatCard,
  MatDialogConfig,
  MatDialog,
  Sort,
  MatSortHeader,
  MatSortable,
  MatSortBase,
  MatTableDataSource,
  MatTooltip,
  MatPaginator,
  MatPaginatorBase,
  MatPaginatorIntl
} from '@angular/material';
import { EditpackageComponent } from '../editpackage/editpackage.component';
import { PackageType } from 'src/app/Models/packagetypemodel';
import { HttpClient } from '@angular/common/http';
import { AdminPackage } from 'src/app/Models/packages/adminpackage';
import { Package } from 'src/app/Models/packages/package';
import { PackageService } from 'src/app/Modules/admin/admin-package-management/service/package.service';
import { CreatepackageComponent } from '../createpackage/createpackage.component';

@Component({
  selector: 'app-packagelist',
  templateUrl: './packagelist.component.html',
  styleUrls: ['./packagelist.component.scss']
})
export class PackagelistComponent implements OnInit {
  dataSource = new MatTableDataSource();
  packagelist = Array<AdminPackage>();
  packagetypelist = [];
  sortedData: AdminPackage[];
  isProgressBar: boolean;

  constructor(
    private dailog: MatDialog,
    public packageservice: PackageService
  ) {}
  async packageList() {
    await this.packageservice
      .GetPackages()
      .toPromise()
      .then(
        data => {
          this.packagelist = data;
          this.dataSource.data = data;
        },
        error => {
          console.log('Error in Loading Package List');
        }
      );
    this.sortedData = this.packagelist;
  }
  ngOnInit() {
    this.packageList();
  }
  openDialog(i: number) {
    const dailogConfig = new MatDialogConfig();
    dailogConfig.data = this.packagelist.find(c => c.PackageID === i);
    dailogConfig.disableClose = true;
    dailogConfig.autoFocus = true;
    console.log(dailogConfig.data);
    const open = this.dailog.open(EditpackageComponent, dailogConfig);
    open.afterClosed().subscribe(
      success => {
        this.ngOnInit();
      },
      error => {
        console.log('some error');
      }
    );
  }
  AllPackage() {
    this.sortedData = this.packagelist;
  }
  unAvailable() {
    this.sortedData = this.packagelist.filter(
      data => data.NumberAvailable === 0
    );
  }
  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'packagename':
          return compare(a.PackageName, b.PackageName, isAsc);
        case 'packagetype':
          return compare(a.PackageTypeID, b.PackageTypeID, isAsc);
        case 'days':
          return compare(a.Days, b.Days, isAsc);
        case 'price':
          return compare(a.Price, b.Price, isAsc);
        case 'minimumpeople':
          return compare(a.MinPeople, b.MinPeople, isAsc);
        case 'maximumpeople':
          return compare(a.MaxPeople, b.MaxPeople, isAsc);
        case 'numberavailable':
          return compare(a.NumberAvailable, b.NumberAvailable, isAsc);
        case 'profitpercentage':
          return compare(a.ProfitPercentage, b.ProfitPercentage, isAsc);
        default:
          return 0;
      }
    });
    function compare(a, b, isAsc) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
