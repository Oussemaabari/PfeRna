import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailModalComponent } from '../user-detail-modal/user-detail-modal.component';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
  users: any[] = [];
  searchQuery: string = '';

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private router: Router, 
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const token = this.authService.getAuthToken();
    if (!token) {
      console.error('No token found.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:8080/api/v1/users/list', { headers }).subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onSearch(): void {
    if (!this.searchQuery) {
      this.getUser();
      return;
    }

    const token = this.authService.getAuthToken();
    if (!token) {
      console.error('No token found.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>(`http://localhost:8080/api/v1/users/search?query=${this.searchQuery}`, { headers }).subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error searching users:', error);
      }
    );
  }

  deleteUser(userId: number): void {
    const token = this.authService.getAuthToken();
    if (!token) {
      console.error('No token found.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`http://localhost:8080/api/v1/users/delete/${userId}`, { headers }).subscribe(
      () => {
        this.getUser();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  addUser(): void {
    this.router.navigate(['/add-user']);
  }

  viewUserDetails(user: any): void {
    this.dialog.open(UserDetailModalComponent, {
      data: user
    });
  }
}
