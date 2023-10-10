import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { UserService } from 'src/app/services/user/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean
  results: any



  constructor(private router: Router, private userService: UserService, private http: HttpClient, private adminService: AdminService) { }

  searchForm = new FormGroup({
    search: new FormControl('')
  })


  ngOnInit(): void {
    this.checkIfLoggedIn()

  }

  // check if user is logged in or not
  checkIfLoggedIn() {
    if (this.userService.loggedInAsUser() || this.adminService.loggedInasAdmin()) {
      this.loggedIn = true
    }
    else {
      this.loggedIn = false
    }
  }

  navbarOpen = false;

  // toggle a navbar
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  // method to logout a user or admin
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('tokenU')
        localStorage.removeItem('tokenA')
        this.checkIfLoggedIn()
        Swal.fire(
          'Action Completed',
          'Successfully logged out.'
        )
        this.router.navigate([''])
      }
    })
  }

  // function to search product from search bar
  onSubmit() {
    const value = {
      search: this.searchForm.value.search!
    }
    this.http.get<any>("http://localhost:8089/api/product/").subscribe(res => {
      const product = res.find((a: any) => {
      });
      this.router.navigate(['search-results/' + value.search]).then(() => {
        window.location.reload();
      })
    });
  }

  clic() {
    setTimeout(() => {
      this.router.navigate(['userLogin']);
    }, 5000);

  }

}
