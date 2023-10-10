import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/models/Admin';
import { Review } from 'src/app/models/Review';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseURL = "http://localhost:8089/api/admin/"

  constructor(private http: HttpClient) { }

  // add admin data in database by calling REST API
  addAdmin(admin: Admin) {
    return this.http.post(this.baseURL, admin)
  }

  // logging in as admin set its token
  loggedInasAdmin() {
    return localStorage.getItem('tokenA')
  }

  private reviewURL = "http://localhost:8089/api/admin/reviewStatus/"

  // get a particular review of provided id by calling REST API
  getReviewById(code: number) {
    return this.http.get<any>(this.reviewURL + 'code/' + code);
  }

  // get list of all admins by calling REST API
  getAllAdmins() {
    return this.http.get<any>(this.baseURL)
  }

}
