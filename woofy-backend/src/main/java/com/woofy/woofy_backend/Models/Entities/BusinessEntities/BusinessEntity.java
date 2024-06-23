// BusinessEntity.java
package com.woofy.woofy_backend.Models.Entities.BusinessEntities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.Homestay.DogSitterEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.Homestay.DogWalkerEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness.BoardingEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness.DayCareEntity;
import com.woofy.woofy_backend.Models.Entities.UserEntity;
import com.woofy.woofy_backend.Models.Enums.BusinessTypeEnum;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@SuperBuilder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "business")
public class BusinessEntity extends UserEntity {

    @Column(name = "business_name")
    private String businessName;

    @ElementCollection(targetClass = BusinessTypeEnum.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @Column(name = "business_types")
    private List<BusinessTypeEnum> businessTypes;

    @ToString.Exclude
    @JsonManagedReference
    @OneToOne(mappedBy = "business", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private DogSitterEntity dogSitterEntity;

    @ToString.Exclude
    @JsonManagedReference
    @OneToOne(mappedBy = "business", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private DogWalkerEntity dogWalkerEntity;

    @ToString.Exclude
    @JsonManagedReference
    @OneToOne(mappedBy = "business", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private BoardingEntity boardingEntity;

    @ToString.Exclude
    @JsonManagedReference
    @OneToOne(mappedBy = "business", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private DayCareEntity dayCareEntity;

    @Column(name = "website")
    private String website;

    @Column(name = "social_media")
    private String socialMedia;

    @Column(name = "about", length = 2000)
    private String about;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "business_images", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "image_id")
    private List<Integer> images = new ArrayList<>();

}