import { Component, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

import { PackageModel } from '../../Models/PackageModel/package-model';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit {
  images: string[] = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/375px-Taj_Mahal_%28Edited%29.jpeg',
    'https://photo.webindia123.com/gallery/28111/11143557_10204731456838152_6221952592618183976_o_Main_800.jpg',
    'https://d1ljaggyrdca1l.cloudfront.net/wp-content/uploads/2017/04/Old-Delhi-City-Tours.jpg'
  ];

  paginator: MatPaginator;
  pageLength: number;
  pageIndex: number;

  constructor() {
    this.pageLength = 10;
    this.pageIndex = 0;
  }

  ngOnInit() {}

  // Store packages passed in from parent component
  // tslint:disable-next-line:member-ordering
  @Input()
  packages: PackageModel[];
}
