import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('', response);
        if (response.statusCode === 401 && response.message === 'Authentication failed. Invalid email or password.') {
          this.loading = false;
          alert('Incorrect email or password');
        } else {
          setTimeout(() => {
            this.loading = false;
            const role = response.role;
            if (role === 'admin') {
              this.router.navigate(['/userslist']);
            } else if (role === 'user') {
              this.router.navigate(['/dashboard']);
            }
            else if (role === 'resp_vente') {
              this.router.navigate(['/vente-dashboard']);

            } else if (role === 'resp_reglement') {
              this.router.navigate(['/reglement-dashboard']);
            }
            else if (role === 'resp_depot') {
              this.router.navigate(['/depot-dashboard']);
          }
          }, 500);
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Login error:', error);
        if (error.status === 401) {
          alert('Incorrect email or password');
        } else {
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    });
  }
}
