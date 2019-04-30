import { Component, OnInit } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  NgForm
} from '@angular/forms';
import { User } from 'src/app/Models/user.model';
import { MatDialog, MatChipsModule } from '@angular/material';
import { UserService } from 'src/app/Services/user-service/user.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  message = false;
  wait: boolean;
  Array: any;
  OTP: string;
  isLinear: false;
  user: User = new User();
  registerForm: FormGroup;
  PasswordForm: FormGroup;
  validuser: FormGroup;
  hide = true;
  val = String;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private httpservices: UserService
  ) {
    this.registerForm = this.formBuilder.group({
      Email: [null, [Validators.required, Validators.email]]
    });
    this.PasswordForm = this.formBuilder.group({
      Password: [this.user.Password, [Validators.required]]
    });
    this.validuser = this.formBuilder.group({
      Ottp: [null, [Validators.required, Validators.min(5)]]
    });
  }

  get otp() {
    return this.validuser.get('Ottp') as FormGroup;
  }
  getErrorMessage() {
    return this.registerForm.controls.Email.hasError('required')
      ? 'Please enter your email-Id'
      : this.registerForm.controls.Email.hasError('pattern')
        ? 'Invalid email'
        : '';
  }
  getErrorMessagePassword() {
    return this.PasswordForm.controls.Password.hasError('required')
      ? 'Atleast 1 Uppercase, 1 Lowercase,1 Special character and 1 number'
      : this.PasswordForm.controls.Password.hasError('pattern')
        ? 'Invalid Password'
        : '';
  }
  // Function to Close Dialog window
  Close() {
    console.log(Array);
    this.dialog.closeAll();
  }
  // Function to send Email for verification
  SendId() {
    const userupdate = new User();
    userupdate.Email = this.registerForm.controls.Email.value;
    this.httpservices.makeGetIdDetails(userupdate.Email).subscribe(
      (data: any) => {
        this.Array = data;
        console.log(this.Array);
        this.ValidUserMessageBtn();
        this.message = true;
      },
      error => {}
    );
  }
  // Function to check the user is valid or not
  ValidUserMessage() {
    if (this.Array == null) {
      return 'Your are not valid user';
    } else {
      return 'Hi' + this.Array.UserName + '';
    }
  }
// Function to Enable button to next stepper
  ValidUserMessageBtn() {
    if (this.Array == null) {
      this.canNext = false;
      return false;
    } else {
      this.canNext = true;
      return true;
    }
  }
  // Function to create New Password
  NewPassword() {
    const userupdate = new User();
    userupdate.Email = this.registerForm.controls.Email.value;
    userupdate.Password = this.PasswordForm.controls.Password.value;
    console.log(this.registerForm.controls.Email.value);
    console.log(this.PasswordForm.controls.Password.value);
    userupdate.CityId = 0;
    userupdate.UserName = '';
    userupdate.FirstName = '';
    userupdate.LastName = '';
    userupdate.PhoneNumber = '';
    this.httpservices.makePutIdDetails(userupdate).subscribe();
  }
  // Fuction to get the OTP to client side
  Otp() {
    const userupdate = new User();
    userupdate.Email = this.registerForm.controls.Email.value;
    this.httpservices.makeGetOtp(userupdate.Email).subscribe(
      (data: any) => {
        this.OTP = data;
        console.log(this.OTP);
      },
      error => {}
    );
  }
  // Check OTP is valid or not
  check() {
    if (this.validuser.controls.Ottp.value === this.OTP) {
      this.IsOtp = true;
    } else {
      this.IsOtp = false;
    }
  }
  // tslint:disable-next-line:member-ordering
  canNext: boolean;
  // tslint:disable-next-line:member-ordering
  IsOtp: boolean;

  ngOnInit() {}
}
