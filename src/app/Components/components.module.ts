import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import {
  MatCardModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule
} from '@angular/material';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PackageListComponent } from 'src/app/Components/package-list/package-list.component';
import { SearchBarComponent } from 'src/app/Components/search-bar/search-bar.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatPaginatorModule
  ],
  declarations: [NavBarComponent, PackageListComponent, SearchBarComponent],
  exports: [NavBarComponent, PackageListComponent, SearchBarComponent]
})
export class ComponentsModule {}
