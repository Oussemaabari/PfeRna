package com.twd.pferna.service;

import com.twd.pferna.entity.OurUsers;

public interface IEmailService {
    String sendEmailPass(String to, String subject, OurUsers user);
}
