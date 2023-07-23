import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  jwtHelper = new JwtHelperService();
  private accessToken: any = localStorage.getItem('token');
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    const url = location.href; // Lấy URL hiện tại từ RouterStateSnapshot
    const routeAdmin = url.includes('/admin');
    const routeChecout = url.includes('/checkout');
    const token = localStorage.getItem('token');
    if (token !== null && token !== undefined && token !== '') {
      const decodedToken = this.jwtHelper.decodeToken(this.accessToken);
      if (this.jwtHelper.isTokenExpired(token)) {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      } else {
        if (decodedToken.isAdmin && routeAdmin) {
          return true;
        } else if (!decodedToken.isAdmin && routeChecout) {
          return true;
        }
      }
    } else {
      this.router.navigate(['login']);
    }
    return false;
  }
}
