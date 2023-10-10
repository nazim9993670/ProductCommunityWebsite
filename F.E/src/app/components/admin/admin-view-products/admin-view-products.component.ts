import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ReviewService } from 'src/app/services/reviews/reviews.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-view-products',
  templateUrl: './admin-view-products.component.html',
  styleUrls: ['./admin-view-products.component.css']
})
export class AdminViewProductsComponent implements OnInit {
  productName: string
  productBrand: string
  productCode: string
  productPrice: number
  productSeller: string
  productId: number
  averageRating: any
  totalReviews: number
  reviews: any
  review: number
  reviewStatus: string
  isReviewPresent: boolean
  revStatus: any
  rejectBtn: boolean = false


  updateStatus = new FormGroup({
    status: new FormControl(''),
  })

  constructor(private router: ActivatedRoute, private productService: ProductService, private reviewService: ReviewService, private navigate: Router) { }

  ngOnInit(): void {
    // method to get details of particular product of provided 
    // product id by calling REST API
    this.productService.getProductById(this.router.snapshot.params['id']).subscribe((result: any) => {
      console.log(result)
      this.productBrand = result.productBrand,
        this.productCode = result.productCode,
        this.productName = result.productName,
        this.productPrice = result.productPrice,
        this.productSeller = result.productSeller,
        this.productId = result.productId
    });

    // method to get details of particular review of provided 
    // review id by calling REST API
    this.reviewService.getReview(this.router.snapshot.params['id']).subscribe((result: any) => {
      this.reviews = result
      this.totalReviews = Object.keys(result).length
      this.reviewStatus = result.status
      if (this.totalReviews === 0) {
        this.isReviewPresent = false;
      }
      else {
        this.isReviewPresent = true;
      }
    })
    this.reviewService.getAverageRatingOfProduct(this.router.snapshot.params['id']).subscribe((res) => {
      if (res === 0) {
        this.averageRating = 0
      }
      this.averageRating = res
    })

  }

  // method to approve a review by admin
  approveReview(code: number) {
    const updateReviewStatus = {
      reviewStatus: this.updateStatus.value.status!,
    }
    console.log(this.reviewStatus)
    this.reviewService.upadateReviewStatus(code, "Approved", updateReviewStatus).subscribe((res) => {
      this.revStatus = res;
    })
    Swal.fire({
      icon: 'success',
      title: 'Action Completed',
      showConfirmButton: false,
      timer: 1500
    })
    this.navigate.navigate(['admin-viewProduct/' + this.router.snapshot.params['id']]).then(() => {
      window.location.reload();
    })

  }

  // method to reject a review by admin
  rejectReview(code: number) {

    const updateReviewStatus = {
      reviewStatus: this.updateStatus.value.status!,
    }
    console.log(this.reviewStatus)
    this.reviewService.upadateReviewStatus(code, "Rejected", updateReviewStatus).subscribe((res) => {
      this.revStatus = res;
    })
    Swal.fire({
      icon: 'success',
      title: 'Action Completed',
      showConfirmButton: false,
      timer: 1500
    })
    this.rejectBtn = true
    this.navigate.navigate(['admin-viewProduct/' + this.router.snapshot.params['id']]).then(() => {
      window.location.reload();
    })


  }
}


