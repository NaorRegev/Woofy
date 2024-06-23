package com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.DayCareAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessEntity;
import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.DayCareScheduleEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "day_care")
public class DayCareEntity extends StayAtBusinessBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "day_care_id", nullable = false)
    private Integer id;

    @JsonBackReference
    @OneToOne
    @MapsId
    @JoinColumn(name = "business_id")
    private BusinessEntity business;

    @JsonManagedReference
    @OneToMany(mappedBy = "dayCareEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DayCareAppointmentEntity> dayCareAppointmentEntities;

    @JsonManagedReference
    @OneToMany(mappedBy = "dayCareEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DayCareScheduleEntity> dayCareScheduleEntities;
}