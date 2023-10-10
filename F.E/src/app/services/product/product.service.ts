import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private baseURL = "http://localhost:8089/api/product/"

  // get list of all poducts from database 
  getAllProducts() {
    return this.http.get<any>(this.baseURL)
  }

  // get a particular product of provided product id 
  getProductById(id: number) {
    return this.http.get<any>(this.baseURL + 'id/' + id);
  }

  // get list of all product searched in search bar which is matched with provide 
  // search value that is either brand, name 
  getProductBySearchBar(value: string) {

    return this.http.get<any>("http://localhost:8089/api/product/name/" + value)
  }

  // filter product by brand and return list of product associated with that 
  // brand 
  productFilter(brand: string) {
    return this.http.get<any>(this.baseURL + 'filter/' + brand)
  }

  // add product into database 
  addProduct(product: Product) {
    return this.http.post(this.baseURL, product);
  }
}

