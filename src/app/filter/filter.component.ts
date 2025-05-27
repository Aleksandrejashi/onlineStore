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

  @Output() filterChange = new EventEmitter<{
    categoryIds: (number | null)[],
    minPrice: number,
    maxPrice: number,
    vegeterian: boolean,
    nuts: boolean,
    spiciness: number
  }>();

  categories = [
    { name: "All", id: null },
    { name: "Salads", id: 1 },
    { name: "Soups", id: 2 },
    { name: "Chicken-Dishes", id: 3 },
    { name: "Beef-Dishes", id: 4 },
    { name: "Seafood-Dishes", id: 5 },
    { name: "Vegetable-Dishes", id: 6 },
    { name: "Bits&Bites", id: 7 },
    { name: "On-The-Side", id: 8 }
  ];

  selectedCategoryIds: Set<number | null> = new Set(this.categories.map(cat => cat.id));

  minPrice: number = 0;
  maxPrice: number = 1000;
  vegeterian: boolean = false;
  nuts: boolean = false;
  spiciness: number = 0;

  toggleCategory(id: number | null) {
    if (this.selectedCategoryIds.has(id)) {
      this.selectedCategoryIds.delete(id);
    } else {
      this.selectedCategoryIds.add(id);
    }

    if (id === null) {
      this.selectedCategoryIds = new Set(this.categories.map(cat => cat.id));
    } else {
      this.selectedCategoryIds.delete(null);
    }

    this.loadProducts();
  }

  isSelected(id: number | null): boolean {
    return this.selectedCategoryIds.has(id);
  }

  loadProducts() {
    this.filterChange.emit({
      categoryIds: Array.from(this.selectedCategoryIds),
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      vegeterian: this.vegeterian,
      nuts: this.nuts,
      spiciness: this.spiciness
    });
  }

  
  onFilterChanged(): void {
    this.loadProducts();
  }
}
