import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.css']
})
export class UserDetailModalComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nom: [this.data.nom, Validators.required],
      prenom: [this.data.prenom, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      tel: [this.data.tel, Validators.required],
      role: [this.data.role, Validators.required], // Add role field
      password: [this.data.password, Validators.required] // Add password field
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  updateUserInfo(): void {
    if (this.userForm.invalid) {
      return;
    }

    const updatedUserData = this.userForm.value;

    this.authService.updateUser(this.data.id, updatedUserData).subscribe(
      response => {
        console.log('User updated successfully:', response);
        this.dialogRef.close(updatedUserData); // Optionally close the modal and pass the updated data
      },
      error => {
        console.error('Failed to update user:', error);
      }
    );
  }
}
