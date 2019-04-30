import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user-service/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { passValidator } from './Validator';
import {
  MatDialog,
  MatDialogTitle,
  MatSnackBar,
  MatStep
} from '@angular/material';
import { EmailArray } from 'src/app/Models/EmailArray';
import { City } from 'src/app/Models/SharedModels/city';
import { AdminManageHotelService } from 'src/app/Modules/admin/admin-hotel-management/AdminHotelService/admin-manage-hotel.service';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  registerForm: FormGroup;
  ProgressBar = false;
  hide = true; // initialising for password mat icon
  flag = false;
  wait = false;
  cities: Array<City>;
  public emailArray = new Array<string>(); // to store all the emails from the database for uniqueness
  // Custom Error Messages for all the fields
  getErrorMessage() {
    return this.registerForm.controls.Email.hasError('required')
      ? 'Please enter your email-Id'
      : this.registerForm.controls.Email.hasError('pattern')
        ? 'Invalid email'
        : '';
  }
  getErrorMessagePassword() {
    return this.registerForm.controls.Password.hasError('required')
      ? 'Atleast 1 Uppercase, 1 Lowercase,1 Special character and 1 number'
      : this.registerForm.controls.Password.hasError('pattern')
        ? 'Invalid Password'
        : '';
  }
  getErrorMessageUserName() {
    return this.registerForm.controls.UserName.hasError('required')
      ? 'please enter a unique username'
      : this.registerForm.controls.UserName.hasError('pattern')
        ? 'Should have atleast 1 letter '
        : '';
  }
  getErrorMessageFirstName() {
    return this.registerForm.controls.FirstName.hasError('required')
      ? 'please enter your first name'
      : this.registerForm.controls.FirstName.hasError('pattern')
        ? 'Should consist of Alphabets only '
        : '';
  }
  getErrorMessageLastName() {
    return this.registerForm.controls.LastName.hasError('required')
      ? 'please enter your Last name'
      : this.registerForm.controls.LastName.hasError('pattern')
        ? 'Should consist of Alphabets only '
        : '';
  }
  getErrorMessagePhone() {
    return this.registerForm.controls.PhoneNumber.hasError('required')
      ? 'please enter your contact number'
      : this.registerForm.controls.PhoneNumber.hasError('pattern')
        ? 'Invalid Phone Number '
        : '';
  }
  constructor(
    private formBuilder: FormBuilder,
    private SignupService: UserService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private hotelManager: AdminManageHotelService
  ) // injecting all the providers like user services,formbuilder,mat dialog and mat snackbar
  // tslint:disable-next-line:one-line
  {
    this.registerForm = this.formBuilder.group(
      // tracking the value and validity state of a FormBuilder instance group.
      {
        // tracking the value and validity status of angular form controls. It matches to a HTML form control like an input.
        UserName: [
          this.user.UserName,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(30)
          ]
        ],
        FirstName: [
          this.user.FirstName,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(30)
          ]
        ],
        LastName: [
          this.user.LastName,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(30)
          ]
        ],
        CityId: [
          this.user.CityId,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(30)
          ]
        ],
        PhoneNumber: [
          this.user.PhoneNumber,
          [
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(15)
          ]
        ],
        Email: [
          this.user.Email,
         [
           Validators.required,
            Validators.email
          ]
        ],
        Password: [
          this.user.Password,
          [
            Validators.required
          ]
        ],
        ConfirmPassword: [
          '',
           [
             Validators.required,
              passValidator
            ]
          ]
      }
    );
    this.registerForm.controls.Password.valueChanges
    .subscribe(
      x => this.registerForm.controls.ConfirmPassword.updateValueAndValidity()
    );
  }
  ngOnInit() // tslint:disable-next-line:one-line
  {
    this.SignupService.getEmail().subscribe(
      data => {
        this.emailArray = data;
      },
      error => {
        console.log('couldn\'t get email list ');
      }
    );

    this.hotelManager.getAllCitiesList().subscribe(
      data => {
        this.cities = data;
      },
      error => {
        console.log('couldn\'t get cities list');
      }
    );
  }
  onRegisterSubmit() {
    this.openSnackBar('Have patience You are being registered !');
    if (this.emailArray.indexOf(this.registerForm.controls.Email.value) >= 0) {
      // checking if the current email input matches with the existing emails in the database
      // tslint:disable-next-line:one-line
      this.flag = true; // if not an existing email then further registration can be done
      this.openSnackBar('Sorry Email already exists');
    } else {
      this.ProgressBar = true;
      // tslint:disable-next-line:prefer-const
      let userupdate = new User();
      userupdate.Email = this.registerForm.controls.Email.value;
      userupdate.UserName = this.registerForm.controls.UserName.value;
      userupdate.FirstName = this.registerForm.controls.FirstName.value;
      userupdate.LastName = this.registerForm.controls.LastName.value;
      userupdate.Password = this.registerForm.controls.Password.value;
      userupdate.PhoneNumber = this.registerForm.controls.PhoneNumber.value;
      userupdate.CityId = this.registerForm.controls.CityId.value;
      this.SignupService.registerUser(userupdate).subscribe(
        success => {
          this.ProgressBar = false;
          this.openSnackBar('Congratulations You are successfully Registered');
          console.log('All Ok');
        },
        failure => {
          this.ProgressBar = false;
          this.openSnackBar('Sorry!! Cannot Register same User Name Again');
          console.log('error');
        }
      );
      this.dialog.closeAll();
    }
  }
  Close() {
    this.dialog.closeAll();
  }
  openSnackBar(message: string, action?: string) {
    // function for material snackbar
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
