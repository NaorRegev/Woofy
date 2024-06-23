package com.woofy.woofy_backend.Services.BusinessTypesServices;

import com.woofy.woofy_backend.DTOs.BusinessTypeDTOs.HomestayDTOs.DogSitterDTOs.CreateOrUpdateDogSitterRequest;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.Homestay.DogSitterEntity;
import com.woofy.woofy_backend.Repositories.BusinessTypesRepositories.DogSitterRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DogSitterService {

    @Autowired
    private BusinessTypeService businessTypeService;

    @Autowired
    private DogSitterRepository dogSitterRepository;

    public DogSitterEntity createDogSitter(CreateOrUpdateDogSitterRequest request, Integer businessId) {
        DogSitterEntity dogSitterEntity = new DogSitterEntity();
        dogSitterEntity.setAppointmentLengthInMinutes(Integer.parseInt(request.getAppointmentLengthInMinutes()));
        businessTypeService.create(request, businessId, dogSitterEntity);
        return dogSitterRepository.save(dogSitterEntity);
    }

    public void deleteDogSitter(Integer id) {
        dogSitterRepository.deleteById(id);
    }

    public DogSitterEntity editDogSitter(CreateOrUpdateDogSitterRequest request, Integer id) {
        Optional<DogSitterEntity> optionalDogSitter = dogSitterRepository.findById(id);
        if (optionalDogSitter.isPresent()) {
            DogSitterEntity dogSitterEntity = optionalDogSitter.get();

            //TODO EXTRACT COMMON FIELDS TO BUSINESS TYPE SERVICE
            if (request.getAppointmentLengthInMinutes() != null) {
                dogSitterEntity.setAppointmentLengthInMinutes(Integer.parseInt(request.getAppointmentLengthInMinutes()));
            }
            if (request.getAcceptableDogSizes() != null) {
                dogSitterEntity.setAcceptableDogSizes(request.getAcceptableDogSizes());
            }
            if (request.getPrice() != null) {
                dogSitterEntity.setPrice(Integer.parseInt(request.getPrice()));
            }
            if (request.getStartDate() != null) {
                dogSitterEntity.setStartDate(request.getStartDate());
            }
            if (request.getEndDate() != null) {
                dogSitterEntity.setEndDate(request.getEndDate());
            }
            if (request.getStartTime() != null) {
                dogSitterEntity.setStartTime(request.getStartTime());
            }
            if (request.getEndTime() != null) {
                dogSitterEntity.setEndTime(request.getEndTime());
            }
            if (request.getWorkingDays() != null) {
                dogSitterEntity.setWorkingDays(request.getWorkingDays());
            }
            if (request.getAbout() != null) {
                dogSitterEntity.setAbout(request.getAbout());
            }if (request.getAcceptableDogSizes() != null) {
                dogSitterEntity.setAcceptableDogSizes(request.getAcceptableDogSizes());
            }
            if (request.getPrice() != null) {
                dogSitterEntity.setPrice(Integer.parseInt(request.getPrice()));
            }
            if (request.getStartDate() != null) {
                dogSitterEntity.setStartDate(request.getStartDate());
            }
            if (request.getEndDate() != null) {
                dogSitterEntity.setEndDate(request.getEndDate());
            }
            if (request.getStartTime() != null) {
                dogSitterEntity.setStartTime(request.getStartTime());
            }
            if (request.getEndTime() != null) {
                dogSitterEntity.setEndTime(request.getEndTime());
            }
            if (request.getWorkingDays() != null) {
                dogSitterEntity.setWorkingDays(request.getWorkingDays());
            }
            if (request.getAbout() != null) {
                dogSitterEntity.setAbout(request.getAbout());
            }
            return dogSitterRepository.save(dogSitterEntity);
        } else {
            throw new EntityNotFoundException("DogSitterEntity with ID " + id + " not found.");
        }
    }
}