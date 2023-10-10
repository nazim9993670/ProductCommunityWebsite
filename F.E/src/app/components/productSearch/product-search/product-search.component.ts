import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {


  productFound: boolean
  brands: Set<any>
  brandArray: Array<any>
  brand: any
  public searchForm !: FormGroup;
  constructor(private productService: ProductService, private router: ActivatedRoute, private formBuilder: FormBuilder, private navigate: Router) { }
  products: any
  filter = new FormGroup({
    brand: new FormControl(''),
  })

  ngOnInit(): void {
    this.getProductBrands()
    // get list of product searched from search bar
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
        this.productFound = false;
      }
      else {
        this.productFound = true;
      }
    });
  }

  // method to get list of all brands of products present in database
  getProductBrands() {
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

  // method to filter products by brand
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
