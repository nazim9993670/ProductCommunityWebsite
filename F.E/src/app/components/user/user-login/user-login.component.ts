import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
    Validators.minLength(8)])
  })

  ngOnInit(): void {
  }
  // method to login user into an account and if it exist in database and alse validate its data
  onSubmit() {
    const user = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    }
    this.http.get<any>("http://localhost:8089/api/user/").subscribe(res => {
      const userExists = res.find((a: any) => {
        return a.username === user.username && a.password === user.password

      });
      if (userExists) {

        localStorage.setItem("tokenU", res.token);
        this.router.navigate(['']).then(() => {
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
