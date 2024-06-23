package com.woofy.woofy_backend.Services.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class GeoLocation {
    private double lat;
    private double lon;
}