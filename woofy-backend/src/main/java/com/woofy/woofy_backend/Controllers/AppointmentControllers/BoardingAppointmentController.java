package com.woofy.woofy_backend.Controllers.AppointmentControllers;

import com.woofy.woofy_backend.DTOs.AppointmentDTOs.CreateBoardingAppointmentRequest;
import com.woofy.woofy_backend.DTOs.AppointmentDTOs.GetScheduleAndAppointmentDetailsRequest;
import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.BoardingAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness.BoardingEntity;
import com.woofy.woofy_backend.Models.Entities.CustomerEntity;
import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.BoardingScheduleEntity;
import com.woofy.woofy_backend.Models.Entities.UserEntity;
import com.woofy.woofy_backend.Models.Enums.WorkingDaysEnum;
import com.woofy.woofy_backend.Repositories.BusinessTypesAppointmentRepositories.BoardingAppointmentRepository;
import com.woofy.woofy_backend.Repositories.BusinessTypesRepositories.BoardingRepository;
import com.woofy.woofy_backend.Repositories.BusinessTypesScheduleRepositories.BoardingScheduleRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/appointment/boarding")
public class BoardingAppointmentController extends BaseAppointmentController{

    @Autowired
    private BoardingScheduleRepository boardingScheduleRepository;

    @Autowired
    private BoardingAppointmentRepository boardingAppointmentRepository;

    @Autowired
    private BoardingRepository boardingRepository;

