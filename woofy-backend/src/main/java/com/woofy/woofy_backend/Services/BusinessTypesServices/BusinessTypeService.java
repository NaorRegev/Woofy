package com.woofy.woofy_backend.Services.BusinessTypesServices;

import com.woofy.woofy_backend.DTOs.BusinessTypeDTOs.BusinessTypeBaseRequest;
import com.woofy.woofy_backend.DTOs.BusinessTypeDTOs.HomestayDTOs.CreateHomestayRequest;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.BusinessTypeBaseEntity;
import com.woofy.woofy_backend.Models.Enums.BusinessTypeEnum;
import com.woofy.woofy_backend.Repositories.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BusinessTypeService {

    @Autowired
    private BusinessRepository businessRepository;

    public BusinessTypeBaseEntity create(BusinessTypeBaseRequest  request, Integer businessId, BusinessTypeBaseEntity entity) {
        BusinessEntity business = businessRepository.findById(businessId)
                .orElseThrow(() -> new RuntimeException("Business not found"));

        List<BusinessTypeEnum> businessTypes = new ArrayList<>(business.getBusinessTypes());
        if (businessTypes.contains(request.getBusinessTypes())) {
            throw new RuntimeException("Business type already exists");
        }
        businessTypes.add(request.getBusinessTypes());
        business.setBusinessTypes(businessTypes);

        entity.setBusiness(business);
        entity.setAcceptableDogSizes(request.getAcceptableDogSizes());
        entity.setPrice(Integer.parseInt(request.getPrice()));
        entity.setStartDate(request.getStartDate());
        entity.setEndDate(request.getEndDate());
        entity.setStartTime(request.getStartTime());
        entity.setEndTime(request.getEndTime());
        entity.setWorkingDays(request.getWorkingDays());
        entity.setAbout(request.getAbout());
        return entity;
    }
}