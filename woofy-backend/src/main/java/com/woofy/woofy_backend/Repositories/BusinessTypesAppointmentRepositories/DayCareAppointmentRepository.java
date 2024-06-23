package com.woofy.woofy_backend.Repositories.BusinessTypesAppointmentRepositories;

import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.DayCareAppointmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DayCareAppointmentRepository extends JpaRepository<DayCareAppointmentEntity, Integer> {
    List<DayCareAppointmentEntity> findByDayCareEntity_Business_Id(Integer businessId);
    List<DayCareAppointmentEntity> findByDogId(Integer dogId);
}