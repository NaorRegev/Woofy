package com.woofy.woofy_backend.Repositories;

import com.woofy.woofy_backend.Models.Entities.DogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogRepository extends JpaRepository<DogEntity, Integer> {
    // find by customer id
    DogEntity findByOwner_Id(Integer customerId);
}
