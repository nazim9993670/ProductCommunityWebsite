import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductsComponent implements OnInit {


  filter = new FormGroup({
    brand: new FormControl(''),
  })


  brands: Set<any>
  brandArray: Array<any>
  brand: any

  constructor(private productService: ProductService) { }

  products: any
  count: number

  a: any;
  ngOnInit(): void {
    this.getProducts()
  }

  // method to get list of all products by calling REST API
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

  // method to filter product by brand and return that filtered product list
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
