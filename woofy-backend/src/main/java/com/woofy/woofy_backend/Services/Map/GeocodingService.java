package com.woofy.woofy_backend.Services.Map;

import com.woofy.woofy_backend.Services.LoggingService;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;


@Service
public class GeocodingService extends LoggingService {

    private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org/search?q=%s&format=json";

    private final RestTemplate restTemplate;

    public GeocodingService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public GeoLocation geocodeAddress(String address) {
        String url = String.format(NOMINATIM_URL, address);
        url = url.replace("\"", "");
        ResponseEntity<List<GeoLocation>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<GeoLocation>>() {}
        );

        List<GeoLocation> geoLocations = response.getBody();
        if (geoLocations != null && !geoLocations.isEmpty()) {
            return geoLocations.get(0);
        }
        logger.error("Failed to geocode address: {}, Set coordinates to null", address);
        return null;
    }
}
