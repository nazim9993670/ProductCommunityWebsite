import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../../models/Review';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviews: any

  constructor(private http: HttpClient) { }
  private baseURL = "http://localhost:8089/api/reviews/"

  // get reviews for a particular product of provided product id
  getReview(id: number) {
    return this.http.get<any>(this.baseURL + id)
  }

  // add product to database
  addReview(rating: Review) {
    return this.http.post(this.baseURL, rating)
  }

  // get list of all reviews 
  getAllReview() {
    return this.http.get<any>(this.baseURL)
  }

  // get average rating of a product of provided product id 
  getAverageRatingOfProduct(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id)
    return this.http.get("http://localhost:8089/api/reviews/avgRating/" + id);
  }

  // update status of review of a particular review provided review 
  upadateReviewStatus(code: number, reviewStatus: string, review: any) {
    return this.http.put("http://localhost:8089/api/admin/setStatus/code/" + reviewStatus + '/' + code, review);
  }
}
