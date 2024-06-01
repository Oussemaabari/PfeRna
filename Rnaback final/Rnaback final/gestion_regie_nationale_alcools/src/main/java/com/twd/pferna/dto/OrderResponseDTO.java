	package com.twd.pferna.dto;

import com.twd.pferna.entity.Order;
import com.twd.pferna.entity.OrderItem;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class OrderResponseDTO {
    private Long orderId;
    private Long userId;
    private List<OrderItemDTO> orderItems;
    private Double totalAmount;
    private Date orderDate;
    private String action; // New field

    public OrderResponseDTO(Order order) {
        this.orderId = order.getId();
        this.userId = order.getUser().getId().longValue();
        this.totalAmount = order.getTotalAmount();
        this.orderDate = order.getOrderDate();
        this.action = order.getAction(); // Set the action field
        this.orderItems = order.getOrderItems().stream()
                .map(OrderItemDTO::new)
                .collect(Collectors.toList());
    }

    // Getters and Setters

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDTO> orderItems) {
        this.orderItems = orderItems;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
