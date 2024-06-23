package com.woofy.woofy_backend.Repositories;

import com.woofy.woofy_backend.Models.Entities.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity,Integer> {
}
