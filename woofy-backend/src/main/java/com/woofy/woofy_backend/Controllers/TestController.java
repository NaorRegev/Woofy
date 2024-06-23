package com.woofy.woofy_backend.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/api/v1/hello")
    public ResponseEntity<String> getHello() {
        return ResponseEntity.ok("Hello from the backend! Test Naor clone");
    }
}

