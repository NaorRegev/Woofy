package com.woofy.woofy_backend.Models.Entities.Notifications;

import com.woofy.woofy_backend.Models.Entities.BaseEntity;
import jakarta.persistence.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "notifications")
public class NotificationEntity extends BaseEntity {

    @Column(name = "user_id")
    private Integer userId;
    private String title;
    private String description;
    private String type;
    private boolean isUnRead;


}
