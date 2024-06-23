package com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness.DayCareEntity;
import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BaseScheduleEntity;
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
@Table(name = "day_care_schedule")
public class DayCareScheduleEntity extends BaseScheduleEntity {

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "day_care_id")
    private DayCareEntity dayCareEntity;
}
