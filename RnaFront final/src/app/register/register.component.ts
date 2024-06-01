import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService , private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', [Validators.required, Validators.minLength(8)]],
      typeClient: ['', Validators.required],
      role: ['user']  // Default role value
    });
  }

  onSubmit(): void {
    if (this.registerForm && this.registerForm.valid) {
      const registrationData = this.registerForm.value;
      this.authService.register(registrationData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']); // Navigate to the login page on success
        },
        error: (error) => {
          console.error('Registration error:', error);
          // Handle the error and display a meaningful message to the user
        }
      });
    } else {
      console.log('Form is invalid');
      // Handle invalid form data here, display error messages, etc.
    }
  }
}