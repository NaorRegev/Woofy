package com.woofy.woofy_backend.Services;// In BusinessService.java

import com.woofy.woofy_backend.DTOs.BusinessDTOs.BusinessUserSummaryDTO;
import com.woofy.woofy_backend.DTOs.BusinessDTOs.UpdateBusinessRequest;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessEntity;
import com.woofy.woofy_backend.Models.Entities.ImageEntity;
import com.woofy.woofy_backend.Models.Enums.RoleEnum;
import com.woofy.woofy_backend.Repositories.BusinessRepository;
import com.woofy.woofy_backend.Repositories.ImageRepository;
import com.woofy.woofy_backend.Services.Map.GeocodingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BusinessService {

    private final BusinessRepository businessRepository;
    private final GeocodingService geocodingService;
    private final ImageRepository imageRepository;

    @Autowired
    public BusinessService(BusinessRepository businessRepository, GeocodingService geocodingService, ImageRepository imageRepository) {
        this.businessRepository = businessRepository;
        this.geocodingService = geocodingService;
        this.imageRepository = imageRepository;
    }

    public ResponseEntity<?> updateBusiness(Integer businessId, UpdateBusinessRequest request) {
        BusinessEntity business = businessRepository.findById(businessId)
                .orElseThrow(() -> new RuntimeException("Business not found"));

        if (request.getBusinessName() != null) {
            business.setBusinessName(request.getBusinessName());
        }
        if (request.getImages() != null) {
            business.setImages(request.getImages());
        }

        businessRepository.save(business);

        return ResponseEntity.ok("Business updated successfully");
    }

    public BusinessEntity getBusiness(Integer businessId) {
        return businessRepository.findById(businessId)
                .orElseThrow(() -> new RuntimeException("Business not found with id " + businessId));
    }

    public List<BusinessUserSummaryDTO> getAllBusinessUsersSummary() {
        return businessRepository.findAll().stream()
                .filter(businessEntity -> businessEntity.getRole() == RoleEnum.BUSINESS)
                .map(this::mapToBusinessUserSummaryDTO)
                .collect(Collectors.toList());
    }

    public BusinessUserSummaryDTO mapToBusinessUserSummaryDTO(BusinessEntity businessEntity) {
        BusinessUserSummaryDTO dto = new BusinessUserSummaryDTO();
        dto.setId(businessEntity.getId());
        dto.setFirstName(businessEntity.getFirstName());
        dto.setLastName(businessEntity.getLastName());
        dto.setPhoneNumber(businessEntity.getPhoneNumber());
        dto.setAddress(businessEntity.getAddress());
        dto.setCity(businessEntity.getCity());
        dto.setAbout(businessEntity.getAbout());
        dto.setBusinessName(businessEntity.getBusinessName());
        dto.setSocialMedia(businessEntity.getSocialMedia());
        dto.setWebsite(businessEntity.getWebsite());
        dto.setLat(businessEntity.getLat());
        dto.setLon(businessEntity.getLon());
        dto.setBusinessTypes(businessEntity.getBusinessTypes());
        dto.setProfilePhotoID(businessEntity.getProfilePhotoID());
        dto.setImages(businessEntity.getImages());
        Optional.ofNullable(businessEntity.getDogSitterEntity()).ifPresent(dto::setDogSitterEntity);
        Optional.ofNullable(businessEntity.getBoardingEntity()).ifPresent(dto::setBoardingEntity);
        Optional.ofNullable(businessEntity.getDayCareEntity()).ifPresent(dto::setDayCareEntity);
        Optional.ofNullable(businessEntity.getDogWalkerEntity()).ifPresent(dto::setDogWalkerEntity);

        return dto;
    }

    public void updateBusinessImages(Integer businessId, List<Integer> imageIds) {
        BusinessEntity businessEntity = businessRepository.findById(businessId).orElseThrow(() -> new RuntimeException("Dog not found"));
        List<ImageEntity> images = imageRepository.findAllById(imageIds);

        List<Integer> imageIdList = new ArrayList<>();
        for (ImageEntity image : images) {
            imageIdList.add(image.getImageID());
        }

        businessEntity.setImages(imageIdList);
        businessRepository.save(businessEntity);
    }

    public void deleteBusiness(Integer id) {
        businessRepository.deleteById(id);
    }


}