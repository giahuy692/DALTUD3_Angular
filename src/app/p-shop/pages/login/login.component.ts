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
import { layoutService } from '../../share/services/layout.service';

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
    private layout: layoutService
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
            this.layout.showSuccess('Login suscess');
            this.goBack();
          },
          (error) => {
            console.log(error);
            this.layout.showError('Login failed!');
          }
        );
      }
    } else {
      this.form.markAllAsTouched();
      this.layout.showError('Please fill in all the fields.');
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
