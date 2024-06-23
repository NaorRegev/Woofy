package com.woofy.woofy_backend.Repositories.BusinessTypesRepositories;

import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.Homestay.DogSitterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogSitterRepository extends JpaRepository<DogSitterEntity, Integer> {
    DogSitterEntity findByBusiness_Id(Integer businessId);

}