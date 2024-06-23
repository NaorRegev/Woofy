package com.woofy.woofy_backend.DTOs.Reviews;


import com.woofy.woofy_backend.Models.Enums.BusinessTypeEnum;
import lombok.Data;

@Data
public class CreateReviewRequest {
    private Integer userId;
    private Integer BusinessId;
    private String review;
    private Integer rating;
    private BusinessTypeEnum serviceType;
}
