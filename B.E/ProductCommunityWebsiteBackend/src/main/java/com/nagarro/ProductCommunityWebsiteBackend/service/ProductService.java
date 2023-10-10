package com.nagarro.ProductCommunityWebsiteBackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nagarro.ProductCommunityWebsiteBackend.model.Product;

//Service Interface for Product.
@Service
public interface ProductService {

	
	public Optional<Product> getProductById(int id);

	
	public Product addProduct(Product product);

	
	public List<Product> getProducts();

	
	public List<Product> searchedProduct(String value);

	
	public List<Product> filterProductsByBrand(String brand);

}
