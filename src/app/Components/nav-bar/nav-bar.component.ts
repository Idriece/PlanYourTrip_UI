import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SignInComponent } from '../../Modules/user-signup-login/user/sign-in/sign-in.component';
import { SignUpComponent } from '../../Modules/user-signup-login/user/sign-up/sign-up.component';
import { UserService } from '../../Services/user-service/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isHotelOwner = false;
  isTransportOwner = false;
  title = 'Plan Your Trip';
  loggedIn = false;
  isAdmin = false;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.LoggedIn();
  }

  // Open Login dialog
  openLoginDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    const viewDialog = this.dialog.open(SignInComponent, addDialogConfig);
    viewDialog.afterClosed().subscribe(data => {
      this.LoggedIn();
    });
  }

  // Open Signup dialog
  openSignupDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    const viewDialog = this.dialog.open(SignUpComponent, addDialogConfig);
    viewDialog.afterClosed().subscribe(data => {});
  }
isLogin() {
  if (sessionStorage.getItem('userToken') != null) {
  return true;
  } else {
  return false;
  }
}
  // Check if the user is logged in and route to related page
  LoggedIn() {
    if (sessionStorage.getItem('userToken') != null) {
        this.loggedIn = true;
        if (this.userService.roleMatch(['Admin'])) {
          this.isAdmin = true;
          this.router.navigateByUrl('/admin');
        } else if (this.userService.roleMatch(['HotelOwner'])) {
          this.isHotelOwner = true;
          this.router.navigateByUrl('/hotel');
        } else if (this.userService.roleMatch(['TransportationProvider'])) {
          this.isTransportOwner = true;
          this.router.navigateByUrl('/transport-owner');
        }
    } else {
      this.loggedIn = false;
    }
  }


isTransportationProviderLogin() {
  if (sessionStorage.getItem('userToken') != null) {
    if (this.userService.roleMatch(['TransportationProvider'])) {
      return true;
    } else {
      return false;
    }
  }
}

isHotelOwnerLogin() {
  if (sessionStorage.getItem('userToken') != null) {
    if (this.userService.roleMatch(['HotelOwner'])) {
      return true;
    } else {
      return false;
    }
  }
}

isAdminLogin() {
  if (sessionStorage.getItem('userToken') != null) {
    if (this.userService.roleMatch(['Admin'])) {
      return true;
    } else {
      return false;
    }
  }
}

  // Remove user token from session storage
  Logout() {
    if (sessionStorage.getItem('userToken')) {
      // sessionStorage.removeItem('userToken');
      // sessionStorage.removeItem('userRoles');
      // sessionStorage.removeItem('userName');
      sessionStorage.clear();
      this.loggedIn = false;
      this.router.navigateByUrl('/home');
    } else {
    }
  }
}
