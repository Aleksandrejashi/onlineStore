import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private selectedCategorySubject = new BehaviorSubject<string | null>(null);

  constructor() {}

  setCategory(category: string | null): void {
    this.selectedCategorySubject.next(category);
  }

  getCategory(): Observable<string | null> {
    return this.selectedCategorySubject.asObservable();
  }
}
