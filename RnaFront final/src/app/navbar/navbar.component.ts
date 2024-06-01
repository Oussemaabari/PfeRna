import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  isUser: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isUser = this.authService.isUser();
    
    this.authService.getProfile().subscribe(
      (profile) => {
        this.userName = `${profile.nom} ${profile.prenom}`;
      },
      (error) => {
        console.error('Failed to fetch user profile:', error);
      }
    );
  }

  logout() {
    this.authService.removeAuthToken();
    this.router.navigate(['/login']);
  }
}
