import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './Modules/user-signup-login/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: '../app/Modules/home/home.module#HomeModule' },
  { path: 'admin', loadChildren: '../app/Modules/admin/admin.module#AdminModule', canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  { path: 'packages', loadChildren: '../app/Modules/packages/packages.module#PackagesModule'},
  // tslint:disable-next-line:max-line-length
  { path: 'user', loadChildren: '../app/Modules/userprofile/userprofile.module#UserprofileModule', canActivate: [AuthGuard], data: { roles: ['NormalUser'] }},
  // tslint:disable-next-line:max-line-length
  { path: 'signup', loadChildren: '../app/Modules/user-signup-login/user-signup-login.module#UserSignupLoginModule'},
  { path: 'login', loadChildren: '../app/Modules/user-signup-login/user-signup-login.module#UserSignupLoginModule'},
  // tslint:disable-next-line:max-line-length
  { path: 'transport-owner', loadChildren: '../app/Modules/transport-owner/transport-owner.module#TransportOwnerModule', canActivate: [AuthGuard], data: { roles: ['TransportationProvider'] }},
  // tslint:disable-next-line:max-line-length
  { path: 'hotel', loadChildren: '../app/Modules/hotel-owner/hotel-owner.module#HotelOwnerModule', canActivate: [AuthGuard], data: { roles: ['HotelOwner'] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
