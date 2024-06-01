import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', [Validators.required, Validators.minLength(8)]],
      typeClient: ['', Validators.required] // Add the typeClient field
    });
  }
  
  onSubmit(): void {
    if (this.registerForm && this.registerForm.valid) {
      const registrationData = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        role: this.registerForm.value.role,
        nom: this.registerForm.value.nom,
        prenom: this.registerForm.value.prenom,
        tel: this.registerForm.value.tel,
        typeClient: this.registerForm.value.typeClient // Include typeClient in registration data
      };
  
      this.authService.register(registrationData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          // Redirect or perform other actions upon successful registration
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
