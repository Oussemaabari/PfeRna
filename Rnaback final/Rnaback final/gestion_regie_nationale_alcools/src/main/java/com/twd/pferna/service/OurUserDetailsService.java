package com.twd.pferna.service;

import com.twd.pferna.repository.OurUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class OurUserDetailsService implements UserDetailsService {

	@Autowired
	private OurUserRepo ourUserRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		return ourUserRepo.findByEmail(email).orElseThrow();
	}
}
