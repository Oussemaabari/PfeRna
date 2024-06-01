package com.twd.pferna.controller;

import com.twd.pferna.entity.Product;
import com.twd.pferna.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/list")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @PostMapping("/add")
    public ResponseEntity<Product> createProduct(@RequestParam("name") String name,
                                                 @RequestParam("type") String type,
                                                 @RequestParam("price") double price,
                                                 @RequestParam("availability") boolean availability,
                                                 @RequestParam("image") MultipartFile image) throws IOException {
        Product product = new Product();
        product.setName(name);
        product.setType(type);
        product.setPrice(price);
        product.setAvailability(availability);
        if (image != null && !image.isEmpty()) {
            product.setImage(image.getBytes());
        }

        Product newProduct = productService.createProduct(product);
        return ResponseEntity.ok(newProduct);
    }
    @PreAuthorize("hasAuthority('ADMIN')")

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Product product = productService.getProductById(id);
        if (product != null) {
            Product updatedProductResult = productService.updateProduct(id, updatedProduct);
            return ResponseEntity.ok(updatedProductResult);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
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
}
