
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-statistics',
  templateUrl: './order-statistics.component.html',
  styleUrls: ['./order-statistics.component.css']
})
export class OrderStatisticsComponent implements OnInit, AfterViewInit {
  totalOrders: number = 0;
  totalRevenue: number = 0;
  averageOrderValue: number = 0;
  errorMessage: string = '';

  constructor(private orderService: OrderService, private elRef: ElementRef, private router: Router) { }

  ngOnInit(): void {
    this.loadStatistics();
  }

  ngAfterViewInit(): void {
    this.adjustFontSize('totalOrders');
    this.adjustFontSize('totalRevenue');
    this.adjustFontSize('averageOrderValue');
  }

  loadStatistics(): void {
    this.orderService.getAllOrders().subscribe(
      (orders: Order[]) => {
        this.totalOrders = orders.length;
        this.totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        this.averageOrderValue = this.totalOrders ? this.totalRevenue / this.totalOrders : 0;
        this.adjustFontSize('totalOrders');
        this.adjustFontSize('totalRevenue');
        this.adjustFontSize('averageOrderValue');
      },
      (error) => {
        this.errorMessage = 'Failed to load statistics';
        console.error(error);
      }
    );
  }

  navigateToOrderList(): void {
    this.router.navigate(['/order-list']);
  }

  adjustFontSize(elementId: string): void {
    const element = this.elRef.nativeElement.querySelector(`.${elementId} .statNum`);
    if (element) {
      let fontSize = 24; // Initial font size
      while (element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) {
        fontSize--;
        element.style.fontSize = `${fontSize}px`;
      }
    }
  }
}