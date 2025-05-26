import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private selectedCategorySubject = new BehaviorSubject<string | null>(null);

  private readonly categoryUrl = "https://restaurant.stepprojects.ge/api/Categories/GetCategory";
  private readonly productsByCategoryUrl = "https://restaurant.stepprojects.ge/api/Products/GetByCategory";

  constructor(private http: HttpClient) {}

  // არჩეული კატეგორიის set / get
  setCategory(category: string | null): void {
    this.selectedCategorySubject.next(category);
  }

  getCategory(): Observable<string | null> {
    return this.selectedCategorySubject.asObservable();
  }

  // კატეგორიების სიის წამოღება API-დან
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryUrl);
  }

  // პროდუქტების წამოღება კატეგორიის მიხედვით
  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.productsByCategoryUrl}/${categoryId}`).pipe(
      catchError(() => of([])) // შეცდომის დროს აბრუნებს ცარიელ მასივს
    );
  }
}
