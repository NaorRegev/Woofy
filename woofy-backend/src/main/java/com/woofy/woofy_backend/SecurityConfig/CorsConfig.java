package com.woofy.woofy_backend.SecurityConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173","http://localhost:3000", "http://localhost:8080", "http://woofy.studio", "https://woofy.studio")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS","PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}