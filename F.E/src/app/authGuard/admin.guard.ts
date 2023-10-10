import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router) { }

  // authentication guard for admin
  canActivate(): boolean {
    if (this.adminService.loggedInasAdmin()) {
      return true
    }
    else {
      this.router.navigate([''])
      return false
    }

  }

}
