import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Adjust the path to be relative to the current directory

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:8080/api/v1/wishlist';

  constructor(private http: HttpClient, private authService: AuthService) {}

  addToWishlist(wishlistItems: any[]): Observable<any> {
    const token = this.authService.getAuthToken();
    if (!token) {
      throw new Error('No token found.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiUrl}/add`, wishlistItems, { headers });
  }

  removeFromWishlist(id: number): Observable<any> {
    const token = this.authService.getAuthToken();
    if (!token) {
      throw new Error('No token found.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/remove/${id}`, { headers });
  }
}
