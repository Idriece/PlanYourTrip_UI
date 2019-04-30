import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { PackageServiceService } from 'src/app/Modules/packages/package-service.service';
import { PackageModel } from '../../../Models/PackageModel/package-model';

@Component({
  selector: 'app-suggested-packages',
  templateUrl: './suggested-packages.component.html',
  styleUrls: ['./suggested-packages.component.scss'],
  animations: [
    trigger('shiftLeftRight', [
      state('left', style({transform: 'translateX(-100px)'})),
      transition('right => left', [
        //style({transform: 'translateX(0)'}),
        animate(700)
      ]),
      transition('left => right', [
        animate(700)
      ]),
      state('right', style({transform: 'translateX(100px'})),
      state('none', style({transform: 'translateX(0)'})),
      transition('none => *' , [
        animate(700)
      ])
    ]),
    trigger('homeCardTrigger', [
      state('active', style({transform: 'translateX(0)'})),
      transition('inactive => active', [
        // style({transform: 'translateX(0)'}),
        animate(200)
      ]),
      transition('active => inactive', [
        animate(200)
      ]),
     state('inactive', style({transform: 'translateX(-100%)'})),
    ])
  ]
})
export class SuggestedPackagesComponent implements OnInit {

  packages: PackageModel[];
  stars: number[] = [1, 2, 3, 4, 5];
  shift: string = 'none';
  cardHover: boolean = false;
  state: string = 'inactive';

  constructor(private packageService: PackageServiceService) { }

  ngOnInit() {
    this.getTopPackages();
  }

  hoverCard() {
    this.cardHover = true;
    this.state = 'active';
  }

  unhoverCard() {
    this.cardHover = false;
    this.state = 'inactive';
  }

  shiftLeft() {
    this.shift = 'right';
  }
  shiftRight() {
    this.shift = 'left';
  }

  scroll() {
    document.getElementById("test").scrollLeft += 10;
  }

  // Get top rated packages
  getTopPackages(): void {
    if(!sessionStorage.getItem("userName")) {
      this.packageService.getTopPackages()
      .subscribe(packages => {
        packages.forEach(pack => {
          // If the average rating for the package is null, set to 0
          if(pack.Rating == null)
            {
              pack.Rating = 0;
            }
        });
        this.packages = packages;
      });
    }
    else {
      var userName = sessionStorage.getItem("userName");
      this.packageService.getSuggestedPackages(userName)
      .subscribe(packages => {
        packages.forEach(pack => {
          if(pack.Rating == null) {
            pack.Rating = 0;
          }
        });
        this.packages = packages;
      });
    }
  }
}
