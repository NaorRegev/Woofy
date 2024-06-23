package com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.Homestay;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.DogWalkerAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessEntity;
import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.DogWalkerScheduleEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dog_walker")
public class DogWalkerEntity extends HomestayBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dog_walker_id", nullable = false)
    private Integer id;

    @JsonBackReference
    @OneToOne
    @MapsId
    @JoinColumn(name = "business_id")
    private BusinessEntity business;

    @JsonManagedReference
    @OneToMany(mappedBy = "dogWalkerEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DogWalkerAppointmentEntity> dogWalkerAppointmentEntities;

    @JsonManagedReference
    @OneToMany(mappedBy = "dogWalkerEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DogWalkerScheduleEntity> dogWalkerScheduleEntities;
}