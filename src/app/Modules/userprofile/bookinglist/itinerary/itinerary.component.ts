import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user-service/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {
  wait = true;
  Array: any;
  panelOpenState = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,  private httpservices: UserService) {}

  ngOnInit() {
    const PackageId = this.data.PackageId;
    if(this.data.IsCustomized) {
      this.httpservices.getCustomItinerary(PackageId).subscribe(
        (data: any) => {
          this.Array = data;
          console.log(this.Array);
          this.wait = false;
        },
        error => {}
      );
    } else {
      this.httpservices.getItinerary(PackageId).subscribe(
        (data: any) => {
          this.Array = data;
          console.log(this.Array);
          this.wait = false;
        },
        error => {}
      );
    }
  }
  Okey() {
    this.dialog.closeAll();
  }
}
