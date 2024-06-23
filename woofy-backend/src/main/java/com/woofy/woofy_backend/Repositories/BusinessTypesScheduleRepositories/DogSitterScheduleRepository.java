package com.woofy.woofy_backend.Repositories.BusinessTypesScheduleRepositories;

import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.DogSitterScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface DogSitterScheduleRepository extends JpaRepository<DogSitterScheduleEntity, Integer> {
    Optional<DogSitterScheduleEntity> findByDateAndStartTimeAndEndTime(LocalDate date, LocalTime startTime, LocalTime endTime);
    Optional<List<DogSitterScheduleEntity>> findAllByDate(LocalDate date);
    Optional<List<DogSitterScheduleEntity>> findAllByDogSitterEntity_Business_IdAndDate(Integer businessId,LocalDate date);

}