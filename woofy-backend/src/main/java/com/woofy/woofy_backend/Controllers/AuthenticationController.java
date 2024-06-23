package com.woofy.woofy_backend.Controllers;

import com.woofy.woofy_backend.DTOs.AuthenticationDTOs.AuthenticationRequest;
import com.woofy.woofy_backend.DTOs.AuthenticationDTOs.EmailValidationRequest;
import com.woofy.woofy_backend.DTOs.BusinessDTOs.BusinessRegisterRequest;
import com.woofy.woofy_backend.DTOs.UserDTOs.BaseRegisterRequest;
import com.woofy.woofy_backend.Services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/check-valid-email")
    public ResponseEntity<?> check_valid_email(@Valid @RequestBody EmailValidationRequest request, BindingResult result) {
        try {
            return service.check_valid_email(request, result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/register-business")
    public ResponseEntity<?> register_business(@Valid @RequestBody BusinessRegisterRequest request, BindingResult result) {
        try {
            return service.registerBusiness(request, result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/register-customer")
    public ResponseEntity<?> register_customer(@Valid @RequestBody BaseRegisterRequest request, BindingResult result) {
        try {
            return service.registerCustomer(request, result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            return service.authenticate(request);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        try {
            service.refreshToken(request, response);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}