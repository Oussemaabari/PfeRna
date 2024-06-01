import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.removeAuthToken();
    this.router.navigate(['/login']);
  }
}
