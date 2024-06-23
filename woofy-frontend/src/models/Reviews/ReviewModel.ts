import { BUSINESS_TYPES } from "../Enums/Enums";

export class ReviewModel {
    reviewId: number;
    userId: number;
    businessId: number;
    review: string;
    rating: number;
    serviceType: BUSINESS_TYPES;
    createdAt: string;

    constructor(reviewId: number, userId: number, businessId: number, review: string, rating: number, serviceType: BUSINESS_TYPES, createdAt: string) {
        this.reviewId = reviewId;
        this.userId = userId;
        this.businessId = businessId;
        this.review = review;
        this.rating = rating;
        this.serviceType = serviceType;
        this.createdAt = createdAt;
    }
}