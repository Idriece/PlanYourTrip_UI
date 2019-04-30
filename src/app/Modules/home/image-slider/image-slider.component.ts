import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import 'rxjs';
import { interval, Subscription } from 'rxjs';

import { TimerService } from './timer.service';

@Component({
  animations: [
    trigger('switchImage', [
      transition('active => inactive', [
        style({opacity: 0}),
        animate(500)
      ]),
      transition('inactive => active', [
        style({opacity: 0}),
        animate(500)
      ]),
      transition('active => inactive', [
        style({opacity: 0}),
        animate(500)
      ])
    ])
  ],
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

  state = 'inactive';

  // list of images for image slider
  images: string[] = [
    'https://i.gocollette.com/img/cont/as/in/tajmahalpalace_42942571_fotoliarf_3201_960x380.jpg',
    // "https://photo.webindia123.com/gallery/28111/11143557_10204731456838152_6221952592618183976_o_Main_800.jpg",
    'http://odishatime.com/odiya/wp-content/uploads/2018/01/1.jpg',
    'https://d1ljaggyrdca1l.cloudfront.net/wp-content/uploads/2017/04/Old-Delhi-City-Tours.jpg'
  ];

  subscription: Subscription;
  // set current image to first image in list
  currentImage: string = this.images[0];

  // using TimerService to switch images every interval
  constructor(private timerService: TimerService) {
  }

  // subscribe to service on init
  ngOnInit() {
    this.subscribe();
  }

  // function to subscribe to service
  subscribe() {
    this.subscription = this.timerService.getTime().subscribe(() => {
        this.shiftLeft();
      }
    );
  }

  // function to shift image in slider to left implementing queue
  shiftLeft() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    // push first image to end of list
    this.images.push(this.images[0]);
    // remove first image from list
    this.images.shift();
    // set current image
    this.currentImage = this.images[0];
    // unsubscribe and resubscribe on button click to reset time interval
    this.subscription.unsubscribe();
    this.subscribe();
  }

  // function to shift image in slider to right implementing queue
  shiftRight() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    // move last image to first index
    this.images.unshift(this.images[this.images.length - 1]);
    // pop last image
    this.images.pop();
    // set current image
    this.currentImage = this.images[0];
    // unsubscribe and resubscribe on button click to reset time interval
    this.subscription.unsubscribe();
    this.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
