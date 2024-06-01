package com.twd.pferna.controller;

import com.twd.pferna.dto.OrderResponseDTO;
import com.twd.pferna.entity.Order;
import com.twd.pferna.service.AuthService;
import com.twd.pferna.service.OrderService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private AuthService authService;

    @PostMapping("/placeFromWishlist")
    public ResponseEntity<OrderResponseDTO> placeOrderFromWishlist() {
        Long userId = authService.getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Order order = orderService.placeOrderFromWishlist(userId);
        OrderResponseDTO orderResponseDTO = new OrderResponseDTO(order);

        return ResponseEntity.ok(orderResponseDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        List<OrderResponseDTO> orderResponseDTOs = orders.stream()
                .map(OrderResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(orderResponseDTOs);
    }

    @PutMapping("/{orderId}/action")
    public ResponseEntity<Void> updateOrderAction(@PathVariable Long orderId, @RequestBody Order order) {
        orderService.updateOrderAction(orderId, order.getAction());
        return ResponseEntity.noContent().build();
    }
}
