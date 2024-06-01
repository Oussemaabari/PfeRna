package com.twd.pferna.controller;

import com.twd.pferna.entity.OurUsers;
import com.twd.pferna.repository.OurUserRepo;
import com.twd.pferna.service.AuthService;
import com.twd.pferna.service.OurUserService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/users")
public class OurUsersController {

    @Autowired
    private OurUserService ourUserService;
    
    @Autowired // Autowire OurUserRepo
    private OurUserRepo ourUserRepo;

    @Autowired
    private AuthService authService;

    // Get all users
    @GetMapping("/list")
    public ResponseEntity<List<OurUsers>> getAllUsers() {
        List<OurUsers> users = ourUserService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Create user
    @PostMapping("/add")
    public ResponseEntity<OurUsers> createUser(@RequestBody OurUsers user) {
        OurUsers newUser = ourUserService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    // Get user by id
    @GetMapping("/{id}")
    public ResponseEntity<OurUsers> getUserById(@PathVariable Integer id) {
        OurUsers user = ourUserService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update user
    @PutMapping("/{id}")
    public ResponseEntity<OurUsers> updateUser(@PathVariable Integer id, @RequestBody OurUsers updatedUser) {
        OurUsers user = ourUserService.getUserById(id);
        if (user != null) {
            updatedUser.setId(id); // Ensure the ID is set correctly
            OurUsers updatedUserResult = ourUserService.updateUser(updatedUser);
            return ResponseEntity.ok(updatedUserResult);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete user
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Integer id) {
        OurUsers user = ourUserService.getUserById(id);
        if (user != null) {
            ourUserService.deleteUser(user);
            Map<String, Boolean> response = Map.of("deleted", Boolean.TRUE);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
 // Update profile of the logged-in user
    @PutMapping("/profile")
    public ResponseEntity<OurUsers> updateProfile(HttpServletRequest request, @RequestBody OurUsers updatedUser) {
        // Retrieve user ID from request attribute
        Integer userId = (Integer) request.getAttribute("userId");
        if (userId == null) {
            // If user ID is not available in request attributes, return unauthorized response
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Fetch the currently logged-in user
        OurUsers user = ourUserService.getUserById(userId);
        if (user == null) {
            // If user does not exist, return not found response
            return ResponseEntity.notFound().build();
        }

        // Update the profile of the currently logged-in user
        // You may want to restrict certain fields from being updated or perform validation checks here
        if (updatedUser.getNom() != null) {
            user.setNom(updatedUser.getNom());
        }
        if (updatedUser.getPrenom() != null) {
            user.setPrenom(updatedUser.getPrenom());
        }
        if (updatedUser.getTel() != null) {
            user.setTel(updatedUser.getTel());
        }

        // Save the updated user profile
        OurUsers updatedUserResult = ourUserService.updateUser(user);
        return ResponseEntity.ok(updatedUserResult);
    }
    
 // Get profile of the logged-in user
    @GetMapping("/getprofile")
    public ResponseEntity<OurUsers> getProfile() {
        // Retrieve authentication object from SecurityContextHolder
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Check if the user is authenticated
        if (authentication == null || !authentication.isAuthenticated()) {
            // If user is not authenticated, return unauthorized response
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Retrieve email (assuming email is used for authentication)
        String email = authentication.getName();

        // Fetch the currently logged-in user by email
        Optional<OurUsers> userOptional = ourUserRepo.findByEmail(email);
        if (userOptional.isPresent()) {
            OurUsers user = userOptional.get();
            // Return the profile of the currently logged-in user
            return ResponseEntity.ok(user);
        } else {
            // If user does not exist, return not found response
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/currentUserId")
    public ResponseEntity<Long> getCurrentUserId() {
        Long userId = authService.getCurrentUserId();
        return ResponseEntity.ok(userId);
    }




}

