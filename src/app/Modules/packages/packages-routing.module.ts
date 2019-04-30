import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/Modules/user-signup-login/auth/auth.guard';

import { PackageSearchComponent } from './package-search/package-search.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { BookPackageComponent } from './book-package/book-package.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'search'},
  { path: 'search', component: PackageSearchComponent},
  { path: 'package/:id', component: ViewDetailsComponent},
  { path: 'book', component: BookPackageComponent, canActivate: [AuthGuard], data: {roles: ['NormalUser']} },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard], data: {roles: ['NormalUser']} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagesRoutingModule { }
