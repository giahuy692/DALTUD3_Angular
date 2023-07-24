import { Component, OnInit } from '@angular/core';
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
import { layoutService } from '../../share/services/layout.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  arrUnsubscribe: Subscription[] = [];
  returnUrl: string = '';
  jwtHelper = new JwtHelperService();

  constructor(
    private formBuilder: FormBuilder,
    private shopApiService: ShopApiService,
    private layout: layoutService,
    public router: Router
  ) {
    this.form = this.formBuilder.group({
      Email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.email,
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit() {}

  get showSuccess() {
    if (this.form.controls) {
      const formControl = this.form.controls['Email'];
      return formControl.value && formControl.value.length > 3;
    }
  }

  handleLogin() {
    if (this.form.valid) {
      const email = this.form.get('Email')?.value;
      const password = this.form.get('Password')?.value;
      if (email && password) {
        this.shopApiService.UserLogin(email, password).subscribe(
          (v: any) => {
            this.navigate(v.accessToken);
            this.layout.showSuccess('Login suscess');
          },
          (error) => {
            console.log(error);
            this.layout.showError('Login failed!');
          }
        );
      }
    } else {
      this.form.markAllAsTouched();
      if (this.form.get('Email')?.errors?.['required']) {
        this.layout.showError('Please enter your email.');
      } else if (this.form.get('Password')?.errors?.['required']) {
        this.layout.showError('Please enter your password.');
      } else {
        this.layout.showError('Please fill in all the fields.');
      }
    }
  }

  goBack() {
    history.back(); // Go back to the previous page
  }

  navigate(token: any) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    if (decodedToken.isAdmin) {
      this.router.navigate(['/admin/product']);
    } else {
      this.router.navigate(['/']);
    }
  }

  public ngOnDestroy(): void {
    this.arrUnsubscribe.forEach((s) => {
      s?.unsubscribe();
    });
  }
}
