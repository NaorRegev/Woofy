package com.woofy.woofy_backend.Controllers.AppointmentControllers;

import com.woofy.woofy_backend.DTOs.AppointmentDTOs.CreateDogWalkerAppointmentRequest;
import com.woofy.woofy_backend.DTOs.AppointmentDTOs.GetScheduleAndAppointmentDetailsRequest;
import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.DogWalkerAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.Homestay.DogWalkerEntity;
import com.woofy.woofy_backend.Models.Entities.CustomerEntity;
import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.DogWalkerScheduleEntity;
import com.woofy.woofy_backend.Models.Enums.WorkingDaysEnum;
import com.woofy.woofy_backend.Repositories.BusinessTypesAppointmentRepositories.DogWalkerAppointmentRepository;
import com.woofy.woofy_backend.Repositories.BusinessTypesRepositories.DogWalkerRepository;
import com.woofy.woofy_backend.Repositories.BusinessTypesScheduleRepositories.DogWalkerScheduleRepository;
import com.woofy.woofy_backend.Utils.TimeSlot;
import com.woofy.woofy_backend.Utils.TimeSlotUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/appointment/dog-walker")
public class DogWalkerAppointmentController extends BaseAppointmentController{

    @Autowired
    private DogWalkerScheduleRepository dogWalkerScheduleRepository;

    @Autowired
    private DogWalkerAppointmentRepository dogWalkerAppointmentRepository;

    @Autowired
    private DogWalkerRepository dogWalkerEntityRepository;

