package com.woofy.woofy_backend.Models.Entities.Reviews;

import com.woofy.woofy_backend.Models.Enums.BusinessTypeEnum;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Data
@Table(name = "reviews")
public class ReviewsEntity {

    @Id
    @GeneratedValue
    @Column(name = "review_id", nullable = false)
    private Integer reviewId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "business_id")
    private Integer businessId;

    @Column(name = "review")
    private String review;

    @Column(name = "rating") // Should be 1/2/3/4/5
    private Integer rating;

    @Column(name = "service_type")
    private BusinessTypeEnum serviceType;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;
}