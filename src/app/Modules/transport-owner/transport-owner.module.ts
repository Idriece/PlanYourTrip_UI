import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportOwnerRoutingModule } from './transport-owner-routing.module';
import { TransportviewComponent } from './transportview/transportview.component';
import { TransportOwnerCheckInComponent } from './transport-owner-check-in/transport-owner-check-in.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule, MatProgressBarModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
// tslint:disable-next-line:max-line-length
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
// tslint:disable-next-line:quotemark
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CheckInComponent } from './check-in/check-in.component';

@NgModule({
  imports: [
    CommonModule,
    TransportOwnerRoutingModule,
    MatTabsModule,
    MatPaginatorModule,
    MatListModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatTooltipModule,
    MatGridListModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTabsModule,
    MatCardModule
  ],
  declarations: [
    TransportviewComponent,
    TransportOwnerCheckInComponent,
    CheckInComponent
  ],
  entryComponents: [CheckInComponent]
})
export class TransportOwnerModule {}
