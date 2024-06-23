package com.woofy.woofy_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class WoofyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(WoofyBackendApplication.class, args);
	}

}
