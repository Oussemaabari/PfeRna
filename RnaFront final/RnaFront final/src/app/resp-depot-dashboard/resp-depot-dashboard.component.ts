import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-resp-depot-dashboard',
  templateUrl: './resp-depot-dashboard.component.html',
  styleUrls: ['./resp-depot-dashboard.component.css']
})
export class RespDepotDashboardComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  minPrice: number = 0;
  maxPrice: number = Infinity;
  wishlist: any[] = [];
  totalAmount: number = 0;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private productService: ProductService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    const token = this.authService.getAuthToken();
    if (!token) {
      console.error('No token found.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:8080/api/v1/products/list', { headers }).subscribe(
      (response) => {
        this.products = response.map(product => ({
          ...product,
          imageUrl: `data:image/png;base64,${product.image}`
        }));
        this.filteredProducts = this.products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
  }

  openEditProductModal(product: any): void {
    const dialogRef = this.dialog.open(ProductDetailModalComponent, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProducts();
      }
    });
  }

  deleteProduct(productId: number): void {
    const token = this.authService.getAuthToken();
    if (!token) {
      console.error('No token found.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`http://localhost:8080/api/v1/products/delete/${productId}`, { headers }).subscribe(
      () => {
        this.getProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  logout(): void {
    this.authService.removeAuthToken();
    this.router.navigate(['/login']);
  }
}
