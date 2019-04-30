import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

import { PackageServiceService } from 'src/app/Modules/packages/package-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: [
    trigger('categoryTrigger', [
      state('active', style({transform: 'scale(2)'})),
      transition('inactive => active', [
        // style({transform: 'translateX(0)'}),
        animate(200)
      ]),
      transition('active => inactive', [
        animate(0)
      ]),
     state('inactive', style({transform: 'scale(1)'})),
    ])
  ]
})
export class CategoriesComponent implements OnInit {

  state = 'inactive';
  categories: string[] = ['Explore', 'Pilgrimage', 'Honeymoon', 'Family', 'Wildlife'];
  images: string[] = [
    'https://www.naturalworldsafaris.com/~/media/images/destinations/india/india-richard-denyer-march-2016-8.jpg',
    'https://mfiles.alphacoders.com/599/599338.jpg',
    // tslint:disable-next-line:max-line-length
    'https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2017/04/shutterstock_57269698-kw-240417-A-couple-on-a-pathway-of-luxury-resort-in-Maldives.jpg',
    'https://www.businessinsider.in/photo/52292990.cms',
    'https://www.naturalworldsafaris.com/~/media/images/destinations/india/india-richard-denyer-march-2016-51.jpg'
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  setActive() {
    this.state = 'active';
  }

  setInactive() {
    this.state = 'inactive';
  }

  search(term: string) {
    this.router.navigate(['/', 'packages', 'search', {term: term}]);
  }

}
