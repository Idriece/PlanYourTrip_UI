import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ComponentsModule } from 'src/app/Components/components.module';
import { MatDialogModule } from '@angular/material';

import { PackagesRoutingModule } from './packages-routing.module';
import { PackageSearchComponent } from './package-search/package-search.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { BookPackageComponent } from './book-package/book-package.component';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    PackagesRoutingModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  declarations: [PackageSearchComponent, ViewDetailsComponent, BookPackageComponent, WishlistComponent]
})
export class PackagesModule { }
