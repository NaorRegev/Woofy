// BoardingAppointmentEntity.java
package com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BaseAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness.BoardingEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "boarding_appointments")
public class BoardingAppointmentEntity extends BaseAppointmentEntity {

    @Column(nullable = false)
    private LocalDate endDate;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "boarding_id")
    private BoardingEntity boardingEntity;

}