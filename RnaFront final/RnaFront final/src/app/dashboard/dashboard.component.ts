import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { WishlistService } from '../wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  wishlist: any[] = [];
  totalAmount: number = 0;
  filteredProducts: any[] = [];
  minPrice: number = 0;
  maxPrice: number = Infinity;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private wishlistService: WishlistService,
    private router: Router
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
          imageUrl: `data:image/png;base64,${product.image}`,
          price: product.price,
          availability: product.availability
        }));
        this.filteredProducts = this.products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  
  addToWishlist(product: any): void {
    const wishlistItem = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1
    };
  
    this.wishlistService.addToWishlist([wishlistItem]).subscribe(
      response => {
        console.log('Product added to wishlist:', response);
        this.updateWishlist(response, product.price); // Pass product price as an argument
      },
      error => {
        console.error('Error adding product to wishlist:', error);
      }
    );
  }
  
  updateWishlist(newItems: any[], productPrice: number): void {
    newItems.forEach(newItem => {
      const existingIndex = this.wishlist.findIndex(item => item.productId === newItem.productId);
      if (existingIndex !== -1) {
        this.wishlist[existingIndex].quantity += newItem.quantity;
      } else {
        this.wishlist.push({
          productId: newItem.productId,
          productName: newItem.productName,
          price: productPrice, // Use product price here
          quantity: newItem.quantity
        });
      }
    });
  }
  
  calculateTotalAmount(): number {
    return this.wishlist.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  

  placeOrder(): void {
    const token = this.authService.getAuthToken();
    if (!token) {
      console.error('No token found.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:8080/api/v1/orders/placeFromWishlist', null, { headers }).subscribe(
      response => {
        console.log('Order placed successfully:', response);
        this.wishlist = [];
        this.calculateTotalAmount();
        this.router.navigate(['/my-orders']);
      },
      error => {
        console.error('Error placing order:', error);
      }
    );
  }
}
