import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

import { PackageModel } from 'src/app//Models/PackageModel/package-model';
import { ItineraryModel } from 'src/app/Models/PackageModel/itinerary-model';
import { FeedbackModel } from 'src/app/Models/PackageModel/feedback-model';
import { RoomModel } from 'src/app/Models/PackageModel/room-model';
import { TransportationModel } from 'src/app/Models/PackageModel/transportation-model';
import { WishlistModel } from 'src/app/Models/PackageModel/wishlist-model';

@Injectable({
  providedIn: 'root'

})
export class PackageServiceService {
  RootUrl = environment.RootUrl;
  constructor(private http: HttpClient) { }

  getPackages(term: string): Observable<PackageModel[]> {
    return this.http.get<PackageModel[]>(this.RootUrl + 'packages/search/' + term);
  }

  getAllPackages(): Observable<PackageModel[]> {
    return this.http.get<PackageModel[]>(this.RootUrl + 'packages/getAll');
  }

  getTopPackages(): Observable<PackageModel[]> {
    return this.http.get<PackageModel[]>(this.RootUrl + 'home/getTop');
  }

  getSuggestedPackages(userName: string): Observable<PackageModel[]> {
    return this.http.get<PackageModel[]>(this.RootUrl + 'home/getSuggested/' + userName);
  }

  getItinerary(id: number): Observable<ItineraryModel[]> {
    return this.http.get<ItineraryModel[]>(this.RootUrl + 'packages/getItinerary/' + id);
  }

  getCustomItinerary(id: number): Observable<ItineraryModel[]> {
    return this.http.get<ItineraryModel[]>(this.RootUrl + 'packages/getCustomItinerary/' + id);
  }

  getFeedback(id: number): Observable<FeedbackModel[]> {
    return this.http.get<FeedbackModel[]>(this.RootUrl + 'packages/getFeedback/' + id);
  }

  getPackage(id: number): Observable<PackageModel[]> {
    return this.http.get<PackageModel[]>(this.RootUrl + 'packages/getPackage/' + id);
  }

  getRoomOptions(id: number): Observable<RoomModel[]> {
    return this.http.get<RoomModel[]>(this.RootUrl + 'packages/getRoomOptions/' + id);
  }

  getTransportOptions(id: number): Observable<TransportationModel[]> {
    return this.http.get<TransportationModel[]>(this.RootUrl + 'packages/getTransportOptions/' + id);
  }

  inWishlist(wishlist: WishlistModel): Observable<boolean> {
    return this.http.get<boolean>(this.RootUrl + 'packages/inWishlist/' + wishlist.UserName + '/' + wishlist.PackageId);
  }

  addToWishlist(wishlist: WishlistModel) {
    return this.http.post(this.RootUrl + 'packages/addToWishlist', wishlist);
  }

  removeFromWishlist(wishlist: WishlistModel) {
    return this.http.delete(this.RootUrl + 'packages/removeFromWishlist/' + wishlist.UserName + '/' + wishlist.PackageId);
  }

  getWishlist(userName: string): Observable<number[]> {
    return this.http.get<number[]>(this.RootUrl + 'packages/getWishlist?userName=' + userName);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.RootUrl + 'home/getCategories');
  }
}
