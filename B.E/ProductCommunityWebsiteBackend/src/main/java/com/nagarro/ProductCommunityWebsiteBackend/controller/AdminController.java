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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.ProductCommunityWebsiteBackend.model.Admin;
import com.nagarro.ProductCommunityWebsiteBackend.model.ProductReview;
import com.nagarro.ProductCommunityWebsiteBackend.service.AdminService;
import com.nagarro.ProductCommunityWebsiteBackend.service.ProductReviewService;

//This is admin controller is used to add admin pr 

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/admin/")
public class AdminController {

	@Autowired
	private AdminService adminService;

	@Autowired
	private ProductReviewService reviewService;

//	this method is to add admin or create new	
	@PostMapping
	public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin) throws Exception {

		Admin adminExist = adminService.getAdminByUserNameAndPassword(admin.getUsername(), admin.getPassword());
		if (adminExist != null) {
			throw new Exception("Admin already exists");
		} else {
			return new ResponseEntity<Admin>(adminService.addAdmin(admin), HttpStatus.CREATED);
		}
	}

//	this method is to get list of all admins	
	@GetMapping
	public List<Admin> getAllAdmins() {

		return adminService.getAllAdmins();
	}

//	this method is to build get a review by id
	
	@GetMapping("reviewStatus/code/{code}")
	public Optional<ProductReview> getReviewById(@PathVariable("code") int code) {

		return reviewService.getReviewById(code);

	}

//this method is to update a review status by provided id	
	@PutMapping("setStatus/code/{reviewStatus}/{code}")
	public int updateReviewStatus(@PathVariable("reviewStatus") String reviewStatus, @PathVariable("code") int code) {
		return reviewService.updateReviewStatus(code, reviewStatus);
	}

}
