import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string | undefined;
  message: string | undefined;

  constructor(private http: HttpClient) { }

  initiatePasswordReset() {
    this.http.get<any>(`http://localhost:8080/auth/reset-password/${this.email}`).subscribe(
      response => {
        // Handle successful response
        if (response && response.message === 'Password reset email sent successfully.') {
          this.message = 'New password was sent to the provided email.';
        } else {
          this.message = 'An unexpected error occurred. Please try again later.';
        }
      },
      (error: HttpErrorResponse) => {
        // Handle error response
        if (error.status === 404) {
          this.message = 'Email address not found.';
        } else {
          console.error('Unexpected error occurred:', error);
          this.message = 'email sent ';
        }
      }
    );
  }
}
