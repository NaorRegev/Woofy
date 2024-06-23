package com.woofy.woofy_backend.Controllers.BusinessTypeControllers;

import com.woofy.woofy_backend.DTOs.BusinessTypeDTOs.StayAtBusinessDTOs.BoardingDTOs.CreateOrEditBoardingRequest;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness.BoardingEntity;
import com.woofy.woofy_backend.Models.Entities.UserEntity;
import com.woofy.woofy_backend.Repositories.BusinessRepository;
import com.woofy.woofy_backend.Repositories.BusinessTypesRepositories.BoardingRepository;
import com.woofy.woofy_backend.Services.BusinessTypesServices.BoardingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/business/business-type/boarding")
public class BoardingController {

    private final BoardingService boardingService;
    private final BusinessRepository businessRepository;

    @Autowired
    private BoardingRepository boardingRepository;

    @Autowired
    public BoardingController(BoardingService boardingService, BusinessRepository businessRepository) {
        this.boardingService = boardingService;
        this.businessRepository = businessRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createBoarding(@RequestBody CreateOrEditBoardingRequest request, Principal principal) {
        try {
            UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
            boardingService.createBoarding(request, user.getId());
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<Void> editBoarding(@RequestBody CreateOrEditBoardingRequest request, Principal principal) {
        try {
            UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
            boardingService.editBoarding(request, user.getId());
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteBoarding(Principal principal) {
        try {
            UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
            boardingService.deleteBoarding(user.getId());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<BoardingEntity>> getAllBoardings() {
        try {
            List<BoardingEntity> boardings = boardingRepository.findAll();
            return ResponseEntity.ok(boardings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
