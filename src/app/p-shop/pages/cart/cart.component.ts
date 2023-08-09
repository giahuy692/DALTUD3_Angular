import { Component } from '@angular/core';
import { DTOOrder } from '../../share/dtos/DTOOrder';
import { ShopApiService } from '../../share/services/shop-api.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../share/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems: any[];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getCartItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  public ngOnDestroy(): void {
    // this.arrUnsubscribe.forEach((s) => {
    //   s?.unsubscribe();
    // });
  }
}
