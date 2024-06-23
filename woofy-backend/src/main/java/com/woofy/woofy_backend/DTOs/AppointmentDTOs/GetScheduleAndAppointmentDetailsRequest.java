package com.woofy.woofy_backend.DTOs.AppointmentDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class GetScheduleAndAppointmentDetailsRequest {
    private Integer BusinessId;
    private LocalDate date;
    private LocalDate startDate;
    private LocalDate endDate;
}
