package com.woofy.woofy_backend.Services.BusinessTypesServices;

import com.woofy.woofy_backend.DTOs.BusinessTypeDTOs.StayAtBusinessDTOs.DayCareDTOs.CreateOrEditDayCareRequest;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.StayAtBusiness.DayCareEntity;
import com.woofy.woofy_backend.Repositories.BusinessTypesRepositories.DayCareRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DayCareService {

    @Autowired
    private BusinessTypeService businessTypeService;

    @Autowired
    private DayCareRepository dayCareRepository;

    public DayCareEntity createDayCare(CreateOrEditDayCareRequest request, Integer businessId) {
        DayCareEntity dayCareEntity = new DayCareEntity();
        dayCareEntity.setHomeConditions(request.getHomeConditions());
        dayCareEntity.setPetsInHome(request.getPetsInHome());
        dayCareEntity.setDogCapacity(Integer.parseInt(request.getDogCapacity()));
        businessTypeService.create(request, businessId, dayCareEntity);
        return dayCareRepository.save(dayCareEntity);
    }

    public DayCareEntity editDayCare(CreateOrEditDayCareRequest request, Integer id) {
        Optional<DayCareEntity> optionalDayCare = dayCareRepository.findById(id);
        if (optionalDayCare.isPresent()) {
            DayCareEntity dayCareEntity = optionalDayCare.get();
            //TODO EXTRACT COMMON FIELDS TO BUSINESS TYPE SERVICE

            if (request.getHomeConditions() != null) {
                dayCareEntity.setHomeConditions(request.getHomeConditions());
            }
            if (request.getPetsInHome() != null) {
                dayCareEntity.setPetsInHome(request.getPetsInHome());
            }
            if (request.getDogCapacity() != null) {
                dayCareEntity.setDogCapacity(Integer.parseInt(request.getDogCapacity()));
            }
            if (request.getAcceptableDogSizes() != null) {
                dayCareEntity.setAcceptableDogSizes(request.getAcceptableDogSizes());
            }
            if (request.getPrice() != null) {
                dayCareEntity.setPrice(Integer.parseInt(request.getPrice()));
            }
            if (request.getStartDate() != null) {
                dayCareEntity.setStartDate(request.getStartDate());
            }
            if (request.getEndDate() != null) {
                dayCareEntity.setEndDate(request.getEndDate());
            }
            if (request.getStartTime() != null) {
                dayCareEntity.setStartTime(request.getStartTime());
            }
            if (request.getEndTime() != null) {
                dayCareEntity.setEndTime(request.getEndTime());
            }
            if (request.getWorkingDays() != null) {
                dayCareEntity.setWorkingDays(request.getWorkingDays());
            }
            if (request.getAbout() != null) {
                dayCareEntity.setAbout(request.getAbout());
            }
            return dayCareRepository.save(dayCareEntity);
        } else {
            throw new EntityNotFoundException("DayCareEntity with ID " + id + " not found.");
        }
    }

    public void deleteDayCare(Integer id) {
        dayCareRepository.deleteById(id);
    }
}