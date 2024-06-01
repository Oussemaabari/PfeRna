import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private resetUrl = 'http://localhost:8080/auth/forgot-password';
  private newPasswordUrl = 'http://localhost:8080/auth/reset-password';

  constructor(private http: HttpClient) {}

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post<any>(this.resetUrl, { email }).pipe(
      catchError(error => {
        console.error('Failed to send password reset email:', error);
        return throwError('Failed to send password reset email. Please try again later.');
      })
    );
  }

  resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
    return this.http.post<any>(this.newPasswordUrl, { email, otp, newPassword }).pipe(
      catchError(error => {
        console.error('Failed to reset password:', error);
        return throwError('Failed to reset password. Please try again later.');
      })
    );
  }

  sendPasswordResetEmail(email: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });
    console.log('Sending password reset email for email:', email);
    return this.http.post('http://localhost:8080/auth/forgot', { email }, { headers }).pipe(
      catchError(error => {
        console.error('Failed to send password reset email:', error);
        return throwError('Failed to send password reset email. Please try again later.');
      })
    );
  }
}
