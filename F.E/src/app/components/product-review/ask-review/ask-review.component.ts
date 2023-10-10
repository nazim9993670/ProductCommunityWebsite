import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ask-review',
  templateUrl: './ask-review.component.html',
  styleUrls: ['./ask-review.component.css']
})
export class AskReviewComponent implements OnInit {


  productC: any
  productB: any

  codes: Set<any>
  codesArray: Array<any>
  code: any

  brands: Set<any>
  brandArray: Array<any>
  brand: any

  askReviewForm = new FormGroup({
    productBrand: new FormControl('', [Validators.required]),
    productCode: new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required])
  })

  private baseURL = "http://localhost:8089/api/product/"

  constructor(private router: Router, private http: HttpClient, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductsBrandAndCode();
  }

  // method to ask review for a particlar product from user whose 
  // brand, name and code is provided by user.
  onSubmit() {
    const product = {
      productBrand: this.askReviewForm.value.productBrand,
      productCode: this.askReviewForm.value.productCode,
      productName: this.askReviewForm.value.productName
    }
    this.http.get<any>(this.baseURL).subscribe(res => {
      const productExists = res.find((a: any) => {
        return a.productBrand === product.productBrand && a.productCode === product.productCode && a.productName === product.productName
      });
      Swal.fire({
        iconHtml: '<img src="https://i.stack.imgur.com/hzk6C.gif">',
        title: 'Redirecting......',
        text: "Hang tight we're redirecting you to product review.",
        showConfirmButton: false,
        timer: 30000,
        background: 'black'
      })
      setTimeout(() => {
        if (productExists) {
          Swal.fire({
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            background: 'black'
          })
          this.router.navigate(['view-product/' + productExists.productId])
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Product not Found',
            text: "Looks like the product you're looking for doesn't exist.",
            showConfirmButton: false,
            timer: 3000,
            backdrop: 'black'
          })
          this.router.navigate(['ask-reviews'])
        }
      }, 30000);
    });
  }


  getProductsBrandAndCode() {
    // return list of all brands of products present in Database
    this.productService.getAllProducts().subscribe((responseC) => {
      this.productC = responseC

      console.log(this.productC)

      let resultC = this.productC.map((a: { productCode: any; }) => a.productCode);
      this.codes = new Set(resultC);
      const iterateCode = this.codes.values();

      for (this.code of this.codes.values()) {

        this.codesArray = iterateCode.next().value;
      }
      console.log(this.codesArray)

    })

    // return list of all code of products present in Database
    this.productService.getAllProducts().subscribe((responseB) => {
      this.productB = responseB

      console.log(this.productB)

      let resultB = this.productB.map((a: { productBrand: any; }) => a.productBrand);
      this.brands = new Set(resultB);
      const iterateBrand = this.brands.values();

      for (this.code of this.codes.values()) {
        this.brandArray = iterateBrand.next().value;
      }
      console.log(this.brandArray)

    })

  }

}