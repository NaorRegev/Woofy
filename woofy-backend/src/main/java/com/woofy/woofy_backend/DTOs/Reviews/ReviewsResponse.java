package com.woofy.woofy_backend.DTOs.Reviews;

import com.woofy.woofy_backend.Models.Enums.BusinessTypeEnum;
import lombok.Data;

@Data
public class ReviewsResponse {
    private Integer reviewId;
    private Integer userId;
    private Integer businessId;
    private String review;
    private Integer rating;
    private String createdAt;
    private BusinessTypeEnum serviceType;
}