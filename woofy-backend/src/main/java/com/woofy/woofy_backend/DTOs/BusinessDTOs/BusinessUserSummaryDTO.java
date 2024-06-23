package com.woofy.woofy_backend.DTOs.BusinessDTOs;

import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.Homestay.DogSitterEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.Homestay.DogWalkerEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness.BoardingEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness.DayCareEntity;
import com.woofy.woofy_backend.Models.Enums.BusinessTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusinessUserSummaryDTO {
    private int id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private String city;
    private String about;
    private String businessName;
    private String socialMedia;
    private String website;
    private List<BusinessTypeEnum> businessTypes;
    private DogSitterEntity dogSitterEntity;
    private DogWalkerEntity dogWalkerEntity;
    private BoardingEntity boardingEntity;
    private DayCareEntity dayCareEntity;
    private double lat;
    private double lon;
    private Integer profilePhotoID;
    private List<Integer> images;
}
