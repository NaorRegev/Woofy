package com.woofy.woofy_backend.Repositories.BusinessTypesScheduleRepositories;

import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.BoardingScheduleEntity;
import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.DayCareScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DayCareScheduleRepository extends JpaRepository<DayCareScheduleEntity, Integer> {
    Optional<DayCareScheduleEntity> findByDate(LocalDate date);
    Optional<DayCareScheduleEntity> findByDayCareEntity_Business_IdAndDate(Integer businessId, LocalDate date);

}
