import { Component, OnInit } from '@angular/core';
import { Userprofile } from 'src/app/Models/userprofile.model';
import { UserService } from 'src/app/Services/user-service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { EditComponent } from 'src/app/Modules/userprofile/edit/edit.component';
import { Observable } from 'rxjs';
import { UserInterest } from 'src/app/Models/user-interest';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AbstractControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { PackageService } from 'src/app/Modules/admin/admin-package-management/service/package.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailComponent implements OnInit {
  userprofile: Userprofile = new Userprofile();
  userNameStr: string;
  addInterestForm: FormGroup;
  interest: string;
  flag = false;

interests = [];
    // tslint:disable-next-line:max-line-length
    packagetypelist = [];
    // tslint:disable-next-line:max-line-length
    constructor(private packagetype: PackageService, private dialog: MatDialog, public userService: UserService, private fb: FormBuilder, public snackBar: MatSnackBar) {

     }
    ngOnInit() {
      this.packagetype.GetPackageTypes().subscribe(data => {
        this.packagetypelist = data;
      });
this.addInterestForm = this.fb.group({
  interest : new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(30)
  ])
});

  this.userNameStr = sessionStorage.getItem('userName');
  this.getUserDetails(this.userNameStr);
}

async getUserDetails(usrName: string) {
  await  this.userService.getdetails(usrName).subscribe((data: any) => {
    this.userprofile = data;

console.log(this.userprofile);
this.interests = this.userprofile.Interests;
console.log(this.interests);
this.getUserInterestByID(this.userprofile.UserId);
},
failure => {
console.log('error');
});
}
async getUserInterestByID(id: string) {
  await  this.userService.getUserInterests(id).subscribe((data: any) => {
    this.interests = data;
},
failure => {
console.log('error');
});
}

openDialog(i: string) {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.autoFocus = true;
    addDialogConfig.data = this.userprofile;
    const viewDailogBox = this.dialog.open( EditComponent, addDialogConfig);
    viewDailogBox.afterClosed().subscribe(
      success => {
        this.ngOnInit();
      }
    );
    }
    getErrorMessageInterest() {
      return this.addInterestForm.controls.interest.hasError('pattern') ? 'Should consist of Alphabets only ' :  '';
    }

// Add user Interests
    addUserInterest() {
      const inter: UserInterest = new UserInterest();
      inter.Id = this.userprofile.UserId;
      inter.Interest = this.addInterestForm.get('interest').value;
      console.log(inter.Interest);
      console.log(this.userprofile.Interests);
        if (this.addInterestForm.controls.interest.value === '') {
        this.flag = true;
        this.openSnackBar('Enter a valid Interest');
    } else {
      this.userService.AddNewInterest(inter).subscribe(success => {this.ngOnInit(); } );
      this.addInterestForm.reset();
          }
        }

// Delete the user Interests
      deleteUserInterest(interestID: number) {
      console.log(interestID);
        this.userService.deleteInterest(interestID).subscribe(success => {this.ngOnInit(); } );
        }
        openSnackBar(message: string, action?: string) {
          this.snackBar.open(message, action, {
            duration: 2000,
          }
        );
        }
      }