    @PostMapping("/create-appointment")
    public ResponseEntity<String> createDogWalkerAppointment(@RequestBody CreateDogWalkerAppointmentRequest newAppointmentRequest, Principal principal) {

        CustomerEntity customer = (CustomerEntity) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        BusinessEntity business = businessRepository.getReferenceById(newAppointmentRequest.getBusinessId());
        DogWalkerEntity dogWalker = business.getDogWalkerEntity();
        LocalDate appointmentDate = newAppointmentRequest.getDate();
        LocalTime appointmentStartTime = newAppointmentRequest.getStartTime();
        LocalTime appointmentEndTime = newAppointmentRequest.getEndTime();
        LocalTime dogWalkerStartTime = dogWalker.getStartTime();
        LocalTime dogWalkerEndTime = dogWalker.getEndTime();
        int appointmentLength = dogWalker.getAppointmentLengthInMinutes();

        if (appointmentEndTime.isBefore(appointmentStartTime)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("End time of the dog walker appointment cannot be before start time");
        }

        List<TimeSlot> timeSlots;
        timeSlots = TimeSlotUtil.generateSlotsByMinutes(dogWalkerStartTime, dogWalkerEndTime, appointmentLength);
        TimeSlot requestedSlot = new TimeSlot(appointmentStartTime, appointmentEndTime);

        if (!timeSlots.contains(requestedSlot)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid time slot");
        }

        DogWalkerScheduleEntity existingSchedule = dogWalkerScheduleRepository.findByDateAndStartTimeAndEndTime(appointmentDate, appointmentStartTime, appointmentEndTime).orElse(null);

        if (existingSchedule != null) {
            existingSchedule.setCurrentDogCapacity(existingSchedule.getCurrentDogCapacity() + 1);
            dogWalkerScheduleRepository.save(existingSchedule);
        } else {
            DogWalkerScheduleEntity newSchedule = new DogWalkerScheduleEntity();
            newSchedule.setDate(appointmentDate);
            newSchedule.setStartTime(appointmentStartTime);
            newSchedule.setEndTime(appointmentEndTime);
            newSchedule.setDogWalkerEntity(dogWalker);
            newSchedule.setCurrentDogCapacity(1);
            dogWalkerScheduleRepository.save(newSchedule);

            // Add the new schedule to the list of schedules in the DogWalkerEntity
            List<DogWalkerScheduleEntity> dogWalkerSchedules = dogWalker.getDogWalkerScheduleEntities();
            if (dogWalkerSchedules == null) {
                dogWalkerSchedules = new ArrayList<>();
            }
            dogWalkerSchedules.add(newSchedule);
            dogWalker.setDogWalkerScheduleEntities(dogWalkerSchedules);
        }

        DogWalkerAppointmentEntity dogWalkerAppointmentEntity = new DogWalkerAppointmentEntity();
        dogWalkerAppointmentEntity.setDate(appointmentDate);
        dogWalkerAppointmentEntity.setStartTime(appointmentStartTime);
        dogWalkerAppointmentEntity.setEndTime(appointmentEndTime);
        dogWalkerAppointmentEntity.setDogWalkerEntity(dogWalker);
        dogWalkerAppointmentEntity.setDogId(customer.getDog().getId());

        // Add the new appointment to the list of appointments in the DogWalkerEntity
        List<DogWalkerAppointmentEntity> dogWalkerAppointments = dogWalker.getDogWalkerAppointmentEntities();
        if (dogWalkerAppointments == null) {
            dogWalkerAppointments = new ArrayList<>();
        }
        dogWalkerAppointments.add(dogWalkerAppointmentEntity);
        dogWalker.setDogWalkerAppointmentEntities(dogWalkerAppointments);

        dogWalkerAppointmentRepository.save(dogWalkerAppointmentEntity);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/available-hours-by-business")
    public ResponseEntity<List<TimeSlot>> getAvailableHoursByBusinessDogWalker(@RequestBody GetScheduleAndAppointmentDetailsRequest request) {
        if (request.getBusinessId() == null || request.getDate() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Business ID and date must not be null");
        }
        DogWalkerEntity dogWalker = dogWalkerEntityRepository.findByBusiness_Id(request.getBusinessId());
        if (request.getDate().isBefore(dogWalker.getStartDate()) || request.getDate().isAfter(dogWalker.getEndDate()) ||
                !dogWalker.getWorkingDays().contains(WorkingDaysEnum.valueOf(request.getDate().getDayOfWeek().name()))) {
            return ResponseEntity.ok(new ArrayList<>()); // Return an empty list if the date is not within the business's date range or if the day is not a working day
        }
        Optional<List<DogWalkerScheduleEntity>> optionalSchedules = dogWalkerScheduleRepository.findAllByDogWalkerEntity_Business_IdAndDate(request.getBusinessId(), request.getDate());
        List<TimeSlot> takenTimeSlots = optionalSchedules.isPresent() ? TimeSlotUtil.createTimeSlotsFromSchedulesDogWalker(optionalSchedules) : new ArrayList<>();

        // Get the total working hours of the dog walker
        List<TimeSlot> totalWorkingHours = TimeSlotUtil.generateSlotsByMinutes(dogWalker.getStartTime(), dogWalker.getEndTime(), dogWalker.getAppointmentLengthInMinutes());

        // Subtract the taken hours from the total working hours
        totalWorkingHours.removeAll(takenTimeSlots);

        return ResponseEntity.ok(totalWorkingHours);
    }

    @DeleteMapping("/delete-appointment/{appointmentId}")
    public ResponseEntity<String> deleteDogWalkerAppointment(@PathVariable int appointmentId) {
        Optional<DogWalkerAppointmentEntity> optionalAppointment = dogWalkerAppointmentRepository.findById(appointmentId);

        if (optionalAppointment.isPresent()) {
            DogWalkerAppointmentEntity appointment = optionalAppointment.get();
            DogWalkerScheduleEntity schedule = dogWalkerScheduleRepository.findByDateAndStartTimeAndEndTime(
                    appointment.getDate(), appointment.getStartTime(), appointment.getEndTime()).orElse(null);

            if (schedule != null) {
                schedule.setCurrentDogCapacity(schedule.getCurrentDogCapacity() - 1);

                if (schedule.getCurrentDogCapacity() <= 0) {
                    dogWalkerScheduleRepository.delete(schedule);
                } else {
                    dogWalkerScheduleRepository.save(schedule);
                }
            }

            dogWalkerAppointmentRepository.delete(appointment);

            return ResponseEntity.status(HttpStatus.OK).body("Appointment deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found");
        }
    }
}
