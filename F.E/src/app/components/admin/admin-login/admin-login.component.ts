import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private adminService: AdminService) { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
    Validators.minLength(8)])
  })

  ngOnInit(): void {
  }

  // method to login admin into account if its associated username and password is present 
  //in database and alse validate them.
  onSubmit() {
    const user = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    }
    this.http.get<any>("http://localhost:8089/api/admin/").subscribe(res => {
      const userExists = res.find((a: any) => {
        return a.username === user.username && a.password === user.password

      });
      if (userExists) {

        localStorage.setItem("tokenA", res.token);
        this.router.navigate(['/admin-dashboard']).then(() => {
          window.location.reload();
        })
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'User not Found',
          text: 'Username/Password is wrong',
          showConfirmButton: true
        })
      }
    });
  }

}
