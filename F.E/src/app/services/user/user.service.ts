import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8089/api/user/"

  constructor(private http: HttpClient) { }

  // add user to database 
  addUser(user: User) {
    return this.http.post(this.baseURL, user)
  }

  // get list of all users
  getAllUsers() {
    return this.http.get<any>(this.baseURL)
  }

  // logging user into his account setting its token
  loggedInAsUser() {
    return localStorage.getItem('tokenU')
  }
}
