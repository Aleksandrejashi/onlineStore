import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories = ['Salads', 'Soups', 'Chicken-Dishes'];
  selectedCategories: string[] = [];
  successMessage = '';
  errorMessage = '';

  minPrice: number = 0;
  maxPrice: number = 1000;

  vegeterian: boolean = false;
  nuts: boolean = false;

  isAddingMap: { [productId: number]: boolean } = {};

  private readonly apiUrl = 'https://restaurant.stepprojects.ge/api/Products/GetAll';
  private readonly postUrl = 'https://restaurant.stepprojects.ge/api/Baskets/AddToBasket';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  clearFilters(): void {
    this.selectedCategories = [];
    this.minPrice = 0;
    this.maxPrice = 1000;
    this.vegeterian = true;
    this.nuts = false;
    this.loadProducts();
  }

  loadProducts(): void {
    const categoriesParam = this.selectedCategories.join(',');

    let params = new HttpParams()
      .set('minPrice', this.minPrice.toString())
      .set('maxPrice', this.maxPrice.toString())
      .set('vegeterian', this.vegeterian.toString())
      .set('nuts', this.nuts.toString());

    if (categoriesParam.length > 0) {
      params = params.set('category', categoriesParam);
    }

    this.http.get<any[]>('https://restaurant.stepprojects.ge/api/Products/GetFiltered', { params })
      .subscribe({
        next: data => {
          this.products = data;
          this.filteredProducts = data;
        },
        error: error => {
          console.error('პროდუქტების ჩატვირთვის შეცდომა:', error);
        }
      });
  }

  onPriceFilterChanged(): void {
    this.filterProducts();
  }

  addToCart(product: any): void {
    console.log('CALLED: addToCart →', product);
    if (this.isAddingMap[product.id]) return;

    this.isAddingMap[product.id] = true;
    this.successMessage = '';
    this.errorMessage = '';

    const body = {
      quantity: 1,
      price: product.price,
      productId: product.id
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.postUrl, body, { headers }).subscribe({
      next: () => {
        this.successMessage = `${product.name} added to cart!`;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
        this.errorMessage = 'Failed to add product to cart. Please try again.';
      },
      complete: () => {
        this.isAddingMap[product.id] = false;
      }
    });
  }

  removeFromCart(product: any): void {
    this.errorMessage = '';

    this.http.delete(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${product.id}`).subscribe({
      next: () => {
        this.successMessage = `${product.name} removed from cart!`;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('Error removing product from cart:', error);
        this.errorMessage = 'Failed to remove product from cart.';
      }
    });
  }

  onCategoryFilterChanged(category: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;

    if (isChecked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }

    this.loadProducts();
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const priceInRange = product.price >= this.minPrice && product.price <= this.maxPrice;
      const categoryMatch = this.selectedCategories.length === 0 ||
                            this.selectedCategories.includes(product.category);

      return priceInRange && categoryMatch;
    });
  }

  trackByProductId(index: number, product: any): number {
    return product.id;
  }
}
