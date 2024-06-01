export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: any;
  orderId: number;
  userId: number;
  totalAmount: number;
  orderDate: Date;
  action: string;
  orderItems: OrderItem[];
}