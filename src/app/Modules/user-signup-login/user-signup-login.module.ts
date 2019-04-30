import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSignupLoginRoutingModule } from './user-signup-login-routing.module';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { MatIconModule, MatDialogConfig,
   // tslint:disable-next-line:max-line-length
   MatDialogModule, MatSnackBarModule, MatProgressBarModule, MatStepperModule, MatChipsModule, MatProgressSpinnerModule } from '@angular/material';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatRippleModule, MatSelectModule } from '@angular/material';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { CityComponent } from './user/city/city.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    ReactiveFormsModule,
    UserSignupLoginRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatStepperModule
  ],
  exports: [],
  declarations: [SignUpComponent, SignInComponent, UserComponent, ForgotPasswordComponent, CityComponent],
  providers: [AuthGuard],
  entryComponents: [SignInComponent, SignUpComponent, CityComponent]
})
export class UserSignupLoginModule { }
