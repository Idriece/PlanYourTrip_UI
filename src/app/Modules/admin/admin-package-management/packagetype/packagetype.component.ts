import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MatFormField,
  MatInput,
  MatButton,
  MatPaginator,
  MatPaginatorBase,
  MatPaginatorIntl,
  MatError
} from '@angular/material';
import {
  FormControlName,
  FormGroup,
  FormGroupName,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { PackageService } from 'src/app/Modules/admin/admin-package-management/service/package.service';
import { PackageType } from 'src/app/Models/packages/packagetype';

@Component({
  selector: 'app-packagetype',
  templateUrl: './packagetype.component.html',
  styleUrls: ['./packagetype.component.scss']
})
export class PackagetypeComponent implements OnInit {
  paginator: MatPaginator;
  pageLength: number;
  pageIndex: number;
  disable: boolean;

  constructor(
    public thisDialogRef: MatDialogRef<PackagetypeComponent>,
    private packageService: PackageService
  ) {
    this.pageLength = 5;
    this.pageIndex = 0;
  }
  packagetype: FormGroup;
  packagetypelist: Array<PackageType>;
  PackageTypeName = [];
  ngOnInit() {
    this.disable = true;
    this.packageService.GetPackageTypes().subscribe(data => {
      this.packagetypelist = data;
      let i;
      for (i = 0; i < this.packagetypelist.length; i++) {
        this.PackageTypeName[i] = this.packagetypelist[i].Name;
      }
      console.log(this.PackageTypeName);
    });

    this.packagetype = new FormGroup({
      Name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+(([\' ][a-zA-Z ])?[a-zA-Z]*)*$'),
        this.uniquePackageName(this.PackageTypeName)
      ])
    });
  }
  get function() {
    return this.packagetype.controls;
  }

  get packagetypename(): FormControl {
    return this.packagetype.get('Name') as FormControl;
  }

  uniquePackageName(getPackage: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (typeof getPackage === 'undefined') {
        getPackage = this.PackageTypeName;
      }
      if (control.value !== undefined) {
        if (isNaN(control.value)) {
          if (!control.value) {
          } else {
            const name = getPackage.indexOf(control.value);
            if (name >= 0) {
              return { unique: true };
            }
          }
        }
        return null;
      }
    };
  }

  addPackageType() {
    this.disable = false;
    this.packageService.AddPackageType(this.packagetype.value).subscribe(
      success => {
        console.log('Added');
        this.thisDialogRef.close();
      },
      error => {
        console.log('Error');
      }
    );
  }
  CloseDialog() {
    this.thisDialogRef.close();
  }
}
