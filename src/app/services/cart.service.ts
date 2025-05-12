import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>(this.cartItems);

  addToCart(item: any) {
    this.cartItems.push(item);
    this.cartSubject.next(this.cartItems); // Notify subscribers of the change
  }

  getCartItems(): Observable<any[]> {
    return this.cartSubject.asObservable(); // Return as observable
  }

  deleteItemFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.cartSubject.next(this.cartItems); // Notify subscribers of the change
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems); // Notify subscribers of the change
  }
}