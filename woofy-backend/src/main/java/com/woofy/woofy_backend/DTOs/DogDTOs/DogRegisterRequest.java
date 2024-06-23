package com.woofy.woofy_backend.DTOs.DogDTOs;

import com.woofy.woofy_backend.Models.Entities.CustomerEntity;
import com.woofy.woofy_backend.Models.Entities.ImageEntity;
import com.woofy.woofy_backend.Models.Enums.DogEnums.DogAgeCategoryEnum;
import com.woofy.woofy_backend.Models.Enums.DogEnums.DogSizeEnum;
import com.woofy.woofy_backend.Models.Enums.DogEnums.DogTrainingEnum;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DogRegisterRequest {
    @NotEmpty
    private String dogName;
    @NotEmpty
    private String dogBreed;
    @Enumerated(EnumType.STRING)
    private DogAgeCategoryEnum age;
    @Enumerated(EnumType.STRING)
    private DogSizeEnum size;
    @Enumerated(EnumType.STRING)
    private DogTrainingEnum trainingLevel;
    private String about;
    private String specialRequirements;
    private List<ImageEntity> pictures;

}
