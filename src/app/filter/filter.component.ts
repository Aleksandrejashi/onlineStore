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
  // გამოსწორებისთვის საჭიროა Object ამ კლასში ცვლადად გამოცხადება
  Object = Object;

  @Output() filterChange = new EventEmitter<{ categories: string[], minPrice: number, maxPrice: number }>();

  readonly apiUrl = 'https://restaurant.stepprojects.ge/api/Products/GetFiltered';

  selectedCategories: { [key: string]: boolean } = {
    'Salads': true,
    'Soups': true,
    'Chicken-Dishes': true,
    'Fish': true,
    'Beef-Dishes': true,
  };

  minPrice: number = 0;
  maxPrice: number = 1000;

  vegeterian: boolean = true;
  nuts: boolean = false;

  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private http: HttpClient) {}

  loadProducts() {
    const activeCategories = Object.keys(this.selectedCategories).filter(cat => this.selectedCategories[cat]);

    let params = new HttpParams()
      .set('minPrice', this.minPrice.toString())
      .set('maxPrice', this.maxPrice.toString())
      .set('vegeterian', this.vegeterian.toString())
      .set('nuts', this.nuts.toString());

    activeCategories.forEach(category => {
      params = params.append('category', category);
    });

    this.http.get<any[]>(this.apiUrl, { params })
      .subscribe({
        next: data => {
          this.products = data;
          this.filteredProducts = data;
          this.filterChange.emit({
            categories: activeCategories,
            minPrice: this.minPrice,
            maxPrice: this.maxPrice
          });
        },
        error: error => {
          console.error('პროდუქტების ჩატვირთვის შეცდომა:', error);
        }
      });
  }

  trackByProductId(index: number, product: any): any {
    return product.id || index;
  }
}
