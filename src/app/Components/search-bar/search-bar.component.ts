import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  term: string;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['term']) {
        this.term = params['term'];
      } else {
        this.term = '';
      }
    });
  }

  // Navigate to packages page after entering search
  onSearch(term: string) {
    if (term !== '') {
      this.router.navigate(['/', 'packages', 'search', {term: term}]);
    } else {
      this.router.navigate(['/', 'packages', 'search']);
    }
  }
}
