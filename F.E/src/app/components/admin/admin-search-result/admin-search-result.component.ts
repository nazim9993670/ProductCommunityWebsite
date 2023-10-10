import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-search-result',
  templateUrl: './admin-search-result.component.html',
  styleUrls: ['./admin-search-result.component.css']
})
export class AdminSearchResultComponent implements OnInit {


  productFound: boolean
  brands: Set<any>
  brandArray: Array<any>
  brand: any
  public searchForm !: FormGroup;
  constructor(private productService: ProductService, private router: ActivatedRoute, private formBuilder: FormBuilder, private navigate: Router, private http: HttpClient) { }
  products: any
  filter = new FormGroup({
    brand: new FormControl(''),
  })

  ngOnInit(): void {
    this.getProducts()
    // get all details of a product
    this.productService.getProductBySearchBar(this.router.snapshot.params['p']).subscribe((result: any) => {
      this.products = result
      console.log(Object.keys(result).length)
      if (Object.keys(result).length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Product not Found',
          text: "Looks like the product you're looking for doesn't exist.",
          showConfirmButton: false,
          timer: 3000
        })
        // this.navigate.navigate([''])
        this.productFound = false;
      }
      else {
        this.productFound = true;
      }
    });
  }

  // return all product list
  getProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response
      console.log(this.products)

      let result = this.products.map((a: { productBrand: any; }) => a.productBrand);
      this.brands = new Set(result);
      const iterateBrand = this.brands.values();

      for (this.brand of this.brands.values()) {

        this.brandArray = iterateBrand.next().value;
      }
    })

  }

  // return list of products fileted according to brand
  filterSearch() {
    const filterBy = {
      productBrand: this.filter.value.brand!,

    }
    console.log(filterBy)
    this.productService.productFilter(filterBy.productBrand).subscribe((res) => {
      this.products = res
    })
  }
}
