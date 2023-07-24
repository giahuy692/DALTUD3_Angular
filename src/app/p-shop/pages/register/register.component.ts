import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOUser } from '../../share/dtos/DTOUser';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';
import { layoutService } from '../../share/services/layout.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private api: ShopApiService,
    private layout: layoutService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.email,
      ]),
      UserName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      Phone: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      Address: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      PswRepeat: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.Register(this.form.value);
    } else {
      this.form.markAllAsTouched();
      this.layout.showError('Please fill in all the fields.');
    }
  }

  Register(dto: any) {
    this.api.Register(dto).subscribe(
      (v: DTOUser) => {
        this.layout.showSuccess('Sign Up Success');
        this.router.navigate(['login']);
        this.clearForm();
      },
      (error) => {
        this.layout.showError('Registration failed!');
        console.log(error);
      }
    );
  }

  clearForm(): void {
    this.form.reset();
  }
}
