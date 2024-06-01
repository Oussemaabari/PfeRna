export interface OrderResponseDTO {
    id: number;
    userId: number;
    totalAmount: number;
    orderDate: Date;
    orderItems: OrderItemDTO[];
  }
  
  export interface OrderItemDTO {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }