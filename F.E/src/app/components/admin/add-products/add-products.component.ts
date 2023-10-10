import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  // attributes associated with product
  productBrand: string;
  productName: string;
  productCode: string;
  productPrice: number;
  productSeller: string;


  constructor(private productService: ProductService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  // on submit function for adding new product from html form
  onSubmit() {
    const product = {
      productBrand: this.productBrand,
      productCode: this.productCode,
      productName: this.productName,
      productPrice: this.productPrice,
      productSeller: this.productSeller,

    }
    this.productService.addProduct(product).subscribe((response) => {

      Swal.fire({
        icon: 'success',
        title: 'Product has been added!',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigateByUrl("/add-product");
    })
  }

  // clear function for clearing data from form fields
  clearFields() {

    this.productBrand = '';
    this.productName = '';
    this.productCode = '';
    this.productPrice = NaN;
    this.productSeller = '';
  }

}




