import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { ReviewService } from 'src/app/services/reviews/reviews.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

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
  isReviewNotPresent: boolean

  constructor(private router: ActivatedRoute, private productService: ProductService, private reviewService: ReviewService) { }



  ngOnInit(): void {
    // get product details from provided product id
    this.productService.getProductById(this.router.snapshot.params['id']).subscribe((result: any) => {
      console.log(result)
      this.productBrand = result.productBrand,
        this.productCode = result.productCode,
        this.productName = result.productName,
        this.productPrice = result.productPrice,
        this.productSeller = result.productSeller,
        this.productId = result.productId
    });

    // get review details by review id
    this.reviewService.getReview(this.router.snapshot.params['id']).subscribe((result: any) => {
      this.reviews = result
      this.totalReviews = Object.keys(result).length
      if (this.totalReviews === 0) {
        this.isReviewNotPresent = true;
      }
      else {
        this.isReviewNotPresent = false;
      }
    })

    // get average rating of product
    this.reviewService.getAverageRatingOfProduct(this.router.snapshot.params['id']).subscribe((res) => {
      if (res === 0) {
        this.averageRating = 0
      }
      this.averageRating = res
    })


  }
}