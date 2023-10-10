import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

  filter = new FormGroup({
    brand: new FormControl(''),
  })


  brands: Set<any>
  brandArray: Array<any>
  brand: any

  searchForm = new FormGroup({
    search: new FormControl('')
  })

  constructor(private productService: ProductService, private http: HttpClient, private router: Router) { }

  products: any
  count: number

  a: any;
  ngOnInit(): void {
    this.getProducts()
  }

  // method to get all products through REST API
  getProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response
      this.count = Object.keys(response).length;
      console.log(this.products)

      let result = this.products.map((a: { productBrand: any; }) => a.productBrand);
      this.brands = new Set(result);
      const iterateBrand = this.brands.values();

      for (this.brand of this.brands.values()) {

        this.brandArray = iterateBrand.next().value;
      }
    })

  }

  // method to filter products according to given brand calling REST API
  filterSearch() {
    const filterBy = {
      productBrand: this.filter.value.brand!,

    }
    console.log(filterBy)
    this.productService.productFilter(filterBy.productBrand).subscribe((res) => {
      this.products = res
    })
  }

  // method to search products
  onSubmit() {
    const value = {
      search: this.searchForm.value.search!
    }
    this.http.get<any>("http://localhost:8089/api/product/").subscribe(res => {
      const product = res.find((a: any) => {
      });
      this.router.navigate(['admin-searchResult/' + value.search]).then(() => {
        window.location.reload();
      })
    });
  }

}
