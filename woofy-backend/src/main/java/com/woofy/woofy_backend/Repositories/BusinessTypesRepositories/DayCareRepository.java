package com.woofy.woofy_backend.Repositories.BusinessTypesRepositories;

import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness.DayCareEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayCareRepository extends JpaRepository<DayCareEntity, Integer> {
    DayCareEntity findByBusiness_Id(Integer businessId);
}
