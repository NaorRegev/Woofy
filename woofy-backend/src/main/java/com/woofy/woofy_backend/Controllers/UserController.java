package com.woofy.woofy_backend.Controllers;

import com.woofy.woofy_backend.DTOs.AuthenticationDTOs.ChangePasswordRequest;
import com.woofy.woofy_backend.DTOs.UserDTOs.UpdateUserRequest;
import com.woofy.woofy_backend.DTOs.UserDTOs.UserSummaryDTO;
import com.woofy.woofy_backend.Models.Entities.UserEntity;
import com.woofy.woofy_backend.Repositories.UserRepository;
import com.woofy.woofy_backend.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @Autowired
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getUser(Principal principal) {
        try {
            UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
            UserSummaryDTO userSummaryDTO = service.mapToDTO(user);
            return ResponseEntity.ok(userSummaryDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving user details");
        }
    }

    @PatchMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserRequest request, Principal connectedUser) {
        try {
            UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
            UserEntity updatedUser = service.updateUser(user.getId(), request);
            return ResponseEntity.ok(updatedUser);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user");
        }
    }

    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Principal connectedUser) {
        try {
            service.changePassword(request, connectedUser);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error changing password");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<UserSummaryDTO> users = service.getAllUsersSummary();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving users");
        }
    }

    @GetMapping("/name/{id}")
    public ResponseEntity<?> getFullNameById(@PathVariable Integer id) {
        try {
            String fullName = service.getFullNameById(id);
            return ResponseEntity.ok(fullName);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving user name");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        try {
            UserEntity user = service.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving user details");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUserByPrincipal(Principal principal) {
        try {
            UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
            service.deleteUserById(user.getId());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
        }
    }
}
