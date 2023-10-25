import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn() && this.authService.isSuperAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  } 
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  userRole: any;
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  } 
}

@Injectable({
  providedIn: 'root'
})
export class InstituteGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn() && this.authService.isInstitute()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  } 
}

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn() && this.authService.isStudent()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  } 
}

export class SecretaryGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn() && this.authService.isSecretary()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  } 
}
