import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  products: any[] = [];
  wishlist: any[] = [];
  totalAmount: number = 0;
  searchQuery: string = '';
  minPrice: number = 0;
  maxPrice: number = Infinity;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
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

  navigateToUpdateProduct(productId: number): void {
    this.router.navigate(['/updateproduct', productId]);
  }

  filterProductsByPrice(): void {
    // Implement filtering logic here
  }

  addToWishlist(product: any): void {
    const wishlistItem = {
      productId: product.id,
      quantity: 1
    };

    this.wishlistService.addToWishlist([wishlistItem]).subscribe(
      response => {
        console.log('Product added to wishlist:', response);
        this.updateWishlist(response);
      },
      error => {
        console.error('Error adding product to wishlist:', error);
      }
    );
  }

  updateWishlist(newItems: any[]): void {
    newItems.forEach(item => {
      const existingItem = this.wishlist.find(w => w.productId === item.productId);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * item.price;
      } else {
        this.wishlist.push({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.price * item.quantity
        });
      }
    });
    this.calculateTotalAmount();
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.wishlist.reduce((sum, item) => sum + item.totalPrice, 0);
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

    this.http.post(`http://localhost:8080/api/v1/orders/placeFromWishlist`, null, { headers }).subscribe(
      response => {
        console.log('Order placed successfully:', response);
        this.wishlist = [];
        this.calculateTotalAmount();
      },
      (error) => {
        console.error('Error placing order:', error);
      }
    );
  }
}
