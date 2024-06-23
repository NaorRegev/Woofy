package com.woofy.woofy_backend.DTOs.AppointmentDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
public class CreateDogSitterAppointmentRequest extends CreateHourlyAppointmentBaseDTO {
}
