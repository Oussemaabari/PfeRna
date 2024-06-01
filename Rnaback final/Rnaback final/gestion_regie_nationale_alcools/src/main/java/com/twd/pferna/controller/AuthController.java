package com.twd.pferna.controller;

import com.twd.pferna.dto.ReqRes;
import com.twd.pferna.entity.OurUsers;
import com.twd.pferna.service.AuthService;
import com.twd.pferna.service.EmailService;
import com.twd.pferna.service.OurUserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @Autowired
    private OurUserService ourUserService;

    @Autowired
    private EmailService emailService;

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
    
    @GetMapping("/reset-password/{email}")
    public ResponseEntity<String> initiatePasswordReset(@PathVariable("email") String email) {
        OurUsers user = ourUserService.getUserByEmail(email);
        if (user != null) {
            String result = emailService.sendEmailPass(email, "Password Reset", user);
            log.info(result);
            return ResponseEntity.ok("Password reset email sent successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
