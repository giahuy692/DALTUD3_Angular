import { Injectable } from '@angular/core';
import { DTOProduct } from '../dtos/DTOProduct';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItem) {
      existingItem.quantityCart += 1;
    } else {
      item.quantityCart = 1;
      this.cartItems.push(item);
    }

    this.saveCart();
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  updateQuantity(item: any) {
    const cartItem = this.cartItems.find(
      (cartItem) => cartItem._id === item._id
    );

    if (cartItem) {
      cartItem.quantityCart = item.quantityCart;
      this.saveCart();
    }
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
