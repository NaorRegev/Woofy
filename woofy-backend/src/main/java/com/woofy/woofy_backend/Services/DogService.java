package com.woofy.woofy_backend.Services;

import com.woofy.woofy_backend.DTOs.DogDTOs.DogGetDto;
import com.woofy.woofy_backend.DTOs.DogDTOs.DogRegisterRequest;
import com.woofy.woofy_backend.Models.Entities.CustomerEntity;
import com.woofy.woofy_backend.Models.Entities.DogEntity;
import com.woofy.woofy_backend.Models.Entities.ImageEntity;
import com.woofy.woofy_backend.Repositories.CustomerRepository;
import com.woofy.woofy_backend.Repositories.DogRepository;
import com.woofy.woofy_backend.Repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DogService {
    private final DogRepository dogRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    public DogService(DogRepository dogRepository, CustomerRepository customerRepository) {
        this.dogRepository = dogRepository;
        this.customerRepository = customerRepository;
    }

    public DogEntity createDog(DogRegisterRequest dogDTO, Integer customerId) {
        CustomerEntity customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        DogEntity dog = new DogEntity();
        dog.setDogName(dogDTO.getDogName());
        dog.setDog_breed(dogDTO.getDogBreed());
        dog.setAge(dogDTO.getAge());
        dog.setSize(dogDTO.getSize());
        dog.setTrainingLevel(dogDTO.getTrainingLevel());
        dog.setAbout(dogDTO.getAbout());
        dog.setSpecialRequirements(dogDTO.getSpecialRequirements());
        dog.setImages(null);
        dog.setOwner(customer);

        DogEntity savedDog = dogRepository.save(dog);

        customer.setDog(savedDog);
        customerRepository.save(customer);

        return savedDog;
    }

    public void updateDogDetails(DogRegisterRequest dogDTO, Integer userId) {
        DogEntity dog = dogRepository.findByOwner_Id(userId);
        if (dog == null) {
            throw new RuntimeException("Dog not found");
        }

        if (dogDTO.getDogName() != null) {
            dog.setDogName(dogDTO.getDogName());
        }
        if (dogDTO.getDogBreed() != null) {
            dog.setDog_breed(dogDTO.getDogBreed());
        }
        if (dogDTO.getAge() != null) {
            dog.setAge(dogDTO.getAge());
        }
        if (dogDTO.getSize() != null) {
            dog.setSize(dogDTO.getSize());
        }
        if (dogDTO.getTrainingLevel() != null) {
            dog.setTrainingLevel(dogDTO.getTrainingLevel());
        }
        if (dogDTO.getAbout() != null) {
            dog.setAbout(dogDTO.getAbout());
        }
        if (dogDTO.getSpecialRequirements() != null) {
            dog.setSpecialRequirements(dogDTO.getSpecialRequirements());
        }

        dogRepository.save(dog);
    }

    public void deleteDog(Integer id) {
        DogEntity dog = dogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dog not found"));
        CustomerEntity customer = dog.getOwner();
        customer.setDog(null);
        customerRepository.save(customer);
        dogRepository.deleteById(id);
    }

    public void updateDogImages(Integer dogId, List<Integer> imageIds) {
        DogEntity dog = dogRepository.findById(dogId).orElseThrow(() -> new RuntimeException("Dog not found"));
        List<ImageEntity> images = imageRepository.findAllById(imageIds);

        List<Integer> imageIdList = new ArrayList<>();
        for (ImageEntity image : images) {
            imageIdList.add(image.getImageID());
        }

        dog.setImages(imageIdList);
        dogRepository.save(dog);
    }

    public DogGetDto getDog(Integer id) {
        DogEntity dogEntity = dogRepository.findByOwner_Id(id);
        if(dogEntity == null) {
            return null;
        }
        return mapToDTO(dogEntity);
    }

    private DogGetDto mapToDTO(DogEntity dogEntity) {
        DogGetDto dogDTO = new DogGetDto();
        dogDTO.setDogName(dogEntity.getDogName());
        dogDTO.setDogBreed(dogEntity.getDog_breed());
        dogDTO.setAge(dogEntity.getAge());
        dogDTO.setSize(dogEntity.getSize());
        dogDTO.setTrainingLevel(dogEntity.getTrainingLevel());
        dogDTO.setAbout(dogEntity.getAbout());
        dogDTO.setSpecialRequirements(dogEntity.getSpecialRequirements());
        dogDTO.setPictures(dogEntity.getImages());
        return dogDTO;
    }
}