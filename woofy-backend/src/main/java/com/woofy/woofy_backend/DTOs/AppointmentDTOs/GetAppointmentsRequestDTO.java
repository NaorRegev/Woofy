package com.woofy.woofy_backend.DTOs.AppointmentDTOs;

import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.BusinessTypeBaseEntity;
import com.woofy.woofy_backend.Models.Enums.BusinessTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAppointmentsRequestDTO {
    private Integer appointmentId;
    private Integer businessId;
    private String businessName;
    private Integer userId;
    private String customerName;
    private BusinessTypeEnum businessType;
    private String address;
    private String city;
    private LocalDate date;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer businessProfilePhotoID;
    private Integer customerProfilePhotoID;
    private Integer[] serviceImageIDs;
}
