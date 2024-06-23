package com.woofy.woofy_backend.Repositories.BusinessTypesRepositories;

import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness.BoardingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardingRepository extends JpaRepository<BoardingEntity, Integer> {
    BoardingEntity findByBusiness_Id(Integer businessId);
}