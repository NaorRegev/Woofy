package com.woofy.woofy_backend.DTOs.UserDTOs;

import com.woofy.woofy_backend.Models.Enums.BusinessTypeEnum;
import com.woofy.woofy_backend.Models.Enums.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSummaryDTO {
    private Integer id;
    private String businessName;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String address;
    private String city;
    private String zipCode;
    private RoleEnum role;
    Integer profilePhotoID;
}
