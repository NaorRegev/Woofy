package com.woofy.woofy_backend.DTOs.BusinessTypeDTOs.StayAtBusinessDTOs;

import com.woofy.woofy_backend.DTOs.BusinessTypeDTOs.BusinessTypeBaseRequest;
import com.woofy.woofy_backend.Models.Enums.HomeConditionsEnum;
import com.woofy.woofy_backend.Models.Enums.PetsInHomeEnum;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CreateOrEditStayAtBusinessRequest extends BusinessTypeBaseRequest {
    private List<HomeConditionsEnum> homeConditions;
    private List<PetsInHomeEnum> petsInHome;
    private String dogCapacity;
}
