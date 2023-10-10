package com.nagarro.ProductCommunityWebsiteBackend.controller;

import java.util.List;

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

import com.nagarro.ProductCommunityWebsiteBackend.model.ProductReview;
import com.nagarro.ProductCommunityWebsiteBackend.service.ProductReviewService;

//this product review controller is to review product


//this is for angular 
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/reviews/")
public class ProductReviewController {

	@Autowired
	private ProductReviewService reviewService;

//this method is add a review	
	@PostMapping
	public ResponseEntity<ProductReview> addReview(@RequestBody ProductReview review) {

		return new ResponseEntity<ProductReview>(reviewService.addReview(review), HttpStatus.CREATED);
	}

//this method is to get list of all review
	@GetMapping("{id}")
	public List<ProductReview> getReviewsByProductId(@PathVariable("id") int id) {

		return reviewService.getReviewsByProductId(id);

	}

//this method is get list of all reviews present in database
	
	@GetMapping
	public List<ProductReview> getAllReviews() {

		return reviewService.getAllReviews();

	}

	
//this method is to build get average rating of a product of provided id REST	
	@GetMapping("avgRating/{id}")
	public float getAverageRating(@PathVariable("id") int id) {
		return reviewService.getAverageRating(id);
	}


//this method is to get total number of reviews	
	@GetMapping("/totalReviews")
	public int getTotalNumberOfAdmins() {

		int totalReviewCount;
		if (reviewService.getAllReviews().isEmpty()) {
			totalReviewCount = 0;
		} else {
			totalReviewCount = reviewService.getAllReviews().size();
		}

		return totalReviewCount;
	}
}
