import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../../../Services/user-service/user.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SignInComponent } from 'src/app/Modules/user-signup-login/user/sign-in/sign-in.component';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService, public dialog: MatDialog) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (sessionStorage.getItem('userToken') != null) {
        const roles = next.data['roles'] as Array<string>;
        if (roles) {
          const match = this.userService.roleMatch(roles);
          if (match) {
            return true;
          } else {
            this.router.navigate(['/home']);
            return false;
          }
        } else {
          return true;
        }
      }
      this.router.navigate(['/home']);
      return false;
  }
}
