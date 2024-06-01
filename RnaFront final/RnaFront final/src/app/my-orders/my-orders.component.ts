import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order';
import { AuthService } from '../auth.service'; // Import AuthService to retrieve current user ID

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  errorMessage: string = '';
  currentUserID: number | null = null;

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCurrentUserID(); // Load the current user's ID
  }

  loadCurrentUserID(): void {
    this.authService.getCurrentUserId().subscribe(
      (userID) => {
        this.currentUserID = userID;
        if (this.currentUserID !== null) {
          this.loadOrders(); // Fetch orders once current user's ID is available
        }
      },
      (error) => {
        console.error('Failed to get current user ID:', error);
      }
    );
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data: Order[]) => {
        // Filter orders based on currentUserID
        this.orders = this.currentUserID ? data.filter(order => order.userId === this.currentUserID) : [];
      },
      (error) => {
        this.errorMessage = 'Failed to load orders';
        console.error(error);
      }
    );
  }
}