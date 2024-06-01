package com.twd.pferna.controller;

import com.twd.pferna.entity.Product;
import com.twd.pferna.entity.Wishlist;
import com.twd.pferna.service.AuthService;
import com.twd.pferna.service.ProductService;
import com.twd.pferna.service.WishlistService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular development server
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private AuthService authService;
    @Autowired
    private WishlistService wishlistService;
    
    
    @GetMapping("/list")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @PostMapping("/add")
    public ResponseEntity<Product> createProduct(@RequestParam("name") String name,
                                                 @RequestParam("price") double price,
                                                 @RequestParam("quantity") int quantity,
                                                 @RequestParam("image") MultipartFile image) throws IOException {
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setQuantity(quantity);
        if (image != null && !image.isEmpty()) {
            product.setImage(image.getBytes());
        }

        Product newProduct = productService.createProduct(product);
        return ResponseEntity.ok(newProduct);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        try {
            Long productId = Long.parseLong(id);
            Product product = productService.getProductById(productId);
            if (product != null) {
                return ResponseEntity.ok(product);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build(); // Handle invalid ID format
        }
    }


    @PutMapping("/update/{id}") // Remove "update" from the mapping path
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        // Check if the product with the given id exists
        Product existingProduct = productService.getProductById(id);
        if (existingProduct == null) {
            return ResponseEntity.notFound().build();
        }

        // Update the existing product with the new data
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setQuantity(updatedProduct.getQuantity());

        // Call the service layer to save the updated product
        Product updatedProductResult = productService.updateProduct(id, existingProduct);

        // Return the updated product in the response
        return ResponseEntity.ok(updatedProductResult);
    }



    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')") // Only ADMIN can delete products
    public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            productService.deleteProduct(id);
            Map<String, Boolean> response = Map.of("deleted", Boolean.TRUE);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
	/*
	 * @PostMapping("/sell") public ResponseEntity<Void> placeOrderFromWishlist() {
	 * // Retrieve the currently logged-in user's ID Long userId =
	 * authService.getCurrentUserId();
	 * 
	 * // Check if userId is valid if (userId == null) { return
	 * ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); }
	 * 
	 * List<Wishlist> wishlist = wishlistService.getWishlistByUserId(userId); if
	 * (wishlist.isEmpty()) { return ResponseEntity.badRequest().build(); }
	 * 
	 * orderService.placeOrderFromWishlist(userId, wishlist);
	 * 
	 * // Clear the wishlist after placing the order wishlist.forEach(item ->
	 * wishlistService.removeFromWishlist(item.getId()));
	 * 
	 * return ResponseEntity.ok().build(); }
	 */
    
}
