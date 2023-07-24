import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { layoutService } from './layout.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  jwtHelper = new JwtHelperService();
  private accessToken: any = localStorage.getItem('token');
  constructor(
    public auth: AuthService,
    public router: Router,
    private layout: layoutService
  ) {}
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token !== null && token !== undefined && token !== '') {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (this.jwtHelper.isTokenExpired(token)) {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      } else {
        console.log(decodedToken.isAdmin);
        if (decodedToken.isAdmin) {
          return true;
        } else {
          this.router.navigate(['/']);
          this.layout.showWarning('You are not authorized to access this site');
        }
      }
    } else {
      this.router.navigate(['login']);
    }
    return false;
  }
}
