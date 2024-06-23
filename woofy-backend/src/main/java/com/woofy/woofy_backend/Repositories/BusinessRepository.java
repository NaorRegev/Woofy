package com.woofy.woofy_backend.Repositories;

import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessRepository extends JpaRepository<BusinessEntity, Integer> {

}