import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from '../../filter/filter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterComponent],
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
    this.loadProducts();
  }

  loadProducts(): void {
    // აქ უნდა ფიქსირდებოდეს მრავალჯერადი category პარამეტრის გადაცემა
    // API-ს მიხედვით თუ multiple categories მიიღება, მაშინ საჭიროა append-ით გადასვლა

    let params = new HttpParams()
      .set('minPrice', this.minPrice.toString())
      .set('maxPrice', this.maxPrice.toString());

    if (this.selectedCategories.length > 0) {
      this.selectedCategories.forEach(category => {
        params = params.append('category', category);
      });
    }

    this.http.get<any[]>('https://restaurant.stepprojects.ge/api/Products/GetFiltered', { params })
      .subscribe({
        next: data => {
          this.products = data;
          this.filteredProducts = data;
        },
        error: error => {
          console.error('პროდუქტების ჩატვირთვის შეცდომა:', error);
          this.errorMessage = 'პროდუქტების ჩატვირთვა ვერ მოხერხდა.';
        }
      });
  }

  onFilterChanged(event: { categories: string[], minPrice: number, maxPrice: number }): void {
    this.selectedCategories = event.categories;
    this.minPrice = event.minPrice;
    this.maxPrice = event.maxPrice;
    this.loadProducts();
  }

  addToCart(product: any): void {
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
        this.successMessage = `${product.name} კალათაში დაემატა!`;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('პროდუქტის დამატების შეცდომა:', error);
        this.errorMessage = 'პროდუქტის დამატება ვერ მოხერხდა. სცადეთ თავიდან.';
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
        this.successMessage = `${product.name} კალათიდან ამოიღეს!`;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('პროდუქტის წაშლის შეცდომა:', error);
        this.errorMessage = 'პროდუქტის წაშლა ვერ მოხერხდა.';
      }
    });
  }

  trackByProductId(index: number, product: any): number {
    return product.id;
  }
}
