package com.woofy.woofy_backend.Repositories.BusinessTypesScheduleRepositories;

import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.BoardingScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BoardingScheduleRepository extends JpaRepository<BoardingScheduleEntity, Integer> {
    Optional<BoardingScheduleEntity> findByDate(LocalDate date);
    Optional<BoardingScheduleEntity> findByBoardingEntity_Business_IdAndDate(Integer businessId, LocalDate date);
    List<BoardingScheduleEntity> findAllByBoardingEntity_Business_IdAndDateBetween(Integer businessId, LocalDate startDate, LocalDate endDate);

}