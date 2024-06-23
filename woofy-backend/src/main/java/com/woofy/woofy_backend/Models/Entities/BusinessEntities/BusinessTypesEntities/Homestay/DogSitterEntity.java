package com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.Homestay;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.DogSitterAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessEntity;
import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.DogSitterScheduleEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dog_sitter")
public class DogSitterEntity extends HomestayBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dog_sitter_id", nullable = false)
    private Integer id;

    @JsonBackReference
    @OneToOne
    @MapsId
    @JoinColumn(name = "business_id")
    private BusinessEntity business;

    @JsonManagedReference
    @OneToMany(mappedBy = "dogSitterEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DogSitterAppointmentEntity> dogSitterAppointmentEntities;


    @JsonManagedReference
    @OneToMany(mappedBy = "dogSitterEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DogSitterScheduleEntity> dogSitterScheduleEntities;
}