    @PostMapping("/create-appointment")
    public ResponseEntity<String> createBoardingAppointment(@RequestBody CreateBoardingAppointmentRequest newAppointmentRequest, Principal principal) {

        CustomerEntity customer = (CustomerEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        BusinessEntity business = businessRepository.getReferenceById(newAppointmentRequest.getBusinessId());
        BoardingEntity boarding = business.getBoardingEntity();

        LocalDate startDate = newAppointmentRequest.getDate();
        LocalDate endDate = newAppointmentRequest.getEndDate();

        if (startDate.isAfter(endDate)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Start date cannot be after end date");
        }

        List<LocalDate> dates = startDate.datesUntil(endDate.plusDays(1)).collect(Collectors.toList());

        for (LocalDate date : dates) {
            DayOfWeek appointmentDayOfWeek = date.getDayOfWeek();

            if (!boarding.getWorkingDays().contains(WorkingDaysEnum.valueOf(appointmentDayOfWeek.name()))) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Boarding is not available on " + date);
            }

            if (date.isBefore(boarding.getStartDate()) || date.isAfter(boarding.getEndDate())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Appointment date " + date + " is not within the available dates of the boarding");
            }

            BoardingScheduleEntity existingSchedule = boardingScheduleRepository.findByDate(date).orElse(null);

            if (existingSchedule != null) {
                if (boarding.getDogCapacity() <= existingSchedule.getCurrentDogCapacity()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No more room for dogs on " + date);
                }
                existingSchedule.setCurrentDogCapacity(existingSchedule.getCurrentDogCapacity() + 1);
            } else {
                BoardingScheduleEntity newSchedule = new BoardingScheduleEntity();
                newSchedule.setDate(date);
                newSchedule.setBoardingEntity(boarding);
                newSchedule.setCurrentDogCapacity(1);
                boardingScheduleRepository.save(newSchedule);

                List<BoardingScheduleEntity> boardingSchedules = boarding.getBoardingScheduleEntities();
                if (boardingSchedules == null) {
                    boardingSchedules = new ArrayList<>();
                }
                boardingSchedules.add(newSchedule);
                boarding.setBoardingScheduleEntities(boardingSchedules);
            }
        }

        // Create a single BoardingAppointmentEntity for the whole period
        BoardingAppointmentEntity boardingAppointmentEntity = new BoardingAppointmentEntity();
        boardingAppointmentEntity.setDate(startDate);
        boardingAppointmentEntity.setEndDate(endDate);
        boardingAppointmentEntity.setBoardingEntity(boarding);
        boardingAppointmentEntity.setDogId(customer.getDog().getId());

        List<BoardingAppointmentEntity> boardingAppointments = boarding.getBoardingAppointmentEntities();
        if (boardingAppointments == null) {
            boardingAppointments = new ArrayList<>();
        }
        boardingAppointments.add(boardingAppointmentEntity);
        boarding.setBoardingAppointmentEntities(boardingAppointments);

        boardingAppointmentRepository.save(boardingAppointmentEntity);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @GetMapping("/get-appointments")
    public ResponseEntity<List<BoardingAppointmentEntity>> getAllBoardingAppointments(Principal principal) {
        UserEntity user = (UserEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        if (user instanceof CustomerEntity) {
            Integer dogId = ((CustomerEntity) user).getDog().getId();
            List<BoardingAppointmentEntity> appointments = boardingAppointmentRepository.findByDogId(dogId);
            return ResponseEntity.ok(appointments);
        }
        if (user instanceof BusinessEntity) {
            Integer businessId = user.getId();
            List<BoardingAppointmentEntity> appointments = boardingAppointmentRepository.findByBoardingEntity_Business_Id(businessId);
            return ResponseEntity.ok(appointments);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @PostMapping("/available-capacity-by-date-range")
    public ResponseEntity<Map<LocalDate, Integer>> getAvailableCapacityByDateRange(@RequestBody GetScheduleAndAppointmentDetailsRequest getScheduleRequest) {
        if (getScheduleRequest.getBusinessId() == null || getScheduleRequest.getStartDate() == null || getScheduleRequest.getEndDate() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Business ID, start date, and end date must not be null");
        }
        BoardingEntity boardingEntity = boardingRepository.findByBusiness_Id(getScheduleRequest.getBusinessId());
        List<BoardingAppointmentEntity> appointments = boardingAppointmentRepository.findAllByBoardingEntity_Business_IdAndDateBetween(
                getScheduleRequest.getBusinessId(),
                getScheduleRequest.getStartDate(),
                getScheduleRequest.getEndDate()
        );

        Map<LocalDate, Integer> availableCapacities = getLocalDateIntegerMap(getScheduleRequest, appointments, boardingEntity);

        return ResponseEntity.ok(availableCapacities);
    }

    @DeleteMapping("/delete-appointment/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Integer id) {
        if (!boardingAppointmentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        boardingAppointmentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    private static @NotNull Map<LocalDate, Integer> getLocalDateIntegerMap(GetScheduleAndAppointmentDetailsRequest getScheduleRequest, List<BoardingAppointmentEntity> appointments, BoardingEntity boardingEntity) {
        Map<LocalDate, Integer> availableCapacities = new HashMap<>();
        LocalDate currentDate = getScheduleRequest.getStartDate();
        while (!currentDate.isAfter(getScheduleRequest.getEndDate())) {
            if (!boardingEntity.getWorkingDays().contains(WorkingDaysEnum.valueOf(currentDate.getDayOfWeek().name())) ||
                    currentDate.isBefore(boardingEntity.getStartDate()) || currentDate.isAfter(boardingEntity.getEndDate())) {
                availableCapacities.put(currentDate, 0);
            } else {
                int currentDogCapacity = 0;
                for (BoardingAppointmentEntity appointment : appointments) {
                    if ((currentDate.isEqual(appointment.getDate()) || currentDate.isAfter(appointment.getDate())) &&
                            (currentDate.isEqual(appointment.getEndDate()) || currentDate.isBefore(appointment.getEndDate()))) {
                        currentDogCapacity++;
                    }
                }

                int availableCapacity = Math.max(0, boardingEntity.getDogCapacity() - currentDogCapacity);
                availableCapacities.put(currentDate, availableCapacity);
            }
            currentDate = currentDate.plusDays(1);
        }
        return availableCapacities;
    }
}