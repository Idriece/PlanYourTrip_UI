import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Feedback } from 'src/app/Modules/userprofile/feedback/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  RootUrl = environment.RootUrl;

  constructor(private http: HttpClient) { }

  addFeedback(feedback: Feedback) {
    return this.http.post<Feedback>(this.RootUrl + 'packages/AddFeedback', feedback);
  }

}
