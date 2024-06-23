package com.woofy.woofy_backend.Repositories;

import com.woofy.woofy_backend.Models.Entities.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Integer> {
    CustomerEntity findByDogId(Integer dogId);
}