import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ShopApiService } from './shop-api.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: any;
  jwtHelper = new JwtHelperService();
  constructor(private router: Router) {}

  setAccessToken(token: string) {
    let a = localStorage.setItem('token', token);
    if (this.isAuthenticated(token)) {
      this.ClearToken();
      return;
    }
    this.accessToken = a;
  }

  getAccessToken() {
    return this.accessToken;
  }

  isAuthenticated(token: string): boolean {
    this.jwtHelper = new JwtHelperService();
    return !this.jwtHelper.isTokenExpired(token);
  }

  isAlloweAccess(url: string): boolean {
    const decodedToken = this.jwtHelper.decodeToken(this.accessToken);
    const routeAdmin = url.includes('/admin');
    const routeChecout = url.includes('/checkout');
    console.log(decodedToken.isAdmin);
    if (decodedToken.isAdmin && routeAdmin) {
      return true;
    } else if (!decodedToken.isAdmin && routeChecout) {
      return true;
    } else {
      return false;
    }
  }

  getInfoUser() {
    this.accessToken = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(this.accessToken);

    return decodedToken;
  }

  ClearToken() {
    localStorage.removeItem('token');
  }
}
