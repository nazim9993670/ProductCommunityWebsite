import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  // authentication guard for user
  canActivate(): boolean {
    if (this.userService.loggedInAsUser()) {
      return true
    }
    else {
      this.router.navigate([''])
      return false
    }

  }

}
