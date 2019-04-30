import { Component, OnInit } from '@angular/core';

import { PackageListComponent } from 'src/app/Components/package-list/package-list.component';
import { PackageModel } from 'src/app/Models/PackageModel/package-model';
import { PackageServiceService } from 'src/app/Modules/packages/package-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  packages: PackageModel[] = [];
  empty = false;
  constructor(private packageService: PackageServiceService) { }

  ngOnInit() {
    this.packageService.getWishlist(sessionStorage.getItem('userName')).subscribe(ids => {
      if (ids.length === 0) {
        this.empty = true;
      } else {
        this.getPackages(ids);
      }
    });
  }

  getPackages(packageIds: number[]) {
    packageIds.forEach(id => {
      this.packageService.getPackage(id).subscribe(pack => {
        this.packages.push(pack[0]);
      });
    });
  }
}
