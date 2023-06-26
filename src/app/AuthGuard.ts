import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    if (token != null) {
      const tokenData: any = jwtDecode(token);
      const loginTime = tokenData.iat * 1000; // Thời gian đăng nhập (được chuyển đổi thành milliseconds)
      const currentTime = Date.now(); // Thời gian hiện tại
      const expirationTime = loginTime + 1 * 60 * 60 * 1000; // Thời gian hết hạn (1 giờ sau thời gian đăng nhập)

      console.log(loginTime);
      console.log(currentTime);
      console.log(expirationTime);
      if (currentTime > expirationTime) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return false;
      } else {
        const timeRemaining = expirationTime - currentTime; // Thời gian còn lại cho token (tính bằng milliseconds)
        // Thực hiện các xử lý tiếp theo nếu cần
        // this.router.navigate(['/home']);
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
