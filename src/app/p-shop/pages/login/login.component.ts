import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ShopApiService } from '../../share/services/shop-api.service';
import { Subscription } from 'rxjs';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form: FormGroup;
  arrUnsubscribe: Subscription[] = [];
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private shopApiService: ShopApiService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit() {
    // Get the return URL from the route parameters
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get showSuccess() {
    if (this.form.controls) {
      const formControl = this.form.controls['username'];
      return formControl.value && formControl.value.length > 3;
    }
  }

  handleLogin() {
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      if (username && password) {
        this.shopApiService.UserLogin(username, password).subscribe(
          (v: any) => {
            console.log(v);
            localStorage.setItem('token', v.token);
            this.notificationService.show({
              content: 'Login suscess',
              hideAfter: 600,
              position: { horizontal: 'left', vertical: 'bottom' },
              animation: { type: 'fade', duration: 400 },
              type: { style: 'success', icon: true },
            });
            this.loginSuccess();
          },
          (error) => {
            console.log(error);
            this.notificationService.show({
              content: error.error,
              animation: { type: 'slide', duration: 400 },
              position: { horizontal: 'center', vertical: 'bottom' },
              type: { style: 'error', icon: true },
            });
          }
        );
      }
    }
  }

  loginSuccess() {
    // Lưu thông tin trang trước đó
    const previousUrl = sessionStorage.getItem('previousUrl');

    // Nếu có thông tin trang trước đó, điều hướng đến trang đó
    if (previousUrl) {
      this.router.navigateByUrl(previousUrl);
    } else {
      // Nếu không có thông tin trang trước đó, điều hướng đến trang mặc định
      this.router.navigateByUrl('/home');
    }
  }

  goBack() {
    history.back(); // Go back to the previous page
  }

  public ngOnDestroy(): void {
    this.arrUnsubscribe.forEach((s) => {
      s?.unsubscribe();
    });
  }
}
