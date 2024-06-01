package com.twd.pferna;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.twd.pferna"})
public class SpringGestionRegieNationale {

	public static void main(String[] args) {
		SpringApplication.run(SpringGestionRegieNationale.class, args);
	}

}
