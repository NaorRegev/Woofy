package com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.BoardingAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessEntity;
import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.BoardingScheduleEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "boarding")
public class BoardingEntity extends StayAtBusinessBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "boarding_id", nullable = false)
    private Integer id;

    @JsonBackReference
    @OneToOne
    @MapsId
    @JoinColumn(name = "business_id")
    private BusinessEntity business;

    @JsonManagedReference
    @OneToMany(mappedBy = "boardingEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BoardingAppointmentEntity> boardingAppointmentEntities;

    @JsonManagedReference
    @OneToMany(mappedBy = "boardingEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BoardingScheduleEntity> boardingScheduleEntities;
}