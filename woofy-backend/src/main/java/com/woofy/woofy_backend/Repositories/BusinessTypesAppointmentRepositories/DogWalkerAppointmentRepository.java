package com.woofy.woofy_backend.Repositories.BusinessTypesAppointmentRepositories;

import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.DogWalkerAppointmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DogWalkerAppointmentRepository extends JpaRepository<DogWalkerAppointmentEntity, Integer> {
    List<DogWalkerAppointmentEntity> findByDogWalkerEntity_Business_Id(Integer businessId);
    List<DogWalkerAppointmentEntity> findByDogId(Integer dogId);
}