import { useEffect, useState } from "react";
import UserReview from "./UserReview";
import {api} from "../../../../api/api";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";

const TestimonialsContainer = ({ businessId }: { businessId: Number }) => {
  const [reviews, setReviews] = useState([]);
  const [displayCount, setDisplayCount] = useState(3);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`reviews/business/${businessId}`);
        setReviews(response.data);
      } catch (error) {
        console.error(`Failed to fetch reviews: ${error}`);
      }
    };

    fetchReviews();
  }, [businessId]);

  const handleShowMore = () => {
    setDisplayCount(displayCount + 3);
  };

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, textAlign: 'center' }}>Customer Reviews</Typography>      <Grid container spacing={2}>
        {reviews.slice(0, displayCount).map((review, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <UserReview avatarImage="/avatar-image@2x.png" review={review} />
            </Paper>
          </Grid>
        ))}
      </Grid>
      {displayCount < reviews.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="outlined" onClick={handleShowMore}>
            Show More
          </Button>
        </Box>
      )}
      {reviews.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Typography variant="body1">No reviews yet</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TestimonialsContainer;
