import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bindCallback } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {


  productC: any
  productB: any

  codes: Set<any>
  codesArray: Array<any>
  code: any

  brands: Set<any>
  brandArray: Array<any>
  brand: any

  searchProductForm = new FormGroup({
    productBrand: new FormControl('', [Validators.required]),
    productCode: new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required])
  })

  private baseURL = "http://localhost:8089/api/product/"

  constructor(private router: Router, private http: HttpClient, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductBrandsAndCode();
  }

  // method to search product of provided brand, name, code by calling REST 
  // API to search in database
  onSubmit() {
    const product = {
      productBrand: this.searchProductForm.value.productBrand,
      productCode: this.searchProductForm.value.productCode,
      productName: this.searchProductForm.value.productName
    }
    this.http.get<any>(this.baseURL).subscribe(res => {
      const productExists = res.find((a: any) => {
        return a.productBrand === product.productBrand && a.productCode === product.productCode && a.productName === product.productName
      });
      if (productExists) {
        Swal.fire({
          icon: 'success',
          title: 'PRODUCT FOUND',
          showConfirmButton: false,
          timer: 2500,
          background: 'white'
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
        })
        this.router.navigate(['search-page'])
      }
    });
  }

  // method to get list of products brand and code from database
  getProductBrandsAndCode() {
    // get list of brand
    this.productService.getAllProducts().subscribe((responseC) => {
      this.productC = responseC
      let resultC = this.productC.map((a: { productCode: any; }) => a.productCode);
      this.codes = new Set(resultC);
      const iterateCode = this.codes.values();
      for (this.code of this.codes.values()) {
        this.codesArray = iterateCode.next().value;
      }
    })

    // get list of code
    this.productService.getAllProducts().subscribe((responseB) => {
      this.productB = responseB
      let resultB = this.productB.map((a: { productBrand: any; }) => a.productBrand);
      this.brands = new Set(resultB);
      const iterateBrand = this.brands.values();

      for (this.code of this.codes.values()) {
        this.brandArray = iterateBrand.next().value;
      }
    })

  }


}