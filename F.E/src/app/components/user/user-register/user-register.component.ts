import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  data: any

  registerForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      ),
      Validators.minLength(8)])

  })

  constructor(private userService: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  // method to add or register a user in database and also validate its field
  onSubmit() {
    const user = {
      fullname: this.registerForm.value.fullname!,
      username: this.registerForm.value.username!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    }
    console.log(user)
    this.userService.addUser(user).subscribe((response) =>
      Swal.fire({
        icon: "success",
        title: "Account Created Successfully",
        text: "You are now registered. Please login to proceed.",
        timer: 2500,
        showConfirmButton: false
      })
    )
    this.router.navigate(['userLogin'])
  }

  // validate user name
  validateUsernameNotTaken(control: AbstractControl) {
    return this.checkUsernameNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { usernameTaken: true };
      })
    );

  }

  // check if user name is taken or not
  checkUsernameNotTaken(username: string): Observable<boolean> {
    return this.http.get<any>("http://localhost:8089/api/user/").pipe(
      map((usernameList: Array<any>) =>
        usernameList.filter(user => user.username === username)
      ),
      map(users => !users.length)
    );
  }

}
