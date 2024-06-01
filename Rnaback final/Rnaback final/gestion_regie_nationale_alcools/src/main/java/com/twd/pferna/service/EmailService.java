package com.twd.pferna.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.twd.pferna.entity.OurUsers;
import com.twd.pferna.repository.OurUserRepo;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Random;

@Service
public class EmailService implements IEmailService {

    private final JavaMailSender javaMailSender;
    private final OurUserRepo ourUserRepo;
    private final String sender;

    public EmailService(JavaMailSender javaMailSender, OurUserRepo ourUserRepo, @Value("${spring.mail.username}") String sender) {
        this.javaMailSender = javaMailSender;
        this.ourUserRepo = ourUserRepo;
        this.sender = sender;
    }

    @Override
    public String sendEmailPass(String to, String subject, OurUsers user) {
        try {
            Random random = new Random();
            int randomWithNextInt = Math.abs(random.nextInt());
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            user.setPassword(passwordEncoder.encode(String.valueOf(randomWithNextInt)));

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(user.getEmail());
            mailMessage.setSubject("Reset Password");
            mailMessage.setText("Your new password is: " + randomWithNextInt);

            javaMailSender.send(mailMessage);

            ourUserRepo.save(user);

            return "Mail Sent";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
