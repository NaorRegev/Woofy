package com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BaseAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessEntity;
import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BaseScheduleEntity;
import com.woofy.woofy_backend.Models.Enums.DogEnums.DogSizeEnum;
import com.woofy.woofy_backend.Models.Enums.WorkingDaysEnum;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;


@Data
@MappedSuperclass
public class BusinessTypeBaseEntity {

    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "business_id", nullable = false)
    private BusinessEntity business;

    @Enumerated(EnumType.STRING)
    @Column(name = "acceptable_dog_sizes", nullable = false)
    private List<DogSizeEnum> acceptableDogSizes;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "working_days", nullable = false)
    private List<WorkingDaysEnum> workingDays;

    @Column(name = "about", length = 2000)
    private String about;


}
