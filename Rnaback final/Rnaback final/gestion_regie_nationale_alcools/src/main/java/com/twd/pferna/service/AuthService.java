package com.twd.pferna.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.twd.pferna.dto.ReqRes;
import com.twd.pferna.entity.OurUsers;
import com.twd.pferna.repository.OurUserRepo;

@Service
public class AuthService {

    @Autowired
    private OurUserRepo ourUserRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JavaMailSender javaMailSender; // Add this line

    // Store OTPs with corresponding email addresses
    private Map<String, String> otpMap = new HashMap<>();

    public ReqRes signUp(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();
        try {
            OurUsers ourUsers = new OurUsers();
            ourUsers.setEmail(registrationRequest.getEmail());
            ourUsers.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            ourUsers.setRole(registrationRequest.getRole());
            ourUsers.setNom(registrationRequest.getNom());
            ourUsers.setPrenom(registrationRequest.getPrenom());
            ourUsers.setTel(registrationRequest.getTel());
            ourUsers.setTypeClient(registrationRequest.getTypeClient());

            
            OurUsers ourUserResult = ourUserRepo.save(ourUsers);
            if (ourUserResult != null && ourUserResult.getId() > 0) {
                resp.setOurUsers(ourUserResult);
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public ReqRes signIn(ReqRes signinRequest) {
        ReqRes response = new ReqRes();
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String email = authentication.getName();
            OurUsers user = ourUserRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

            String jwt = jwtUtils.generateToken(user);
            String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully Signed In");
            response.setRole(user.getRole());
        } catch (AuthenticationException e) {
            response.setStatusCode(401);
            response.setMessage("Authentication failed. Invalid email or password.");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes refreshToken(ReqRes refreshTokenRequest) {
        ReqRes response = new ReqRes();
        try {
            String refreshToken = refreshTokenRequest.getRefreshToken();
            String email = jwtUtils.extractUsername(refreshToken);

            OurUsers user = ourUserRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

            if (jwtUtils.isTokenValid(refreshToken, user)) {
                String jwt = jwtUtils.generateToken(user);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshToken);
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully Refreshed Token");
            } else {
                response.setStatusCode(401);
                response.setMessage("Refresh token is not valid");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }
    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            // Assuming you are using email as the username
            String email = authentication.getName();
            OurUsers user = ourUserRepo.findByEmail(email).orElse(null);
            if (user != null) {
                return (long) user.getId();
            }
        }
        return null;
    }

}
