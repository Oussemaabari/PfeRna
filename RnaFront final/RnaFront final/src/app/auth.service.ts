import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private AuthApiUrl = 'http://localhost:8080/auth';
  private userApiUrl = 'http://localhost:8080/api/v1/users';
  private authTokenKey = 'authToken';
  private roleKey = 'userRole';
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(email: string, password: string ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signin`, { email, password  }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('userId',response.userId);
          this.setAuthToken(response.token);
          this.setUserRole(response.role);
        }
      }),
      catchError(this.handleError)
    );
  }

  register(registrationData: { email: string, password: string, role: string ,typeClient:String}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, registrationData).pipe(
      catchError(this.handleError)
    );
  }

  forgotPassword(email: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/auth/forgot-password`, { email }, { headers }).pipe(
      catchError(error => {
        return throwError('Failed to send forgot password request. Please try again later.');
      })
    );
  }

  updateUserInfo(userId: number, userData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/api/v1/users/${userId}`, userData, { headers }).pipe(
      catchError(error => {
        return throwError('Failed to update user info. Please try again later.');
      })
    );
  }

  addUser(userData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/api/v1/users/add`, userData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  setUserRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }

  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }

  isAdmin(): boolean {
    const userRole = this.getUserRole();
    return userRole === 'admin';
  }

  isUser(): boolean {
    const userRole = this.getUserRole();
    return userRole === 'user';
  }

  isRespVente(): boolean {
    const userRole = this.getUserRole();
    return userRole === 'resp vente';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getUsers(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/api/v1/users/list`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/api/v1/users/delete/${userId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentUserId(): Observable<number> {
    const headers = this.getAuthHeaders();
    return this.http.get<number>(`${this.userApiUrl}/currentUserId`, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  getUserById(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/api/v1/users/${userId}`, { headers }).pipe(
      catchError(error => {
        return throwError('Failed to get user profile. Please try again later.');
      })
    );
  }

  getProfile(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/api/v1/users/getprofile`, { headers }).pipe(
      catchError(error => {
        return throwError('Failed to get user profile. Please try again later.');
      })
    );
  }

  updateUser(userId: number, userData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/api/v1/users/profile`, userData, { headers }).pipe(
      catchError(error => {
        return throwError('Failed to update user profile. Please try again later.');
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
