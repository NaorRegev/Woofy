package com.woofy.woofy_backend.Repositories.BusinessTypesAppointmentRepositories;

import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.DogSitterAppointmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DogSitterAppointmentRepository extends JpaRepository<DogSitterAppointmentEntity, Integer> {
    List<DogSitterAppointmentEntity> findByDogSitterEntity_Business_Id(Integer businessId);
    List<DogSitterAppointmentEntity> findByDogId(Integer dogId);
}