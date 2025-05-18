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

  categories: string[] = ['Salads', 'Soups', 'Chicken-Dishes'];

  selectedCategories: { [key: string]: boolean } = {
    'Salads': true,
    'Soups': true,
    'Chicken-Dishes': true,
  };

  minPrice: number = 0;
  maxPrice: number = 1000;

  vegeterian: boolean = false;
  nuts: boolean = false;

  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private http: HttpClient) {}

  loadProducts() {
    const activeCategories = Object.keys(this.selectedCategories).filter(cat => this.selectedCategories[cat]);
    const categoriesParam = activeCategories.join(',');

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
          this.onFilter.emit(this.filteredProducts);
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
