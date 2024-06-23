package com.woofy.woofy_backend.Services.BusinessTypesAppointmentsServices;

import com.woofy.woofy_backend.DTOs.AppointmentDTOs.GetAppointmentsRequestDTO;
import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BaseAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.BoardingAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.DayCareAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.DogSitterAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.AppointmentEntities.BusinessTypesAppointmentEntities.DogWalkerAppointmentEntity;
import com.woofy.woofy_backend.Models.Entities.BusinessEntities.BusinessEntity;
import com.woofy.woofy_backend.Models.Enums.BusinessTypeEnum;
import com.woofy.woofy_backend.Repositories.BusinessTypesAppointmentRepositories.*;
import com.woofy.woofy_backend.Repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class BaseAppointmentsService {

    @Autowired
    private BoardingAppointmentRepository boardingAppointmentRepository;

    @Autowired
    private DayCareAppointmentRepository dayCareAppointmentRepository;

    @Autowired
    private DogSitterAppointmentRepository dogSitterAppointmentRepository;

    @Autowired
    private DogWalkerAppointmentRepository dogWalkerAppointmentRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public List<GetAppointmentsRequestDTO> findAllAppointmentsByDogId(Integer dogId) {
        List<GetAppointmentsRequestDTO> appointments = new ArrayList<>();
        appointments.addAll(mapToDTO(boardingAppointmentRepository.findByDogId(dogId)));
        appointments.addAll(mapToDTO(dayCareAppointmentRepository.findByDogId(dogId)));
        appointments.addAll(mapToDTO(dogSitterAppointmentRepository.findByDogId(dogId)));
        appointments.addAll(mapToDTO(dogWalkerAppointmentRepository.findByDogId(dogId)));
        return appointments;
    }

    public List<GetAppointmentsRequestDTO> findAllAppointmentsByBusinessId(Integer businessId) {
        List<GetAppointmentsRequestDTO> appointments = new ArrayList<>();
        appointments.addAll(mapToDTO(boardingAppointmentRepository.findByBoardingEntity_Business_Id(businessId)));
        appointments.addAll(mapToDTO(dayCareAppointmentRepository.findByDayCareEntity_Business_Id(businessId)));
        appointments.addAll(mapToDTO(dogSitterAppointmentRepository.findByDogSitterEntity_Business_Id(businessId)));
        appointments.addAll(mapToDTO(dogWalkerAppointmentRepository.findByDogWalkerEntity_Business_Id(businessId)));
        return appointments;
    }

    private List<GetAppointmentsRequestDTO> mapToDTO(List<? extends BaseAppointmentEntity> baseAppointmentEntities) {
        List<GetAppointmentsRequestDTO> dtos = new ArrayList<>();
        for (BaseAppointmentEntity baseAppointmentEntity : baseAppointmentEntities) {
            GetAppointmentsRequestDTO dto = new GetAppointmentsRequestDTO();
            BusinessEntity businessEntity = null;

            if (baseAppointmentEntity instanceof DayCareAppointmentEntity dayCareAppointmentEntity) {
                if (dayCareAppointmentEntity.getDayCareEntity() != null) {
                    businessEntity = dayCareAppointmentEntity.getDayCareEntity().getBusiness();
                    dto.setBusinessType(BusinessTypeEnum.DAY_CARE);
                }
            } else if (baseAppointmentEntity instanceof BoardingAppointmentEntity boardingAppointmentEntity) {
                if (boardingAppointmentEntity.getBoardingEntity() != null) {
                    businessEntity = boardingAppointmentEntity.getBoardingEntity().getBusiness();
                    dto.setBusinessType(BusinessTypeEnum.BOARDING);
                    dto.setEndDate(boardingAppointmentEntity.getEndDate());
                }
            } else if (baseAppointmentEntity instanceof DogSitterAppointmentEntity dogSitterAppointmentEntity) {
                if (dogSitterAppointmentEntity.getDogSitterEntity() != null) {
                    businessEntity = dogSitterAppointmentEntity.getDogSitterEntity().getBusiness();
                    dto.setBusinessType(BusinessTypeEnum.DOG_SITTER);
                }
            } else if (baseAppointmentEntity instanceof DogWalkerAppointmentEntity dogWalkerAppointmentEntity) {
                if (dogWalkerAppointmentEntity.getDogWalkerEntity() != null) {
                    businessEntity = dogWalkerAppointmentEntity.getDogWalkerEntity().getBusiness();
                    dto.setBusinessType(BusinessTypeEnum.DOG_WALK);
                }
            }

            if (businessEntity != null) {
                dto.setAppointmentId(baseAppointmentEntity.getId());
                dto.setBusinessId(businessEntity.getId());
                dto.setBusinessName(businessEntity.getBusinessName());
                dto.setUserId(customerRepository.findByDogId(baseAppointmentEntity.getDogId()).getId());
                dto.setCustomerName(customerRepository.findByDogId(baseAppointmentEntity.getDogId()).getFullName());
                dto.setAddress(businessEntity.getAddress());
                dto.setCity(businessEntity.getCity());
                dto.setDate(baseAppointmentEntity.getDate());
                dto.setStartTime(baseAppointmentEntity.getStartTime());
                dto.setEndTime(baseAppointmentEntity.getEndTime());
                dto.setBusinessProfilePhotoID(businessEntity.getProfilePhotoID());
                dto.setCustomerProfilePhotoID(customerRepository.findByDogId(baseAppointmentEntity.getDogId()).getProfilePhotoID());
                dto.setServiceImageIDs(businessEntity.getImages().toArray(new Integer[0]));
                dtos.add(dto);
            }
        }
        return dtos;
    }
}
