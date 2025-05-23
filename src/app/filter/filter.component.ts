import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  Object = Object;

  @Output() filterChange = new EventEmitter<{ categories: string[], minPrice: number, maxPrice: number, vegeterian: boolean, nuts: boolean }>();

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

  constructor() {}

  loadProducts() {
    const activeCategories = Object.keys(this.selectedCategories).filter(cat => this.selectedCategories[cat]);

    this.filterChange.emit({
      categories: activeCategories,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      vegeterian: this.vegeterian,
      nuts: this.nuts
    });
  }
}
