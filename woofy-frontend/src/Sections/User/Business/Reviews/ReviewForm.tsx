import React, { useContext, useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import { UserContext } from '../../../../provider/UserProvider';
import { BUSINESS_TYPES } from '../../../../models/Enums/Enums';
import Button from '@mui/material/Button';
import { Typography, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';
import { useNotifications } from "../../../../provider/NotificationContext";
import { getImage } from "../../../../components/image/imageComponent";
import {api} from "../../../../api/api";

interface ReviewFormProps {
    businessId: number;
    open: boolean;
    selectedService: BUSINESS_TYPES;
    onClose: () => void;
    onSubmit: (review: string, rating: number, serviceType: BUSINESS_TYPES) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ open, onClose, onSubmit, businessId, selectedService }) => {
    const { userDetails } = useContext(UserContext);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewError, setReviewError] = useState('');
    const [ratingError, setRatingError] = useState('');
    const { addNotification } = useNotifications();
    const [imageSrc, setImageSrc] = useState("/user-avatar-image@2x.png");
    const [currentDate, setCurrentDate] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!review) {
            setReviewError('Review is required');
        } else {
            setReviewError('');
        }

        if (!rating) {
            setRatingError('Rating is required');
        } else {
            setRatingError('');
        }

        if (!review || !rating) {
            return;
        }

        const createReviewRequest = {
            userId: userDetails.id,
            businessId: businessId,
            review: review,
            rating: rating,
            serviceType: selectedService,
        };

        try {
            await api.post('reviews', createReviewRequest);
            addNotification({
                title: 'Review Added',
                description: `Your review has been successfully added.`,
                type: 'review_added',
                isUnRead: true,
            });
            onClose();
            window.location.reload();
        } catch (error) {
            toast.error('Error creating review. Please try again.');
            console.error('Error creating review:', error);
            onClose();
        }
    };

    useEffect(() => {
        const fetchImage = async () => {
            if (userDetails?.profilePhotoID) {
                const image = await getImage(userDetails.profilePhotoID);
                setImageSrc(image);
            } else {
                setImageSrc('/default-avatar-image@2x.png');
            }
        };

        fetchImage();

        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        setCurrentDate(formattedDate);
    }, [userDetails]);

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: 450, padding: 2 }}>
                <Typography variant="h6">Write a review</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img
                            src={imageSrc}
                            alt="User Avatar"
                            style={{ width: 50, height: 50, borderRadius: '50%' }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1">{userDetails.firstName} {userDetails.lastName}</Typography>
                            <Typography variant="caption" color="textSecondary">{currentDate}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        size={'large'}
                        onChange={(event, newValue) => {
                            if (newValue !== null) {
                                setRating(newValue);
                            }
                        }}
                    />
                    {ratingError && <Typography variant="body2" color="error">{ratingError}</Typography>}
                    <TextField
                        label="Share details of your own experience at this place"
                        multiline
                        rows={4}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                    {reviewError && <Typography variant="body2" color="error">{reviewError}</Typography>}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, width: '100%', marginTop: 2 }}>
                        <Button onClick={onClose} color="secondary">Cancel</Button>
                        <Button type="submit" color="primary" variant="contained">Post</Button>
                    </Box>
                </Box>
            </Box>
        </form>
    );
};

export default ReviewForm;
