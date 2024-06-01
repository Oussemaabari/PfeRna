package com.twd.pferna.controller;

import com.twd.pferna.dto.ReqRes;
import com.twd.pferna.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ReqRes> signUp(@RequestBody ReqRes signUpRequest) {
        return ResponseEntity.ok(authService.signUp(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<ReqRes> signIn(@RequestBody ReqRes signInRequest) {
        return ResponseEntity.ok(authService.signIn(signInRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes refreshTokenRequest) {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }
    
    @PostMapping("/resetpassword/request")
    public ResponseEntity<ReqRes> resetPasswordRequest(@RequestParam String email) {
        return ResponseEntity.ok(authService.resetPasswordRequest(email));
    }

    @PostMapping("/resetpassword")
    public ResponseEntity<ReqRes> resetPassword(@RequestParam String email,
                                                @RequestParam String otp,
                                                @RequestParam String newPassword) {
        return ResponseEntity.ok(authService.resetPassword(email, otp, newPassword));
    }
}
