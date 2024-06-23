package com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.Homestay.DogWalkerEntity;
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
@Table(name = "dog_walker_schedule")
public class DogWalkerScheduleEntity extends BaseTimedScheduleEntity {

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "dog_walker_id")
    private DogWalkerEntity dogWalkerEntity;
}
