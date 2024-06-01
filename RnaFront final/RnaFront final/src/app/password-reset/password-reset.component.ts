import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordResetService } from '../password-reset.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  resetForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private passwordResetService: PasswordResetService) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  requestPasswordReset() {
    const email = this.resetForm.value.email;
    this.passwordResetService.requestPasswordReset(email).subscribe(
      () => {
        console.log('Password reset email sent.');
        // Display success message to user
      },
      error => {
        console.error('Failed to send password reset email:', error);
        // Display error message to user
      }
    );
  }

  resetPassword() {
    const { email, otp, newPassword } = this.resetForm.value;
    this.passwordResetService.resetPassword(email, otp, newPassword).subscribe(
      () => {
        console.log('Password reset successful.');
        // Display success message to user
      },
      error => {
        console.error('Failed to reset password:', error);
        // Display error message to user
      }
    );
  }
}
