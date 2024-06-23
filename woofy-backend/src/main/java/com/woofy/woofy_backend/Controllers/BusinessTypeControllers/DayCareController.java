package com.woofy.woofy_backend.Controllers.BusinessTypeControllers;

import com.woofy.woofy_backend.DTOs.BusinessTypeDTOs.StayAtBusinessDTOs.DayCareDTOs.CreateOrEditDayCareRequest;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness.DayCareEntity;
import com.woofy.woofy_backend.Models.Entities.UserEntity;
import com.woofy.woofy_backend.Repositories.BusinessTypesRepositories.DayCareRepository;
import com.woofy.woofy_backend.Services.BusinessTypesServices.DayCareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/business/business-type/day-care")
public class DayCareController {

    @Autowired
    private DayCareService dayCareService;

    @Autowired
    private DayCareRepository dayCareRepository;

    @PostMapping("/create")
    public ResponseEntity<Void> createDayCare(@RequestBody CreateOrEditDayCareRequest request, Principal principal) {
        try {
            UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
            dayCareService.createDayCare(request, user.getId());
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteDayCare(Principal principal) {
        try {
            UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
            dayCareService.deleteDayCare(user.getId());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<DayCareEntity>> getAllBoardings() {
        try {
            List<DayCareEntity> boardings = dayCareRepository.findAll();
            return ResponseEntity.ok(boardings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<Void> editDayCare(@RequestBody CreateOrEditDayCareRequest request, Principal principal) {
        try {
            UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
            dayCareService.editDayCare(request, user.getId());
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
