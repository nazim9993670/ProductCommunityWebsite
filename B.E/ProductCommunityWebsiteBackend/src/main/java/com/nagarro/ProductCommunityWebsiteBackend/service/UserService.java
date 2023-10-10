package com.nagarro.ProductCommunityWebsiteBackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nagarro.ProductCommunityWebsiteBackend.model.User;

//Service Interface for Product
@Service
public interface UserService {

	//this method is to get list of all users present in database.
	public List<User> getAllUsers();

	//this method is to add a particular user in database.
	public User addUser(User user);

	//this method is to get a particular user associated with provided username and pass
	public User getUserByUserNameAndPassword(String username, String password);

}
