package com.woofy.woofy_backend.Services.Reviews;

import com.woofy.woofy_backend.DTOs.Reviews.CreateReviewRequest;
import com.woofy.woofy_backend.DTOs.Reviews.ReviewsResponse;
import com.woofy.woofy_backend.Models.Entities.Reviews.ReviewsEntity;
import com.woofy.woofy_backend.Repositories.Reviews.ReviewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class ReviewsService {

    @Autowired
    private ReviewsRepository reviewsRepository;
    private final SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

    public ReviewsEntity createReview(CreateReviewRequest request) {
        ReviewsEntity review = new ReviewsEntity();
        review.setUserId(request.getUserId());
        review.setBusinessId(request.getBusinessId());
        review.setReview(request.getReview());
        review.setRating(request.getRating());
        review.setServiceType(request.getServiceType());
        return reviewsRepository.save(review);
    }

    public List<ReviewsEntity> getAllReviews() {
        return reviewsRepository.findAll();
    }

    public List<ReviewsEntity> getReviewsByBusinessId(Integer businessId) {
        return reviewsRepository.findByBusinessId(businessId);
    }

    public Double getAverageRatingByBusinessId(Integer businessId) {
        List<ReviewsEntity> reviews = reviewsRepository.findByBusinessId(businessId);
        double averageRating = reviews.stream().mapToDouble(ReviewsEntity::getRating).average().orElse(0);
        BigDecimal bd = new BigDecimal(Double.toString(averageRating));
        bd = bd.setScale(2, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

    public ReviewsResponse convertToDto(ReviewsEntity entity) {
        ReviewsResponse dto = new ReviewsResponse();
        dto.setReviewId(entity.getReviewId());
        dto.setUserId(entity.getUserId());
        dto.setBusinessId(entity.getBusinessId());
        dto.setReview(entity.getReview());
        dto.setRating(entity.getRating());
        dto.setServiceType(entity.getServiceType());
        dto.setCreatedAt(formatter.format(entity.getCreatedAt()));
        return dto;
    }

    public Integer getReviewCountByBusinessId(Integer businessId) {
        return reviewsRepository.findByBusinessId(businessId).size();
    }
}