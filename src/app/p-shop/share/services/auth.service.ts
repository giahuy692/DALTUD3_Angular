import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string;

  constructor() {}

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken() {
    return this.accessToken;
  }

  // isAuthenticated(): boolean {
  //   const token = this.accessToken;
  //   console.log(this.jwtHelper.isTokenExpired(token));
  //   return !this.jwtHelper.isTokenExpired(token);
  // }
}
