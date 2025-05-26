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

  successMessage = '';
  errorMessage = '';

  minPrice: number = 0;
  maxPrice: number = 1000;
  selectedCategoryIds: (number | null)[] = [];

  isAddingMap: { [productId: number]: boolean } = {};

  private readonly apiUrl = 'https://restaurant.stepprojects.ge/api/Products/GetFiltered';
  private readonly postUrl = 'https://restaurant.stepprojects.ge/api/Baskets/AddToBasket';
  private readonly deleteUrl = 'https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProductsWithAdditionalFilters({
      categoryIds: [],
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      vegeterian: false,
      nuts: false,
      spiciness: 0
    });
  }

  onFilterChanged(event: {
    categoryIds: (number | null)[],
    minPrice: number,
    maxPrice: number,
    vegeterian: boolean,
    nuts: boolean,
    spiciness: number
  }): void {
    this.minPrice = event.minPrice;
    this.maxPrice = event.maxPrice;
    this.selectedCategoryIds = event.categoryIds;

    this.loadProductsWithAdditionalFilters(event);
  }

  loadProductsWithAdditionalFilters(filters: {
    categoryIds: (number | null)[],
    minPrice: number,
    maxPrice: number,
    vegeterian: boolean,
    nuts: boolean,
    spiciness: number
  }): void {
    let params = new HttpParams();

    if (filters.categoryIds.length > 0 && !filters.categoryIds.includes(null)) {
      filters.categoryIds.forEach(id => {
        if (id !== null) {
          params = params.append('categoryId', id.toString());
        }
      });
    }

    if (filters.vegeterian) {
      params = params.set('isVegetarian', 'true');
    }

    if (filters.nuts) {
      params = params.set('containsNuts', 'true');
    }

    if (filters.spiciness > 0) {
      params = params.set('spicyLevel', filters.spiciness.toString());
    }

    this.http.get<any[]>(this.apiUrl, { params }).subscribe({
      next: data => {
        this.products = data;

        // ფასის ფილტრი კლიენტის მხარეს
        this.filteredProducts = data.filter(product =>
          product.price >= filters.minPrice && product.price <= filters.maxPrice
        );
      },
      error: error => {
        console.error('პროდუქტების ჩატვირთვის შეცდომა:', error);
        this.errorMessage = 'პროდუქტების ჩატვირთვა ვერ მოხერხდა.';
      }
    });
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
        this.errorMessage = 'პროდუქტის დამატება ვერ მოხერხდა.';
      },
      complete: () => {
        this.isAddingMap[product.id] = false;
      }
    });
  }

  removeFromCart(product: any): void {
    this.errorMessage = '';

    this.http.delete(`${this.deleteUrl}/${product.id}`).subscribe({
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
