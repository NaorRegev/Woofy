package com.woofy.woofy_backend.Repositories.Reviews;

import com.woofy.woofy_backend.Models.Entities.Reviews.ReviewsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewsRepository extends JpaRepository<ReviewsEntity, Integer> {
    List<ReviewsEntity> findByBusinessId(Integer businessId);
}