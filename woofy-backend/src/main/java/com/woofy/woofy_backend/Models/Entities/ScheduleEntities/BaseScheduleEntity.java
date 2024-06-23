package com.woofy.woofy_backend.Models.Entities.ScheduleEntities;

import com.woofy.woofy_backend.Models.Entities.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class BaseScheduleEntity extends BaseEntity {

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "current_dog_capacity", nullable = false)
    private Integer currentDogCapacity;
}
