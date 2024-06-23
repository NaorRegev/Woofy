package com.woofy.woofy_backend.Repositories.BusinessTypesRepositories;

import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.Homestay.DogWalkerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogWalkerRepository extends JpaRepository<DogWalkerEntity, Integer> {
    DogWalkerEntity findByBusiness_Id(Integer businessId);
}