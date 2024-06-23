package com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.Homestay;

import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.BusinessTypeBaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@MappedSuperclass
public class HomestayBaseEntity extends BusinessTypeBaseEntity {

    @Column(name = "appointment_length_in_minutes", nullable = false)
    private int appointmentLengthInMinutes;
}
