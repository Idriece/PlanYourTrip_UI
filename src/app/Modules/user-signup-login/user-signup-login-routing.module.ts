import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent} from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { ForgotPasswordComponent } from 'src/app/Modules/user-signup-login/user/forgot-password/forgot-password.component';

const routes: Routes =  [
  {path: '', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: SignInComponent},
  {path: 'forgetpassword', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSignupLoginRoutingModule { }
