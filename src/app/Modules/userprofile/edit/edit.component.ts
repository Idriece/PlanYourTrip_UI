import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user-service/user.service';
import { Userprofile } from 'src/app/Models/userprofile.model';
import {FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA, MatList, MatSnackBar } from '@angular/material';
import { Inject } from '@angular/core';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  changedprofile: any;
  public Array = [];
  registerForm: FormGroup;
  ProgressBar = false;
  userprofile: Userprofile = new Userprofile();
  updatedUserProfile: Userprofile = new Userprofile();
  user: User = new User();
  // tslint:disable-next-line:max-line-length
  constructor(public snackBar: MatSnackBar, public thisDialogRef: MatDialogRef<EditComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public formBuilder: FormBuilder , public userService: UserService) {
  }

  ngOnInit() {

this.registerForm = this.formBuilder.group
({
  FirstName: new FormControl(this.data.FirstName, [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(30)
  ]) ,

  LastName: new FormControl(this.data.LastName, [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(30)
  ]) ,
  PhoneNumber: new FormControl(this.data.PhoneNumber, [
    Validators.required,
    Validators.minLength(12),
    Validators.maxLength(15),
  ]) ,
  Password: new FormControl(this.data.PasswordHash, [
  ]),
});

  }
    getErrorMessageFirstName() {
      return this.registerForm.controls.FirstName.hasError('required') ? 'please enter your first name' :
          this.registerForm.controls.FirstName.hasError('pattern') ? 'Should consist of Alphabets only ' :  '';
    }
    getErrorMessageLastName() {
      return this.registerForm.controls.LastName.hasError('required') ? 'please enter your Last name' :
          this.registerForm.controls.LastName.hasError('pattern') ? 'Should consist of Alphabets only ' :  '';
    }
    getErrorMessagePhone() {
      return this.registerForm.controls.PhoneNumber.hasError('required') ? 'please enter your contact number' :
          this.registerForm.controls.PhoneNumber.hasError('pattern') ? 'Invalid Phone Number ' :  '';
    }
    getErrorMessagePassword() {
      return this.registerForm.controls.Password.hasError('required')
        ? 'Atleast 1 Uppercase, 1 Lowercase,1 Special character and 1 number'
        : this.registerForm.controls.Password.hasError('pattern')
          ? 'Invalid Password'
          : '';
    }
    getErrorMessage() {
      return this.registerForm.controls.Email.hasError('required')
        ? 'Please enter your email-Id'
        : this.registerForm.controls.Email.hasError('pattern')
          ? 'Invalid email'
          : '';
    }
    // tslint:disable-next-line:max-line-length
        onCloseCancel() {
          this.thisDialogRef.close();
        }
 // Function to change the Password
        NewPassword() {
          const userupdate = new User();
          userupdate.Email = this.data.Email;
          userupdate.Password = this.registerForm.value.Password;
          this.userService.makePutIdDetails(userupdate).subscribe();
        }

      onRegisterSubmit() {
      this.updatedUserProfile.UserId = this.data.UserId;
      this.updatedUserProfile.Email = this.data.Email;
      this.updatedUserProfile.FirstName = this.registerForm.value.FirstName;
      this.updatedUserProfile.LastName = this.registerForm.value.LastName;
      this.updatedUserProfile.PhoneNumber = this.registerForm.value.PhoneNumber;
      this.userService.putUser(this.updatedUserProfile).subscribe(
            data => {
              this.ProgressBar = false;
              console.log('ok');
              this.thisDialogRef.close();
        },
            error => {
              console.log('error');
            }
          );
    }
    onCloseConfirm() {
      this.thisDialogRef.close();

    }
    openSnackBar(message: string, action?: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      }
    );
    }
}
