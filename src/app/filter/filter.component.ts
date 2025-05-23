import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  Object = Object;

  @Output() filterChange = new EventEmitter<{
    categories: string[],
    minPrice: number,
    maxPrice: number,
    vegeterian: boolean,
    nuts: boolean,
    spiciness: number
  }>();

  selectedCategories: { [key: string]: boolean } = {
    'Salads': true,
    'Soups': true,
    'Chicken-Dishes': true,
    'Fish': true,
    'Beef-Dishes': true,
  };

  minPrice: number = 0;
  maxPrice: number = 1000;

  vegeterian: boolean = false;
  nuts: boolean = false;
  spiciness: number = 0; // 0 - არა ცხარე, 5 - ძალიან ცხარე

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    const url = 'https://restaurant.stepprojects.ge/api/Products/GetFiltered';

    this.http.get<any>(url).subscribe({
      next: (data) => {
        console.log('მიღებული მონაცემები:', data);

        // თუ categories მოდის API-დან, გამოიყენე ეს ნაწილი
        if (data.categories && Array.isArray(data.categories)) {
          this.selectedCategories = {};
          data.categories.forEach((cat: string) => {
            this.selectedCategories[cat] = true;
          });

          this.loadProducts();
        }
      },
      error: (err) => {
        console.error('კატეგორიების ჩატვირთვა ვერ მოხერხდა:', err);
      }
    });
  }

  loadProducts() {
    const activeCategories = Object.keys(this.selectedCategories).filter(cat => this.selectedCategories[cat]);

    this.filterChange.emit({
      categories: activeCategories,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      vegeterian: this.vegeterian,
      nuts: this.nuts,
      spiciness: this.spiciness
    });
  }
}
