import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { PackageListComponent } from 'src/app/Components/package-list/package-list.component';
import { PackageModel } from 'src/app/Models/PackageModel/package-model';
import { PackageServiceService } from 'src/app/Modules/packages/package-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-package-search',
  templateUrl: './package-search.component.html',
  styleUrls: ['./package-search.component.scss']
})
export class PackageSearchComponent implements OnInit {

  packages: PackageModel[];
  term: string;

  filtered: PackageModel[];
  packageTypes = [
    'Adventure',
    'Explore',
    'Pilgrimage',
    'Honeymoon',
    'Wildlife',
    'Medical Tourism',
    'Eco Tourism',
    'Cultutral Tourism'
  ];
  ratings = [
    '4.5 - 5.0 Stars',
    '4.0 - 4.5 Stars',
    '3.5 - 4.0 Stars',
    '3.0 - 3.5 Stars',
    'Up to 3.0 Stars'
  ];
  sorts = [
    'Name (A-Z)',
    'Name (Z-A)',
    'Price (Ascending)',
    'Price (Descending)',
    'Number of Days (Ascending)',
    'Number of Days (Descending)',
    'Rating (Ascending)',
    'Rating (Descending)'
  ];

  packageType: string;
  numPeople: number;
  minPrice: number;
  maxPrice: number;
  minDays: number;
  maxDays: number;
  rating: string;
  sort: string;

  constructor(private packageService: PackageServiceService,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.term = params['term'];
      // If there is a search parameter search based on the search term
      if (params['term']) {
        this.getPackages(params['term']);
      } else {
        this.getAllPackages();
      }
    });
  }

  ngOnInit() {
  }

  // Get packages based on search string
  getPackages(term: string): void {
    this.packageService.getPackages(term).subscribe(packages => { this.packages = packages; this.filtered = packages; });
  }

  // Get all packages
  getAllPackages(): void {
    this.packageService.getAllPackages().subscribe(packages => { this.packages = packages; this.filtered = packages; });
  }

  // Update filtered list of packages based on changes to filters
  updateFilters(): void {
    this.filtered = this.packages;
    // Filter by package type
    if (this.packageType) {
      this.filtered = this.filtered.filter(pack => pack.PackageType === this.packageType);
    }
    // Filter by number of people
    if (this.numPeople != null) {
      this.filtered = this.filtered.filter(pack => (pack.MaxPeople >= this.numPeople) && (pack.MinPeople <= this.numPeople));
    }
    // Filter by minimum price
    if (this.minPrice != null) {
      this.filtered = this.filtered.filter(pack => pack.Price >= this.minPrice);
    }
    // Filter by maximum price
    if (this.maxPrice != null) {
      this.filtered = this.filtered.filter(pack => pack.Price <= this.maxPrice);
    }
    // Filter by minimum number of days
    if (this.minDays) {
      this.filtered = this.filtered.filter(pack => pack.Days >= this.minDays);
    }
    // Filter by maximum number of days
    if (this.maxDays) {
      this.filtered = this.filtered.filter(pack => pack.Days <= this.maxDays);
    }
    // Filter by rating
    if (this.rating) {
      switch (this.rating) {
        case '4.5 - 5.0 Stars':
          this.filtered = this.filtered.filter(pack => (pack.Rating >= 4.5) && (pack.Rating <= 5.0));
          break;

        case '4.0 - 4.5 Stars':
          this.filtered = this.filtered.filter(pack => (pack.Rating >= 4.0) && (pack.Rating <= 4.5));
          break;

        case '3.5 - 4.0 Stars':
          this.filtered = this.filtered.filter(pack => (pack.Rating >= 3.5) && (pack.Rating <= 4.0));
          break;

        case '3.0 - 3.5 Stars':
          this.filtered = this.filtered.filter(pack => (pack.Rating >= 3.0) && (pack.Rating <= 3.5));
          break;

        case 'Up to 3.0 Stars':
          this.filtered = this.filtered.filter(pack => pack.Rating <= 3.0);
          break;

        default:
          break;
      }
    }
    // Apply sorting criteria
    if (this.sort) {
      switch (this.sort) {
        case 'Name (A-Z)':
          this.filtered = this.filtered.sort((a, b) => a.PackageName.toLocaleLowerCase().localeCompare(b.PackageName.toLocaleLowerCase()));
          break;

        case 'Name (Z-A)':
          this.filtered = this.filtered.sort((a, b) => b.PackageName.toLocaleLowerCase().localeCompare(a.PackageName.toLocaleLowerCase()));
          break;

        case 'Price (Ascending)':
          this.filtered = this.filtered.sort((a, b) => a.Price - b.Price);
          break;

        case 'Price (Descending)':
          this.filtered = this.filtered.sort((a, b) => b.Price - a.Price);
          break;

        case 'Number of Days (Ascending)':
          this.filtered = this.filtered.sort((a, b) => a.Days - b.Days);
          break;

        case 'Number of Days (Descending)':
          this.filtered = this.filtered.sort((a, b) => b.Days - a.Days);
          break;

        case 'Rating (Ascending)':
          this.filtered = this.filtered.sort((a, b) => a.Rating - b.Rating);
          break;

        case 'Rating (Descending)':
          this.filtered = this.filtered.sort((a, b) => b.Rating - a.Rating);
          break;

        default:
          break;
      }
    }
  }
}
