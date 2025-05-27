import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private allProductsUrl = 'https://restaurant.stepprojects.ge/api/Products/GetAll';
  private filteredProductsUrl = 'https://restaurant.stepprojects.ge/api/Products/GetFiltered';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.allProductsUrl).pipe(
      catchError(error => {
        console.error('Error fetching all products:', error);
        return throwError(() => error);
      })
    );
  }

  getFilteredProducts(filterData: any): Observable<any> {
    return this.http.post(this.filteredProductsUrl, filterData).pipe(
      catchError(error => {
        console.error('Error fetching filtered products:', error);
        return throwError(() => error);
      })
    );
  }
}
