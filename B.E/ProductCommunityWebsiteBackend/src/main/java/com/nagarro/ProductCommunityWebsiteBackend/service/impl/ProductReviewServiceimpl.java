package com.nagarro.ProductCommunityWebsiteBackend.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nagarro.ProductCommunityWebsiteBackend.model.ProductReview;
import com.nagarro.ProductCommunityWebsiteBackend.repository.*;
import com.nagarro.ProductCommunityWebsiteBackend.service.ProductReviewService;

//This class is service implementation Product Review service interface
@Service
public class ProductReviewServiceimpl implements ProductReviewService {

	public static final double ROUNDED_BY = 10.0;

	@Autowired
	private ProductReviewRepository reviewRepository;

	//this method returns list of all reviews associated with a product id
	@Override
	public List<ProductReview> getReviewsByProductId(int id) {
		return reviewRepository.findAllReviews(id);
	}

	//this method is to add review for a product.
	@Override
	public ProductReview addReview(ProductReview review) {
		return reviewRepository.save(review);
	}

	//this method is to return list of all reviews
	@Override
	public List<ProductReview> getAllReviews() {

		return reviewRepository.findAll();
	}

	//method to calculate rating
	@Override
	public float getAverageRating(int id) {

		float avgRating;
		float avgRateRoundedOff = 0;
		if (Objects.nonNull(reviewRepository.getAverageRating(id))) {
			avgRating = reviewRepository.getAverageRating(id);
		} else {
			avgRating = 0;
		}
		try {
			avgRateRoundedOff = (float) (Math.round(avgRating * ROUNDED_BY) / ROUNDED_BY);
		} catch (ArithmeticException e) {
			System.out.println("Airthmetic Exception occurred " + e);
		}
		return avgRateRoundedOff;
	}

    //method to return a review of a provided review id.
	@Override
	public Optional<ProductReview> getReviewById(int code) {
		return reviewRepository.findById(code);
	}

	//method to update review status for a product.
	@Override
	public int updateReviewStatus(int code, String reviewStatus) {

		return reviewRepository.updateReviewStatus(code, reviewStatus);
	}

}
