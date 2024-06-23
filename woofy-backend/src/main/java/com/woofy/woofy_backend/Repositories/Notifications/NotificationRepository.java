package com.woofy.woofy_backend.Repositories.Notifications;

import com.woofy.woofy_backend.Models.Entities.Notifications.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Integer> {
    List<NotificationEntity> findByUserId(Integer userId);
}