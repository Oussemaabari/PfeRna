import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.addUserForm && this.addUserForm.valid) {
      const userData = this.addUserForm.value;
      this.authService.addUser(userData).subscribe({
        next: (response) => {
          console.log('User added successfully:', response);
          this.router.navigate(['/userslist']); // Navigate to user list page
        },
        error: (error) => {
          console.error('Error adding user:', error);
          // Handle the error and display a meaningful message to the user
        }
      });
    } else {
      console.log('Form is invalid');
      // Handle invalid form data here, display error messages, etc.
    }
  }
}
