import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { ReviewService } from 'src/app/services/reviews/reviews.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  // method to count number of Products
  countProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = Object.keys(response).length
    })
  }

  // method to count number of Reviews
  countReviews() {
    this.reviewService.getAllReview().subscribe((response) => {
      this.reviews = Object.keys(response).length
    })
  }
}
