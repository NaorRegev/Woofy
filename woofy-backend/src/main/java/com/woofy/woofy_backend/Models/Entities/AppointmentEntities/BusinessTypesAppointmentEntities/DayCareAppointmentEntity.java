package com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BaseAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness.DayCareEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "day_care_appointments")
public class DayCareAppointmentEntity extends BaseAppointmentEntity {

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "day_care_id")
    private DayCareEntity dayCareEntity;

}