package com.nagarro.ProductCommunityWebsiteBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nagarro.ProductCommunityWebsiteBackend.model.*;

//query to update status of review whose id is provided
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	//query to fetch an user associated with provided username and password
	@Query("from User where username = ?1 AND password = ?2")
	User findByUsernameByPassword(String username, String password);

}
