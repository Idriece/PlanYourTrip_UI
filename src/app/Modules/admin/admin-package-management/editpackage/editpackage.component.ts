import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { PackageService } from 'src/app/Modules/admin/admin-package-management/service/package.service';
import { Validators, ValidatorFn } from '@angular/forms';
import {
  MatError,
  MatCheckbox,
  MatHint,
  MAT_DIALOG_DATA,
  MatSnackBar
} from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { AdminPackage } from 'src/app/Models/packages/adminpackage';
import { FormControl, AbstractControl } from '@angular/forms';
import { PackageType } from 'src/app/Models/packagetypemodel';
import { PackageName } from 'src/app/Models/packages/packagename';

@Component({
  selector: 'app-editpackage',
  templateUrl: './editpackage.component.html',
  styleUrls: ['./editpackage.component.scss']
})
export class EditpackageComponent implements OnInit {
  constructor(
    public thisDialogRef: MatDialogRef<EditpackageComponent>,
    private formBuilder: FormBuilder,
    public packageService: PackageService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  packagestypelist = Array<PackageType>();
  packagelist: Array<AdminPackage>;
  packagenamelist: Array<PackageName>;
  editpackageForm: FormGroup;
  isError: false;
  disable: boolean;

  ngOnInit() {
    this.disable = true;
    this.packageService.GetPackageTypes().subscribe(
      data => {
        this.packagestypelist = data;
      },
      error => {
        console.log('error');
      }
    );

    this.packageService.GetPackageName().subscribe(data => {
      this.packagenamelist = data;
    });
    this.editpackageForm = new FormGroup({
      packageName: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Za-z ]*$'),
        Validators.maxLength(100),
        Validators.minLength(3),
        this.uniquepackagename(this.packagenamelist, this.data.PackageName)
      ]),

      packagetypeid: new FormControl(
        this.data.PackageTypeID,
        Validators.required
      ),

      summary: new FormControl(this.data.Summary, [Validators.required]),
      numAvailable: new FormControl(this.data.NumberAvailable, [
        Validators.required,
        Validators.min(1),
        Validators.max(20)
      ]),
      minimumPeople: new FormControl(this.data.MinPeople, [
        Validators.required,
        Validators.min(1),
        Validators.max(14)
      ]),
      maximumPeople: new FormControl(this.data.MaxPeople, [
        Validators.required,
        Validators.min(1),
        Validators.max(15),
        this.passValidation()
      ])
    });

    this.packageService.GetPackageTypes().subscribe(
      data => {
        this.packagestypelist = data;
      },
      error => {
        console.log('error');
      }
    );

    this.packageService.GetPackageName().subscribe(data => {
      this.packagenamelist = data;
    });

    this.editpackageForm.get('minimumPeople').valueChanges.subscribe(data => {
      this.editpackageForm
        .get('maximumPeople')
        .updateValueAndValidity({ onlySelf: true });
    });
  }
  get function() {
    return this.editpackageForm.controls;
  }

  get packagetypes(): FormControl {
    const types = this.editpackageForm.get('packagetypeid');
    if (!types) {
      return new FormControl();
    }
    return types as FormControl;
  }

  uniquepackagename(
    getPackage: Array<PackageName>,
    packageName: string
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (typeof getPackage === 'undefined') {
        getPackage = this.packagenamelist;
      }
      if (typeof packageName === 'undefined') {
        packageName = this.data.datakey.PackageName;
      }
      if (control.value !== undefined) {
        if (isNaN(control.value)) {
          if (!control.value) {
          } else {
            let index: number;
            index = getPackage.indexOf(control.value);
            if (index >= 0) {
              if (index !== getPackage.indexOf(this.data.PackageName)) {
                if (control.value !== this.data.PackageName) {
                  return { unique: true };
                }
              }
            }
          }
        }
        return null;
      }
    };
  }

  passValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== null || control.value !== undefined) {
        const maxValue = control.value;
        const minControl = control.root.get('minimumPeople');
        if (minControl) {
          const minValue = minControl.value;
          if (maxValue <= minValue) {
            return {
              isError: true
            };
          }
        }
      }
      return null;
    };
  }

  get max(): FormControl {
    return this.editpackageForm.get('maximumPeople') as FormControl;
  }

  get Packagename(): FormControl {
    const packagenames = this.editpackageForm.get('packageName');
    if (!packagenames) {
      return new FormControl();
    }
    return packagenames as FormControl;
  }

  onSave(createpackage: NgForm) {
    const summaryregex = /^[!1234567890@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    if (this.editpackageForm.get('summary').value.trim() === '' || summaryregex.test(this.editpackageForm.get('summary').value)) {
        this.snackBar.open('Summary cannot be empty', '', {duration: 2000});
    } else {
      this.disable = false;
      this.packageService
      .PutPackage(this.data.PackageID, this.editpackageForm.value)
      .subscribe(
        success => {
          this.thisDialogRef.close();
          console.log('success');
        },
        error => {
          console.log('failure');
        }
      );
    }
  }
  CloseDialog() {
    this.thisDialogRef.close();
  }
}
