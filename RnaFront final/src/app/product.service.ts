import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/v1/products';
  private wishlistUrl = 'http://localhost:8080/api/v1/wishlist';
  private orderUrl = 'http://localhost:8080/api/v1/orders';
  private stockUrl = 'http://localhost:8080/api/v1/stocks'; 

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCurrentUserId(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/v1/users/currentUserId');
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/${productId}`);
  }

  addProduct(productData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/add`, productData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  updateProduct(productId: number, updatedProduct: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/update/${productId}`, updatedProduct, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  addToWishlist(wishlistData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.wishlistUrl}/add`, wishlistData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  placeOrder(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.orderUrl}/place`, { userId }, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }


  addProductToStock(productId: number, quantity: number, movementType: string, date: Date,name:String): Observable<any> {
    const headers = this.getAuthHeaders();
    const requestBody = { productId, quantity, movementType, date ,name };
    return this.http.post<any>(`${this.stockUrl}/add`, requestBody, { headers }).pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
    );
}

updateProductQuantityInStock(productId: number, productName: string, quantity: number): Observable<any> {
  const headers = this.getAuthHeaders();
  const requestBody = { productId, quantity, productName };
  return this.http.put<any>(`${this.stockUrl}/updateQuantity`, requestBody, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
  );
}


}
