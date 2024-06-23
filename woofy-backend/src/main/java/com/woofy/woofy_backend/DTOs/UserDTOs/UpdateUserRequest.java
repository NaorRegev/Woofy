package com.woofy.woofy_backend.DTOs.UserDTOs;

import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public class UpdateUserRequest {
    @Email(message = "Email should be valid")
    private String email;
    @Pattern(regexp="(^$|[0-9]{10})", message="Phone number must be exactly 10 digits long")
    private String phoneNumber;
    private String address;
    private String city;
    private String zipCode;
    private Integer profilePhotoId;
    private String password;
    private String firstName;
    private String lastName;
}
