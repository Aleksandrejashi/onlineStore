import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private readonly categoryUrl = "https://restaurant.stepprojects.ge/api/Categories/GetCategories";
  private readonly productsByCategoryUrl = "https://restaurant.stepprojects.ge/api/Products/GetByCategory";

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryUrl).pipe(
      catchError(() => of([]))
    );
  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.productsByCategoryUrl}/${categoryId}`).pipe(
      catchError(() => of([]))
    );
  }
}
