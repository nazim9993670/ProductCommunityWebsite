package com.nagarro.ProductCommunityWebsiteBackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nagarro.ProductCommunityWebsiteBackend.model.Admin;

//Service Interface for Admin
@Service
public interface AdminService {

	//this method is to get list of admins from database.
	public List<Admin> getAllAdmins();

	//this method is to add a particular admin in database.
	public Admin addAdmin(Admin admin);

	//this method is to get a particular admin
	public Admin getAdminByUserNameAndPassword(String username, String password);

}
