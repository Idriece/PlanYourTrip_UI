import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  //declare observable that gets returned
  public time: Observable<number>;

  constructor() {
    //observable is sent every 5 seconds
    this.time = interval(5000);
  }

  //return observable when service is subscribed to
  getTime(): Observable<number> {
    return this.time;
  }
}
