package com.woofy.woofy_backend.Controllers.AppointmentControllers;

import com.woofy.woofy_backend.DTOs.AppointmentDTOs.GetAppointmentsRequestDTO;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessEntity;
import com.woofy.woofy_backend.Models.Entities.CustomerEntity;
import com.woofy.woofy_backend.Models.Entities.UserEntity;
import com.woofy.woofy_backend.Repositories.BusinessRepository;
import com.woofy.woofy_backend.Services.BusinessTypesAppointmentsServices.BaseAppointmentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/appointment")
public class BaseAppointmentController {

    @Autowired
    protected BusinessRepository businessRepository;

    @Autowired
    protected BaseAppointmentsService baseAppointmentsService;

    @GetMapping("/get-all")
    public ResponseEntity<List<GetAppointmentsRequestDTO>> getAllAppointments(Principal principal) {
        UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        if (user instanceof CustomerEntity) {
            Integer dogId = ((CustomerEntity) user).getDog().getId();
            List<GetAppointmentsRequestDTO> appointments = baseAppointmentsService.findAllAppointmentsByDogId(dogId);
            return ResponseEntity.ok(appointments);
        }
        if (user instanceof BusinessEntity) {
            Integer businessId = user.getId();
            List<GetAppointmentsRequestDTO> appointments = baseAppointmentsService.findAllAppointmentsByBusinessId(businessId);
            return ResponseEntity.ok(appointments);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}