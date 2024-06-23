package com.woofy.woofy_backend.Repositories.BusinessTypesAppointmentRepositories;

import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.BoardingAppointmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BoardingAppointmentRepository extends JpaRepository<BoardingAppointmentEntity, Integer> {
    List<BoardingAppointmentEntity> findByBoardingEntity_Business_Id(Integer businessId);
    List<BoardingAppointmentEntity> findByDogId(Integer dogId);
    List<BoardingAppointmentEntity> findAllByBoardingEntity_Business_IdAndDateBetween(Integer businessId, LocalDate startDate, LocalDate endDate);

}