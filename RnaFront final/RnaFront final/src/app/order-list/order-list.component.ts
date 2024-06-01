import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderResponseDTO } from '../order-response-dto';
import { Order } from '../order'; // Adjust the path based on the actual file location
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  errorMessage = '';

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(
      (data: Order[]) => this.orders = data,
      error => {
        console.error('Error occurred while fetching orders:', error);
        this.errorMessage = 'Failed to fetch orders. Please try again later.';
      }
    );
  }

  updateOrderAction(order: Order) {
    this.orderService.updateOrderAction(order.orderId, order.action).subscribe(
      () => {
        console.log('Order action updated successfully');
      },
      error => {
        console.error('Error occurred while updating order action:', error);
        this.errorMessage = 'Failed to update order action. Please try again later.';
      }
    );
  }
}  
// import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../order.service';
// import { OrderResponseDTO } from '../order-response-dto';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-order-list',
//   templateUrl: './order-list.component.html',
//   styleUrls: ['./order-list.component.css']
// })
// export class OrderListComponent implements OnInit {
//   orders: OrderResponseDTO[] = [];
//   errorMessage: string = '';
//   currentUserID: number | null = null;

//   constructor(private orderService: OrderService, private authService: AuthService) {}

//   ngOnInit(): void {
//     this.loadOrders();
//     this.loadCurrentUserID();
//   }

//   loadOrders(): void {
//     this.orderService.getAllOrders().subscribe(
//       (data: OrderResponseDTO[]) => {
//         // Filter orders based on currentUserID
//         this.orders = this.currentUserID ? data.filter(order => order.userId === this.currentUserID) : [];
//       },
//       (error) => {
//         this.errorMessage = 'Failed to load orders';
//         console.error(error);
//       }
//     );
//   }

//   loadCurrentUserID(): void {
//     this.authService.getCurrentUserId().subscribe(
//       (userID) => {
//         this.currentUserID = userID;
//         // Load orders only if currentUserID is available
//         if (this.currentUserID !== null) {
//           this.loadOrders();
//         }
//       },
//       (error) => {
//         console.error('Failed to get current user ID:', error);
//       }
//     );
//   }
// }