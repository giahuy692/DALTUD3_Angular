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
      Email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
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
            this.notificationService.show({
              content: 'Login suscess',
              hideAfter: 600,
              position: { horizontal: 'left', vertical: 'bottom' },
              animation: { type: 'fade', duration: 400 },
              type: { style: 'success', icon: true },
            });
            this.goBack();
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

  goBack() {
    history.back(); // Go back to the previous page
  }

  public ngOnDestroy(): void {
    this.arrUnsubscribe.forEach((s) => {
      s?.unsubscribe();
    });
  }
}
