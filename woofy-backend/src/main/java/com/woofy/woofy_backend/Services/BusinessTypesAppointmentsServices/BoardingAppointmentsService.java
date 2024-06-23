package com.woofy.woofy_backend.Services.BusinessTypesAppointmentsServices;

import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.BoardingAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.BoardingScheduleEntity;
import com.woofy.woofy_backend.Repositories.BusinessTypesAppointmentRepositories.BoardingAppointmentRepository;
import com.woofy.woofy_backend.Repositories.BusinessTypesScheduleRepositories.BoardingScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BoardingAppointmentsService {

    @Autowired
    private BoardingAppointmentRepository boardingAppointmentRepository;

    @Autowired
    private BoardingScheduleRepository boardingScheduleRepository;

    public List<BoardingAppointmentEntity> getAppointmentsByBusinessId(Integer businessId) {
        return boardingAppointmentRepository.findByBoardingEntity_Business_Id(businessId);
    }

    public Optional<BoardingScheduleEntity> getScheduleByBusinessIdAndDate(Integer businessId, LocalDate date) {
        return boardingScheduleRepository.findByBoardingEntity_Business_IdAndDate(businessId, date);
    }

    public List<BoardingAppointmentEntity> getAppointmentsByDogId(Integer dogId) {
        return boardingAppointmentRepository.findByDogId(dogId);
    }
}