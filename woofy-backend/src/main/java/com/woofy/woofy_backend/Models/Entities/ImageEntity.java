package com.woofy.woofy_backend.Models.Entities;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "image_table")
@Getter
@Setter
@Builder
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer imageID;

    private String imageName;

    private String type;

    @Lob
    @Column(name = "picByte", length = 5000)
    private byte[] picByte;


    public ImageEntity() {

    }

    public ImageEntity(Integer imageID, String imageName, String type, byte[] picByte) {
        this.imageID = imageID;
        this.imageName = imageName;
        this.type = type;
        this.picByte = picByte;
    }
}
