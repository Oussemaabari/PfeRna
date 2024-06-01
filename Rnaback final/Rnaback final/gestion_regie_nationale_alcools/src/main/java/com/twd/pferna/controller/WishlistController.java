package com.twd.pferna.controller;

import com.twd.pferna.dto.WishlistRequestDTO;
import com.twd.pferna.dto.WishlistResponseDTO;
import com.twd.pferna.entity.OurUsers;
import com.twd.pferna.entity.Product;
import com.twd.pferna.entity.Wishlist;
import com.twd.pferna.service.AuthService;
import com.twd.pferna.service.OurUserService;
import com.twd.pferna.service.ProductService;
import com.twd.pferna.service.WishlistService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/wishlist")
@CrossOrigin(origins = "http://localhost:4200")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;
    
    @Autowired
    private ProductService productService;
    
    @Autowired
    private OurUserService userService;
    
    @Autowired
    private AuthService authService;

    @PostMapping("/add")
    public ResponseEntity<List<WishlistResponseDTO>> addToWishlist(@RequestBody List<WishlistRequestDTO> wishlistRequests) {
        Long userId = authService.getCurrentUserId();
        
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Convert userId from Long to Integer
        Integer userIdInteger = userId.intValue();
        
        List<WishlistResponseDTO> responseDTOs = new ArrayList<>();

        for (WishlistRequestDTO wishlistRequest : wishlistRequests) {
            Wishlist wishlist = new Wishlist();
            
            Product product = productService.getProductById(wishlistRequest.getProductId());
            
            // Use the converted userIdInteger
            OurUsers user = userService.getUserById(userIdInteger);

            wishlist.setProduct(product);
            wishlist.setUser(user);
            wishlist.setQuantity(wishlistRequest.getQuantity());
            
            Wishlist addedWishlist = wishlistService.addToWishlist(wishlist);

            WishlistResponseDTO responseDTO = new WishlistResponseDTO();
            responseDTO.setId(addedWishlist.getId());
            responseDTO.setProductId(addedWishlist.getProduct().getId());
            responseDTO.setProductName(addedWishlist.getProduct().getName());
            responseDTO.setUserId(addedWishlist.getUser().getId());
            responseDTO.setUserName(addedWishlist.getUser().getUsername());
            responseDTO.setQuantity(addedWishlist.getQuantity());

            responseDTOs.add(responseDTO);
        }

        return ResponseEntity.ok(responseDTOs);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable Long id) {
        wishlistService.removeFromWishlist(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearWishlist() {
        Long userId = authService.getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        wishlistService.clearWishlistByUserId(userId.intValue());
        return ResponseEntity.noContent().build();
    }
}
