import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-userslist',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    // Implementation remains the same
  }

  deleteUser(userId: number): void {
    // Implementation remains the same
  }

  viewDetails(userId: number): void {
    this.router.navigate(['user-details', userId]); // Navigate to user-details route with user ID
  }
}
