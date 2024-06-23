package com.woofy.woofy_backend.DTOs.BusinessDTOs;

import com.woofy.woofy_backend.DTOs.UserDTOs.BaseRegisterRequest;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusinessRegisterRequest extends BaseRegisterRequest {

    @NotEmpty(message = "Business name is required")
    private String businessName;

}
