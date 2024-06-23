package com.woofy.woofy_backend.Repositories;

import java.util.List;
import java.util.Optional;

import com.woofy.woofy_backend.Models.Entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByPhoneNumber(String phoneNumber);

}