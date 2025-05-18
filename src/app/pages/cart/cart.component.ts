import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true, 
  imports: [CommonModule]
})


export class CartComponent implements OnInit {
  cartItems: any[] = [];
  successMessage: string = '';
  
  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.http.get<any[]>('https://restaurant.stepprojects.ge/api/Baskets/GetAll').subscribe(
      (data) => {
        this.cartItems = data.map(item => ({
          ...item,
          image: item.image 
        }));
        console.log('Loaded cart items from API:', this.cartItems);
      },
      (error) => {
        console.error('Error loading cart from API:', error);
        this.cartItems = [];
      }
    );
  }

  addToCart(product: any) {
    const item = {
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    };

    this.cartItems.push(item); // Local addition without API call
    this.successMessage = `${item.name} added to cart!`;

    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);  
    this.successMessage = 'Item removed from cart!';

    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}