import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  addToCart(item: any) {
    this.cartItems.push(item);
  }

  getCartItems() {
    return this.cartItems;
  }

  deleteItemFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  clearCart() {
    this.cartItems = [];
  }
}