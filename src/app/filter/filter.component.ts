import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() onFilter = new EventEmitter<any>();

  categories: string[] = ['Salads', 'Soups', 'Chicken-Dishes', 'Beef-Dishes'];
  selectedCategories: { [key: string]: boolean } = {
    'Salads': false,
    'Soups': false,
    'Chicken-Dishes': false,
    'Beef-Dishes': false
  };
  minPrice: number = 0;
  maxPrice: number = 1000;

  products: any[] = []; // მიიღებს სრულ პროდუქტების სიას მშობლისგან ან API-დან
  filteredProducts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts(); // Load products from API
  }

  loadProducts() {
    const activeCategories = Object.keys(this.selectedCategories).filter(cat => this.selectedCategories[cat]);
    console.log('აქტიური კატეგორიები:', activeCategories); // Debug log

    let params = new HttpParams()
      .set('minPrice', this.minPrice.toString())
      .set('maxPrice', this.maxPrice.toString());

    activeCategories.forEach(category => {
      params = params.append('category', category);
    });

    this.http.get<any[]>('https://restaurant.stepprojects.ge/api/Products/GetFiltered', { params })
      .subscribe(
        (data: any[]) => {
          console.log('მიღებული პროდუქტები:', data);
          this.products = data;
          this.filteredProducts = data;
        },
        (error) => {
          console.error('პროდუქტების ჩატვირთვის შეცდომა:', error);
        }
      );
  }

  onFilterChanged() {
    // Trigger loadProducts with latest category and price filters
    this.loadProducts();
  }

  onPriceFilterChanged() {
    // Trigger loadProducts with latest price and category filters
    this.loadProducts();
  }

  trackByProductId(index: number, item: any): any {
    return item.id;
  }

  addToCart(product: any) {
    // კალათაში დამატების ლოგიკა (გააკეთე API call ან გადაცემის ფუნქცია)
    console.log('დაემატა კალათაში:', product);
  }
}