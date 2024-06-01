import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/api/v1/orders'; // Base API URL

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    const headers = this.createHeaders();
    if (!headers) {
      return throwError(() => new Error('localStorage is not available'));
    }
    return this.http.get<Order[]>(`${this.apiUrl}/all`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching orders:', error);
        return throwError(() => error);
      })
    );
  }

  updateOrderAction(orderId: number, action: string): Observable<void> {
    const headers = this.createHeaders();
    if (!headers) {
      return throwError(() => new Error('localStorage is not available'));
    }
    return this.http.put<void>(`${this.apiUrl}/${orderId}/action`, { action }, { headers }).pipe(
      catchError(error => {
        console.error('Error updating order action:', error);
        return throwError(() => error);
      })
    );
  }

  private createHeaders(): HttpHeaders | null {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
      }
    }
    console.warn('localStorage or token is not available');
    return null;
  }
}
