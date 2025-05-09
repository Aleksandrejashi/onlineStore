import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = [
    { name: 'Caesar Salad', price: 12, image: 'assets/images/salad.jpg', category: 'Salads' },
    { name: 'Tomato Soup', price: 10, image: 'assets/images/soup.jpg', category: 'Soups' },
    { name: 'Grilled Chicken', price: 15, image: 'assets/images/chicken.jpg', category: 'Chicken-Dishes' },
  ];

  categories = ['Salads', 'Soups', 'Chicken-Dishes'];
  selectedCategories: string[] = [];  // Empty at first
  filteredProducts: any[] = [];  // Will store filtered products

  constructor() {}

  ngOnInit(): void {
    this.filteredProducts = [...this.products];  // Show all products initially
  }

  addToCart(product: any) {
    console.log('Added to cart:', product);
  }

  onFilterChanged(event: any, category: string) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.selectedCategories.push(category);
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    this.filterProducts();
  }

  filterProducts(): void {
    if (this.selectedCategories.length > 0) {
      this.filteredProducts = this.products.filter(product =>
        this.selectedCategories.includes(product.category)
      );
    } else {
      this.filteredProducts = [...this.products];  // If no category is selected, show all
    }
  }
}