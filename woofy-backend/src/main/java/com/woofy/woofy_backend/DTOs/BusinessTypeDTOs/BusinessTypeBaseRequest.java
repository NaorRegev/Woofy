package com.woofy.woofy_backend.DTOs.BusinessTypeDTOs;

import com.woofy.woofy_backend.Models.Enums.BusinessTypeEnum;
import com.woofy.woofy_backend.Models.Enums.DogEnums.DogSizeEnum;
import com.woofy.woofy_backend.Models.Enums.WorkingDaysEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessTypeBaseRequest {

    @Enumerated(EnumType.STRING)
    private List<DogSizeEnum> acceptableDogSizes;
    private BusinessTypeEnum businessTypes;
    private String dogCapacity;
    private String price;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    @Enumerated(EnumType.STRING)
    private List<WorkingDaysEnum> workingDays;
    private String about;

}
