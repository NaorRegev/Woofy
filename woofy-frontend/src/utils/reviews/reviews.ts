import {api} from "../../api/api";

export const fetchAverageReviews = async (businessId: number) => {
    try {
        const response = await api.get(`reviews/business/average/${businessId}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch average reviews for service ${businessId}: ${error}`);
        return null;
    }
};