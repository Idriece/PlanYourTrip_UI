import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Star } from 'src/app/Models/star';
import { Feedback } from 'src/app/Modules/userprofile/feedback/feedback';
import { FeedbackService } from 'src/app/Modules/userprofile/Services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent implements OnInit {

  stars: Star[] = [
    {
      id: 0,
      class: 'inactive'
    },
    {
      id: 1,
      class: 'inactive'
    },
    {
      id: 2,
      class: 'inactive'
    },
    {
      id: 3,
      class: 'inactive'
    },
    {
      id: 4,
      class: 'inactive'
    }
  ];

  rating: number = null;
  review: string = null;
  isRated: boolean = false;
  feedback: Feedback;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private feedbackService: FeedbackService) { }

  changeClass(i: number) {
    this.setInactive();
    this.stars.forEach(star => {
      if(star.id <= i) {
        star.class = 'active';
      }
    });
    // this.stars[i].class = this.stars[i].class === 'active' ? 'inactive' : 'active';
  }

  setRating(i: number) {
    this.setInactive();
    this.stars.forEach(star => {
      if (star.id <= i) {
        star.class = 'active';
      } else {
        star.class = 'inactive';
      }
    });
    this.rating = i + 1;
    this.isRated = true;
  }

  setInactive() {
      this.stars.forEach(star => {
        if (star.id > this.rating - 1) {
          star.class = 'inactive';
        }
      });
  }

  submit() {
    console.log(this.review + ' ' + this.rating);
    this.feedback = {
      FeedBackID: null,
      Id: sessionStorage.getItem('userName'),
      PackageID: this.data.packageID,
      Rating: this.rating,
      Review: this.review
    };
    this.feedbackService.addFeedback(this.feedback).subscribe();
  }

  ngOnInit() {
    console.log(this.data.packageID);
  }

}
