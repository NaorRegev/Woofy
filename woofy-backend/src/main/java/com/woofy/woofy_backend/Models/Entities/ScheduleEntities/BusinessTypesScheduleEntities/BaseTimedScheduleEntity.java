package com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities;

import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BaseScheduleEntity;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class BaseTimedScheduleEntity extends BaseScheduleEntity {

    @Column(name = "startTime", nullable = false)
    private LocalTime startTime;

    @Column(name = "endTime", nullable = false)
    private LocalTime endTime;
}
