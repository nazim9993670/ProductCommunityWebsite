package com.nagarro.ProductCommunityWebsiteBackend.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.ProductCommunityWebsiteBackend.model.Product;
import com.nagarro.ProductCommunityWebsiteBackend.service.ProductService;

//this product controller handle all the request regarding product
//search and create

//this is for angular to call this api
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/product/")
public class ProductController {

	@Autowired
	private ProductService productService;

//this method is to add new product
	
	@PostMapping
	public ResponseEntity<Product> addProduct(@RequestBody Product product) {

		return new ResponseEntity<Product>(productService.addProduct(product), HttpStatus.CREATED);
	}

//this method is to get product by id
	
	@GetMapping("id/{id}")
	public Optional<Product> getProductById(@PathVariable("id") int id) {

		return productService.getProductById(id);

	}

//this method is to build product searched by either brand, name	
	
	@GetMapping("name/{value}")
	public List<Product> searchProducts(@PathVariable("value") String value) {

		return productService.searchedProduct(value);

	}

//this method is to return list of all products present in database
	
	@GetMapping
	public List<Product> getProducts() {

		return productService.getProducts();
	}

//this method is to build filter products by brand 
	
	@GetMapping("filter/{brand}")
	public List<Product> filterProductsByBrand(@PathVariable("brand") String brand) {

		return productService.filterProductsByBrand(brand);

	}

//this method is to get total number of products
//that is showing on home page after login	
	
	@GetMapping("/totalProducts")
	public int getTotalNumberOfAdmins() {

		int totalProductCount;
		if (productService.getProducts().isEmpty()) {
			totalProductCount = 0;
		} else {
			totalProductCount = productService.getProducts().size();
		}

		return totalProductCount;
	}
}
