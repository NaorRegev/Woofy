package com.woofy.woofy_backend.Repositories.BusinessTypesScheduleRepositories;

import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.BoardingScheduleEntity;
import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.DogWalkerScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface DogWalkerScheduleRepository extends JpaRepository<DogWalkerScheduleEntity, Integer> {
    Optional<DogWalkerScheduleEntity> findByDateAndStartTimeAndEndTime(LocalDate date, LocalTime startTime, LocalTime endTime);
    Optional<DogWalkerScheduleEntity> findByDate(LocalDate date);
    Optional<List<DogWalkerScheduleEntity>> findAllByDogWalkerEntity_Business_IdAndDate(Integer businessId, LocalDate date);
}