import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';
import { ProductService } from '../product.service';
//import { AddToStockModalComponent } from '../add-to-stock-modal/add-to-stock-modal.component';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  minPrice: number = 0;
  maxPrice: number = Infinity;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private productService: ProductService
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

  addProduct(): void {
    this.router.navigate(['/add-product']);
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product-details', productId]);
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

  navigateToUpdateProduct(productId: number): void {
    this.router.navigate(['/updateproduct', productId]);
  }

  filterProductsByPrice(): void {
    this.filteredProducts = this.products.filter(product => 
      product.price >= this.minPrice && product.price <= this.maxPrice
    );
  }

  onSearch(): void {
    if (!this.searchQuery) {
      this.filteredProducts = this.products;
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

    this.http.get<any[]>(`http://localhost:8080/api/v1/products/search?query=${this.searchQuery}`, { headers }).subscribe(
      (response) => {
        this.filteredProducts = response;
      },
      (error) => {
        console.error('Error searching products:', error);
      }
    );
  }

  /*openAddToStockModal(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    
    const dialogRef = this.dialog.open(AddToStockModalComponent, {
      width: '400px',
      data: { productId, quantity: product.quantity } // Pass the current product quantity
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProducts(); // Refresh the product list after adding to stock
      }
    });
  }
  */
  
}
