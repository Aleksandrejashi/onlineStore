import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() onFilter = new EventEmitter<string>();
  categories = ['All', 'Salads', 'Soups', 'Chicken-Dishes'];
  selectedCategory = 'All';

  filterChanged() {
    this.onFilter.emit(this.selectedCategory);
  }
}