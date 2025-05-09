import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true, 
  imports:[CommonModule]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems);
  }
  removeItem(index: number) {
    this.cartService.deleteItemFromCart(index);
    this.cartItems = this.cartService.getCartItems(); // განახლება
  }
}
