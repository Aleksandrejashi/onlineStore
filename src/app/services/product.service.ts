import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://restaurant.stepprojects.ge/api/Products/GetAll'; // API URL


  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching products:', error);
        throw error; // ან შეგიძლიათ დააბრუნოთ fallback მნიშვნელობა
      })
    );
  }
}