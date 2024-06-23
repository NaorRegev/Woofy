package com.woofy.woofy_backend.Controllers.BusinessTypeControllers;

import com.woofy.woofy_backend.DTOs.BusinessTypeDTOs.HomestayDTOs.DogSitterDTOs.CreateOrUpdateDogSitterRequest;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.Homestay.DogSitterEntity;
import com.woofy.woofy_backend.Models.Entities.UserEntity;
import com.woofy.woofy_backend.Repositories.BusinessTypesRepositories.DogSitterRepository;
import com.woofy.woofy_backend.Services.BusinessTypesServices.DogSitterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/business/business-type/dog-sitter")
public class DogSitterController {

    @Autowired
    private DogSitterService dogSitterService;

    @Autowired
    private DogSitterRepository dogSitterRepository;

    @PostMapping("/create")
    public ResponseEntity<Void> createDogSitter(@RequestBody CreateOrUpdateDogSitterRequest request, Principal principal) {
        try {
            UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
            dogSitterService.createDogSitter(request, user.getId());
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteDogSitter(Principal principal) {
        try {
            UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
            dogSitterService.deleteDogSitter(user.getId());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<DogSitterEntity>> getAllBoardings() {
        try {
            List<DogSitterEntity> boardings = dogSitterRepository.findAll();
            return ResponseEntity.ok(boardings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<Void> editDogSitter(@RequestBody CreateOrUpdateDogSitterRequest request, Principal principal) {
        try {
            UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
            dogSitterService.editDogSitter(request, user.getId());
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
