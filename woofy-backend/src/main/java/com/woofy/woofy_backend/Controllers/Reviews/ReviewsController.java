package com.woofy.woofy_backend.Controllers.Reviews;

import com.woofy.woofy_backend.DTOs.Reviews.CreateReviewRequest;
import com.woofy.woofy_backend.DTOs.Reviews.ReviewsResponse;
import com.woofy.woofy_backend.Models.Entities.Reviews.ReviewsEntity;
import com.woofy.woofy_backend.Services.Reviews.ReviewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewsController {

    @Autowired
    private ReviewsService reviewsService;

    @PostMapping
    public ResponseEntity<ReviewsEntity> createReview(@RequestBody CreateReviewRequest request) {
        ReviewsEntity review = reviewsService.createReview(request);
        return ResponseEntity.ok(review);
    }

    @GetMapping
    public ResponseEntity<List<ReviewsResponse>> getAllReviews() {
        List<ReviewsResponse> reviews = reviewsService.getAllReviews().stream()
                .map(reviewsService::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/business/{businessId}")
    public ResponseEntity<List<ReviewsResponse>> getReviewsByBusinessId(@PathVariable Integer businessId) {
        List<ReviewsResponse> reviews = reviewsService.getReviewsByBusinessId(businessId).stream()
                .map(reviewsService::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/business/average/{businessId}")
    public ResponseEntity<Double> getAverageRatingByBusinessId(@PathVariable Integer businessId) {
        Double averageRating = reviewsService.getAverageRatingByBusinessId(businessId);
        return ResponseEntity.ok(averageRating);
    }

    @GetMapping("/business/count/{businessId}")
    public ResponseEntity<Integer> getReviewCountByBusinessId(@PathVariable Integer businessId) {
        Integer reviewCount = reviewsService.getReviewCountByBusinessId(businessId);
        return ResponseEntity.ok(reviewCount);
    }
}