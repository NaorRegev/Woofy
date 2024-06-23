package com.woofy.woofy_backend.Services.BusinessTypesServices;

import com.woofy.woofy_backend.DTOs.BusinessTypeDTOs.HomestayDTOs.DogWalkerDTOs.CreateOrUpdateDogWalkerRequest;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessTypesEntities.Homestay.DogWalkerEntity;
import com.woofy.woofy_backend.Repositories.BusinessTypesRepositories.DogWalkerRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DogWalkerService {

    @Autowired
    private BusinessTypeService businessTypeService;

    @Autowired
    private DogWalkerRepository dogWalkerRepository;

    public DogWalkerEntity createDogWalker(CreateOrUpdateDogWalkerRequest request, Integer businessId) {
        DogWalkerEntity dogWalkerEntity = new DogWalkerEntity();
        dogWalkerEntity.setAppointmentLengthInMinutes(Integer.parseInt(request.getAppointmentLengthInMinutes()));
        businessTypeService.create(request, businessId, dogWalkerEntity);
        return dogWalkerRepository.save(dogWalkerEntity);
    }

    public DogWalkerEntity editDogWalker(CreateOrUpdateDogWalkerRequest request, Integer id) {
        Optional<DogWalkerEntity> optionalDogWalker = dogWalkerRepository.findById(id);
        if (optionalDogWalker.isPresent()) {
            DogWalkerEntity dogWalkerEntity = optionalDogWalker.get();

            //TODO EXTRACT COMMON FIELDS TO BUSINESS TYPE SERVICE
            if (request.getAppointmentLengthInMinutes() != null) {
                dogWalkerEntity.setAppointmentLengthInMinutes(Integer.parseInt(request.getAppointmentLengthInMinutes()));
            }
            if (request.getAcceptableDogSizes() != null) {
                dogWalkerEntity.setAcceptableDogSizes(request.getAcceptableDogSizes());
            }
            if (request.getPrice() != null) {
                dogWalkerEntity.setPrice(Integer.parseInt(request.getPrice()));
            }
            if (request.getStartDate() != null) {
                dogWalkerEntity.setStartDate(request.getStartDate());
            }
            if (request.getEndDate() != null) {
                dogWalkerEntity.setEndDate(request.getEndDate());
            }
            if (request.getStartTime() != null) {
                dogWalkerEntity.setStartTime(request.getStartTime());
            }
            if (request.getEndTime() != null) {
                dogWalkerEntity.setEndTime(request.getEndTime());
            }
            if (request.getWorkingDays() != null) {
                dogWalkerEntity.setWorkingDays(request.getWorkingDays());
            }
            if (request.getAbout() != null) {
                dogWalkerEntity.setAbout(request.getAbout());
            }if (request.getAcceptableDogSizes() != null) {
                dogWalkerEntity.setAcceptableDogSizes(request.getAcceptableDogSizes());
            }
            if (request.getPrice() != null) {
                dogWalkerEntity.setPrice(Integer.parseInt(request.getPrice()));
            }
            if (request.getStartDate() != null) {
                dogWalkerEntity.setStartDate(request.getStartDate());
            }
            if (request.getEndDate() != null) {
                dogWalkerEntity.setEndDate(request.getEndDate());
            }
            if (request.getStartTime() != null) {
                dogWalkerEntity.setStartTime(request.getStartTime());
            }
            if (request.getEndTime() != null) {
                dogWalkerEntity.setEndTime(request.getEndTime());
            }
            if (request.getWorkingDays() != null) {
                dogWalkerEntity.setWorkingDays(request.getWorkingDays());
            }
            if (request.getAbout() != null) {
                dogWalkerEntity.setAbout(request.getAbout());
            }
            return dogWalkerRepository.save(dogWalkerEntity);
        } else {
            throw new EntityNotFoundException("DogWalkerEntity with ID " + id + " not found.");
        }
    }

    public void deleteDogWalker(Integer id) {
        dogWalkerRepository.deleteById(id);
    }
}