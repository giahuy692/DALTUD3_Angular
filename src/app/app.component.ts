import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'DALTUD3-Angular';

  constructor(private router: Router) {}

  // Hàm kiểm tra xem trang có phải là trang admin hay không
  isAdminPage(): boolean {
    return this.router.url.includes('/admin');
  }

  isAuth(): boolean {
    if (
      this.router.url.includes('/login') ||
      this.router.url.includes('/register')
    ) {
      return true;
    }

    return false;
  }
}
