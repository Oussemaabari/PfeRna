package com.twd.pferna.service;

import com.twd.pferna.entity.Order;
import com.twd.pferna.entity.OrderItem;
import com.twd.pferna.entity.Product;
import com.twd.pferna.entity.Wishlist;
import com.twd.pferna.repository.OrderRepository;
import com.twd.pferna.repository.ProductRepository;
import com.twd.pferna.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OurUserService userService;

    public Order placeOrderFromWishlist(Long userId) {
        List<Wishlist> wishlistItems = wishlistRepository.findByUserId(userId);

        if (wishlistItems.isEmpty()) {
            throw new RuntimeException("Wishlist is empty");
        }

        Order order = new Order();
        order.setUser(userService.getUserById(userId.intValue()));
        order.setOrderDate(new Date());
        order.setAction("commande en cours de traitement"); // Set default action

        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0.0;

        for (Wishlist wishlist : wishlistItems) {
            Product product = productRepository.findById(wishlist.getProduct().getId()).orElse(null);
            if (product != null) {
                OrderItem orderItem = new OrderItem();
                orderItem.setProduct(product);
                orderItem.setQuantity(wishlist.getQuantity());
                orderItem.setPrice(product.getPrice());
                orderItem.setOrder(order);

                totalAmount += product.getPrice() * wishlist.getQuantity();
                orderItems.add(orderItem);
            }
        }

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);

        // Clear the wishlist after placing the order
        wishlistRepository.deleteAll(wishlistItems);

        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllWithItems();
    }

    public void updateOrderAction(Long orderId, String action) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setAction(action);
        orderRepository.save(order);
    }
    
    
    
}
