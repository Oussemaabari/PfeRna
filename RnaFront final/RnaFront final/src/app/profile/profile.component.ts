import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userId: number | null = null;
  userData: any; // Variable to hold user profile data
  editMode = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initProfileForm();
    this.loadUserProfile();
  }

  initProfileForm(): void {
    this.profileForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', Validators.required]
    });
  }

  loadUserProfile(): void {
    this.authService.getProfile().subscribe(
      (user: any) => {
        if (user) {
          // Store the retrieved user data in userData variable
          this.userData = user;
          // Patch the form with user data
          this.profileForm.patchValue({
            nom: user.nom,
            prenom: user.prenom,
            tel: user.tel
          });
        } else {
          console.error('User profile not found.');
        }
      },
      (error: any) => {
        console.error('Failed to load user profile:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    const updatedUserData = this.profileForm.value;
    this.authService.updateUser(this.userId!, updatedUserData).subscribe(
      updatedUser => {
        console.log('User profile updated successfully:', updatedUser);
        // Reload user profile data
        this.loadUserProfile();
        // Exit edit mode
        this.editMode = false;
      },
      error => {
        console.error('Failed to update user profile:', error);
      }
    );
  }

  toggleEditMode(): void {
    this.editMode = true;
  }

  cancelEdit(): void {
    // Reload user profile data and exit edit mode
    this.loadUserProfile();
    this.editMode = false;
  }
}
