import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  data: any

  registerForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    // username: new FormControl('', [this.userService.validateUsernameNotTaken.bind(this.userService)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      ),
      Validators.minLength(8)])

  })

  constructor(private adminService: AdminService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  // method to add or register admin in the database if it is not present 
  // API and to validate provided data.
  onSubmit() {
    const user = {
      fullname: this.registerForm.value.fullname!,
      username: this.registerForm.value.username!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    }
    console.log(user)
    this.adminService.addAdmin(user).subscribe((response) =>
      Swal.fire({
        icon: "success",
        title: "Account Created Successfully",
        text: "You are now registered. Please login to proceed.",
        timer: 2500,
        showConfirmButton: false
      })
    )
    this.router.navigate(['adminLogin'])
  }

  // method to validate user name 
  validateUsernameNotTaken(control: AbstractControl) {

    return this.checkUsernameNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { usernameTaken: true };

      })

    );
  }

  // method to check if user name is unique or not
  checkUsernameNotTaken(username: string): Observable<boolean> {
    return this.http.get<any>("http://localhost:8089/api/admin/").pipe(
      map((usernameList: Array<any>) =>
        usernameList.filter(user => user.username === username)
      ),
      map(users => !users.length)
    );
  }

}
