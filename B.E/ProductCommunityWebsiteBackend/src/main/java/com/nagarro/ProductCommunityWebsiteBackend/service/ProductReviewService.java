package com.nagarro.ProductCommunityWebsiteBackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nagarro.ProductCommunityWebsiteBackend.model.ProductReview;

//Service Interface for Review of a Product.
@Service
public interface ProductReviewService {

	//method is to get list of all reviews associated with provided product id.
	List<ProductReview> getReviewsByProductId(int id);

	//this method is to add a review for a product.
	public ProductReview addReview(ProductReview review);

	//this method is to get list of all reviews present in database.
	List<ProductReview> getAllReviews();

	//this method is to calculate average rating associated with a product whose
	//product id is provided.
	public float getAverageRating(int id);

	//this method is to get a review associated with provided review id.
	public Optional<ProductReview> getReviewById(int code);

	//this method is to update review status associated with a review of provided
	//review id.
	public int updateReviewStatus(int code, String reviewStatus);
}
