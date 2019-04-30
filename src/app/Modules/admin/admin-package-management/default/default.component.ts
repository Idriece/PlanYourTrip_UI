import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogConfig,
  MatHeaderCell,
  MatHeaderCellDef,
  MatColumnDef,
  MatCell,
  MatTable,
  MatTableDataSource,
  MatTooltip
} from '@angular/material';
import { EditpackageComponent } from '../editpackage/editpackage.component';
import { CreatepackageComponent } from '../createpackage/createpackage.component';
import { PackagelistComponent } from '../packagelist/packagelist.component';
import { Package } from 'src/app/Models/packages/package';
import { PackageService } from 'src/app/Modules/admin/admin-package-management/service/package.service';
import { PackagetypeComponent } from 'src/app/Modules/admin/admin-package-management/packagetype/packagetype.component';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  packagelist = [];
  isProgress: boolean;
  constructor(
    public packageService: PackageService,
    private dailog: MatDialog
  ) {}
  ngOnInit() {
    this.isProgress = true;
    this.packageService.GetPackages().subscribe(
      data => {
        this.packagelist = data;
        this.isProgress = false;
      },
      error => {
        console.log('error in fetching package list');
        this.isProgress = true;
      }
    );
  }

  openDialog() {
    const dailogConfig = new MatDialogConfig();
    dailogConfig.disableClose = true;
    dailogConfig.autoFocus = true;
    const open = this.dailog.open(PackagetypeComponent, dailogConfig);
    open.afterClosed().subscribe(
      success => {
        this.ngOnInit();
      },
      error => {
        console.log('some error');
      }
    );
  }
}
