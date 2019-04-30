import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransportationProviderAllDetails } from 'src/app/Models/TProviderModel/transportation-provider-all-details';
import { TransportownerService } from 'src/app/Modules/transport-owner/transport-owner.service';

@Component({
  selector: 'app-transportview',
  templateUrl: './transportview.component.html',
  styleUrls: ['./transportview.component.scss']
})
export class TransportviewComponent implements OnInit {
  transportdetails: Array<TransportationProviderAllDetails>;
  userName: string;
  isProgressBar = true;
  constructor(
    private transportService: TransportownerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userName = sessionStorage.getItem('userName');
    this.transportService.getAllTransportDetails(this.userName).subscribe(
      data => {
        this.transportdetails = data;
        this.isProgressBar = false;
      },
      error => {
        console.log('cant get transport details' + this.userName);
        this.isProgressBar = false;
      }
    );
    //  console.log(this.userName);
  }
  ViewTransportCheckIns(transportID: number) {
    this.transportService.updateTransportProviderId(transportID);
    this.router.navigate(['transport-owner/checkin']);
  }
}
