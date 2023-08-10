import { Component } from '@angular/core';
import { DTOOrder } from '../../share/dtos/DTOOrder';
import { ShopApiService } from '../../share/services/shop-api.service';
import { layoutService } from '../../share/services/layout.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../share/services/auth.service';
import { CartService } from '../../share/services/cart.service';
import { CartComponent } from '../cart/cart.component';
import { Router } from '@angular/router';
import { DTOTransaction } from '../../share/dtos/DTOTransaction';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  public form: FormGroup;
  public loading = false;
  user: any;
  localstorage: any;
  currentOrder = new DTOOrder();
  totalAmount: number = 0;
  constructor(
    private api: ShopApiService,
    private layout: layoutService,
    private auth: AuthService,
    private cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.user = this.auth.getInfoUser();
    this.form = this.formBuilder.group({
      UserName: [this.user.UserName, Validators.required],
      UserEmail: [this.user.Email, Validators.required],
      Address: [this.user.Address, Validators.required],
      UserPhone: [this.user.Phone, Validators.required],
      Message: [''], // Add other form controls if needed
    });
    // console.log(this.currentOrder)
  }

  ngOnInit(): void {
    // this.GetListOrder();
    const localStorageData = localStorage.getItem('checkout');
    if (localStorageData) {
      this.localstorage = JSON.parse(localStorageData);
      console.log(this.localstorage);
    } else {
      console.log('No checkout data in localStorage.');
    }
  }

  placeOrder() {
    // Create a new DTOTransaction with form and localstorage data
    if (this.form) {
      const transactionData = new DTOTransaction();
      transactionData.UserName = this.form.get('UserName')?.value;
      transactionData.UserEmail = this.form.get('UserEmail')?.value;
      transactionData.Address = this.form.get('Address')?.value;
      transactionData.UserPhone = this.form.get('UserPhone')?.value;
      transactionData.Message = this.form.get('Message')?.value;
      transactionData.Payment = this.localstorage.Payment;
      transactionData.Status = this.localstorage.Status;
      transactionData.Amount = this.localstorage.total;
      transactionData.Qty = this.localstorage.quantityCart;

      // Save the transactionData to your data store (e.g., API, database)

      localStorage.removeItem('checkout');
      this.cartService.clearCart();
      this.layout.showSuccess('Payment success');
      this.router.navigate(['/shop']); // Navigate to your cart management page
    } else {
      console.error('Form is not initialized.');
    }
  }
}
