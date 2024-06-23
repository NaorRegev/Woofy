package com.woofy.woofy_backend.Controllers;// In BusinessController.java

import com.woofy.woofy_backend.DTOs.BusinessDTOs.BusinessUserSummaryDTO;
import com.woofy.woofy_backend.DTOs.BusinessDTOs.UpdateBusinessRequest;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessEntity;
import com.woofy.woofy_backend.Models.Entities.UserEntity;
import com.woofy.woofy_backend.Services.BusinessService;
import com.woofy.woofy_backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/business")
public class BusinessController {

    private final UserService userService;
    private final BusinessService businessService;

    @Autowired
    public BusinessController(BusinessService businessService, UserService userService ) {
        this.businessService = businessService;
        this.userService = userService;
    }


    @PatchMapping("/update")
    public ResponseEntity<?> updateBusiness(@RequestBody UpdateBusinessRequest request, Principal principal) {
        try {
            UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
            userService.updateUser(user.getId(), request);
            businessService.updateBusiness(user.getId(), request);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<BusinessUserSummaryDTO>> getAllUsers() {
        try {
            List<BusinessUserSummaryDTO> users = businessService.getAllBusinessUsersSummary();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusinessUserSummaryDTO> getBusiness(@PathVariable Integer id) {
        try {
            BusinessUserSummaryDTO business = businessService.mapToBusinessUserSummaryDTO(businessService.getBusiness(id));
            return ResponseEntity.ok(business);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update/images/")
    public ResponseEntity<Void> updateDogImages(@RequestBody List<Integer> imageIds, Principal principal) {
        UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        Integer businessId;
        if (user instanceof BusinessEntity business) {
            businessId = business.getId();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        try {
            businessService.updateBusinessImages(businessId, imageIds);
        } catch (Exception e) {
            deleteBusiness(principal);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/delete/")
    public ResponseEntity<Void> deleteBusiness(Principal principal) {
        UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        try {
            businessService.deleteBusiness(user.getId());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}