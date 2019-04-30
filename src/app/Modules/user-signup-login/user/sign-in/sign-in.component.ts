import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../Services/user-service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:max-line-length
import {
  MatDialog,
  MatDialogConfig,
  MatSnackBar,
  MatError,
  AnimationDurations,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { Validators, FormControl, FormGroup, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ForgotPasswordComponent } from 'src/app/Modules/user-signup-login/user/forgot-password/forgot-password.component';
import { AuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';
import { CityComponent } from '../city/city.component';
import { SocialUserDTO } from '../../../../Models/SocialUserDTO';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isLoginError = false;
  isCity = false;
  isProgressBar = false;
  userName: string;
  hitCancel = true;
  isSubmit = false;
  role: string;
  user: SocialUserDTO;
  loggedIn: boolean;
  socialUserName: string;
  isGoogle = false;
  isGoogleProgressBar = false;
  existingUser = false;
  public emailArray = new Array<string>();
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}
  loginForm: FormGroup;
  returnUrl: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit() {
    this.loginForm = new FormGroup({
      UserName: new FormControl(null, [Validators.required]),
      Password: new FormControl(null, [Validators.required])
    });
  }

  Google() {
    this.userService.externalLogin(this.user).subscribe(
      (data: any) => {
        this.role = JSON.stringify(data.message);
        this.socialUserName = this.user.email.split('@')[0];
        sessionStorage.setItem('userName', this.socialUserName);
        sessionStorage.setItem('userToken', this.user.authToken);
        sessionStorage.setItem('userRoles', this.role);
        this.isGoogleProgressBar = false;
        this.dialog.closeAll();
        // location.reload();
        this.openSnackBar('You are Logged In Successfully!!!');
      },
      (err: HttpErrorResponse) => {
        this.openSnackBar('Login Failed!!! Please try Again');
        this.isGoogle = false;
        this.hitCancel = true;
        this.isGoogleProgressBar = false;
        this.isLoginError = true;
      }
    );
  }

  signInWithGoogle(): void {
    this.userService.getEmail().subscribe(
      data => {
        this.emailArray = data;
      },
      error => {
        console.log('couldn\'t get email list ');
      }
    );
    this.resetLogin(this.loginForm);
    this.isGoogle = true;
    this.hitCancel = false;
    this.isGoogleProgressBar = true;
    this.openSnackBar('Logging In!!! Please Wait');
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then( (userData: SocialUserDTO) => {
        if (userData != null) {
          this.user = userData;
          if ( this.emailArray.indexOf(this.user.email) >= 0) {
              this.existingUser = true;
            } else {
              this.existingUser = false;
            }
          if (this.existingUser === false) {
            this.openCityDialog();
            this.userService.selectedCity.subscribe(data => {
              this.user.cityId = data;
              if (this.user.cityId) {
                this.Google();
              }
            });
          } else {
            this.Google();
          }
        }
      });
  }

  openCityDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    const viewDialog = this.dialog.open(CityComponent, addDialogConfig);
    viewDialog.afterClosed().subscribe(data => {
    });
  }

  resetLogin(formGroup: FormGroup) {
    formGroup.reset();
    formGroup.markAsUntouched();
  }

  get function() {
    return this.loginForm.controls;
  }

  NormalLogin() {
    this.isSubmit = true;
    this.hitCancel = false;
    this.isProgressBar = true;
    this.openSnackBar('Logging In!!! Please Wait');
    // tslint:disable-next-line:max-line-length
    this.userService
      .userAuthentication(
        this.loginForm.get('UserName').value,
        this.loginForm.get('Password').value
      )
      .subscribe(
        (data: any) => {
          this.userName = this.loginForm.get('UserName').value;
          sessionStorage.setItem('userToken', data.access_token);
          sessionStorage.setItem('userRoles', data.role);
          sessionStorage.setItem('userName', this.userName);
          this.openSnackBar('You are Logged In Successfully!!!');
          this.isProgressBar = false;
          this.dialog.closeAll();
         // location.reload();
        },
        (err: HttpErrorResponse) => {
          this.openSnackBar('User Name or Password is incorrect! Please Try Again');
          this.isSubmit = false;
          this.hitCancel = true;
          this.isProgressBar = false;
          this.resetLogin(this.loginForm);
          this.isLoginError = true;
        }
      );
  }
  openSignupDialog() {
    this.dialog.closeAll();
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    const viewDialog = this.dialog.open(SignUpComponent, addDialogConfig);
    viewDialog.afterClosed().subscribe(data => {
      console.log('OK');
    });
  }

  Cancel() {
    this.hitCancel = true;
    this.dialog.closeAll();
  }
  openSnackBar(message: string, action?: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = 2000;
    this.snackBar.open(message, action, config);
  }
  openForgetPassword() {
    this.dialog.closeAll();
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.autoFocus = true;
    addDialogConfig.width = '900px';
    addDialogConfig.height = '500px';
    const viewDailogBox = this.dialog.open(
      ForgotPasswordComponent,
      addDialogConfig
    );
    viewDailogBox.afterClosed().subscribe();
  }
}
