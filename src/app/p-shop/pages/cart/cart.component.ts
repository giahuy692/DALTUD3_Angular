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

  getTotalPrice() {
    let totalPriceItem = 0;
    let totalPrice = 0;
    this.cartItems.forEach((v) => {
      totalPriceItem = v.Price * v.quantityCart;
      totalPrice += totalPriceItem;
    });
    return totalPrice;
  }

  updateQuantityAndSave(item: any) {
    this.cartService.updateQuantity(item); // Cập nhật số lượng trong service
    this.cartService.saveCart(); // Lưu lại giỏ hàng vào localStorage
  }

  checkOut() {
    this.saveCheckoutData();
  }

  saveCheckoutData() {
    const checkoutData = {
      cartItems: this.cartItems,
      subtotal: this.getTotalPrice(),
      shipping: 30000,
      total: this.getTotalPrice() + 30000,
      coupon: null,
    };

    localStorage.setItem('checkout', JSON.stringify(checkoutData));
  }

  public ngOnDestroy(): void {
    // this.arrUnsubscribe.forEach((s) => {
    //   s?.unsubscribe();
    // });
  }
}
