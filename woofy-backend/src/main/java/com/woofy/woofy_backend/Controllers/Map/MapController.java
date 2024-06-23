package com.woofy.woofy_backend.Controllers.Map;

import com.woofy.woofy_backend.Services.Map.GeoLocation;
import com.woofy.woofy_backend.Services.Map.GeocodingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/map")
public class MapController {

    private final GeocodingService geocodingService;

    @Autowired
    public MapController(GeocodingService geocodingService) {
        this.geocodingService = geocodingService;
    }

    @PostMapping("/geocode")
    public ResponseEntity<GeoLocation> geocodeAddress(@RequestBody String address) {
        GeoLocation geoLocation = geocodingService.geocodeAddress(address);
        if (geoLocation != null) {
            return ResponseEntity.ok(geoLocation);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
