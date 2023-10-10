import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { ReviewService } from 'src/app/services/reviews/reviews.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  // variables to find stats for user, product, reviews
  users: number
  products: number
  reviews: number

  constructor(private userService: UserService, private productService: ProductService, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.countUsers()
    this.countProducts()
    this.countReviews()
  }

  // method to count number of users
  countUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = Object.keys(response).length
    })
  }

  // method to count number of products
  countProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = Object.keys(response).length
    })
  }

  // method to count number of reviews
  countReviews() {
    this.reviewService.getAllReview().subscribe((response) => {
      this.reviews = Object.keys(response).length
    })
  }

}
