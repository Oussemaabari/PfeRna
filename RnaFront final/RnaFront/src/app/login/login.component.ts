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

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        const role = response.role;
        if (role === 'admin') {
          this.router.navigate(['/userslist']);
        } else if (role === 'user') {
          this.router.navigate(['/user-page']);
        } else if (role === undefined) {
          console.error('Role information is undefined.');
        } else {
          console.error('Invalid role:', role);
        }
      },
      error: (error) => {
        console.error('Login error:', error);
      }
    });
  }

}
