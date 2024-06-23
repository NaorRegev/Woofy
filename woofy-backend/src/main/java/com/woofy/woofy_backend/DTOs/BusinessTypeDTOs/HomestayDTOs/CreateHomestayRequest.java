package com.woofy.woofy_backend.DTOs.BusinessTypeDTOs.HomestayDTOs;

import com.woofy.woofy_backend.DTOs.BusinessTypeDTOs.BusinessTypeBaseRequest;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateHomestayRequest extends BusinessTypeBaseRequest {
    private String appointmentLengthInMinutes;
}
