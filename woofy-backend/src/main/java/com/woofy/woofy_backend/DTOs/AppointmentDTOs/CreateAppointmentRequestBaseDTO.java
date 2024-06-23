package com.woofy.woofy_backend.DTOs.AppointmentDTOs;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateAppointmentRequestBaseDTO {

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Integer businessId;
}
