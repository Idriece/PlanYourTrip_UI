import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/Components/components.module';
import { HomeRoutingModule } from './home-routing.module';
import { MatCardModule, MatButtonModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatDividerModule } from '@angular/material';
import { timer } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs';

import { ImageSliderComponent } from './image-slider/image-slider.component';
import { HomeComponent } from './home.component';
import { SuggestedPackagesComponent } from './suggested-packages/suggested-packages.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    HomeRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  declarations: [
    ImageSliderComponent,
    HomeComponent,
    SuggestedPackagesComponent,
    CategoriesComponent
  ]
})
export class HomeModule { }
