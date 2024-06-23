import React, { FunctionComponent, useMemo, CSSProperties, useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { getImage } from "../../../../components/image/imageComponent";
import {api} from "../../../../api/api";
import { BUSINESS_TYPES } from "../../../../models/Enums/Enums";

const MapIcon = (props: any) => (
  <img
    src="/icon--map.svg"
    alt="Location Icon"
    style={{ width: '24px', height: '24px' }}
    {...props}
  />
);

const StarIcon = (props: any) => (
  <img
    src="/vector.svg"
    alt="Star Icon"
    style={{ width: '20px', height: '20px', marginRight: '8px' }}
    {...props}
  />
);

const ShekelIcon = (props: any) => (
  <img
    src="/icon--shekel.svg"
    alt="Shekel Icon"
    style={{ width: '24px', height: '24px' }}
    {...props}
  />
);

export type CardType = {
  propFlex?: CSSProperties["flex"];
  propAlignSelf?: CSSProperties["alignSelf"];
  business: any;
  businessAverageReview: number;
  businessReviewsCount: number;
  selectedService: BUSINESS_TYPES;
};

const Card: FunctionComponent<CardType> = ({ propFlex, propAlignSelf, business, businessAverageReview, businessReviewsCount, selectedService }) => {
  const [imageSrc, setImageSrc] = useState('/placeholder-image2@2x.png');

  const cardStyle: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
      alignSelf: propAlignSelf,
    };
  }, [propFlex, propAlignSelf]);

  useEffect(() => {
    const fetchImage = async () => {
      if (business?.profilePhotoID) {
        const image = await getImage(business.profilePhotoID);
        setImageSrc(image || "/placeholder-image2@2x.png");
      }
    };

    fetchImage();
  }, [business, business.id]);

  const getPrice = () => {
    if (selectedService === BUSINESS_TYPES.ALL) {
      if (business.boardingEntity) return business.boardingEntity.price;
      if (business.dayCareEntity) return business.dayCareEntity.price;
      if (business.dogSitterEntity) return business.dogSitterEntity.price;
      if (business.dogWalkerEntity) return business.dogWalkerEntity.price;
      return 'N/A';
    }

    switch (selectedService) {
      case BUSINESS_TYPES.BOARDING:
        return business.boardingEntity?.price;
      case BUSINESS_TYPES.DAY_CARE:
        return business.dayCareEntity?.price;
      case BUSINESS_TYPES.DOG_SITTER:
        return business.dogSitterEntity?.price;
      case BUSINESS_TYPES.DOG_WALK:
        return business.dogWalkerEntity?.price;
      default:
        return 'N/A';
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '1600px',
        border: '1px solid',
        borderColor: 'grey.300',
        ...cardStyle,
      }}
    >
      <Box
        component="img"
        sx={{
          height: '208px',
          width: '200px',
          objectFit: 'cover',
        }}
        src={imageSrc}
        alt="Placeholder"
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          minWidth: '300px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Button
            sx={{
              textTransform: 'none',
              padding: 0,
              minWidth: 'auto',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
            onClick={() => window.open(`/business-profile/${business.id}`, '_blank')}
          >
            <Typography
              component="h3"
              sx={{
                flex: 1,
                fontFamily: 'Inter, sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#006CBF',
              }}
            >
              {business.businessName}
            </Typography>
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <MapIcon />
          <Typography
            sx={{
              ml: 1,
              fontFamily: 'Inter, sans-serif',
              fontSize: '20px',
              fontWeight: 500,
            }}
          >
            {business.address}, {business.city}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <StarIcon />
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '20px',
              fontWeight: 500,
            }}
          >
            {businessReviewsCount === 0 ? "No reviews yet" : `(${businessAverageReview} stars) • ${businessReviewsCount} reviews`}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              component="span"
              sx={{
                mr: 1,
                fontFamily: 'Inter, sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              {getPrice()}
            </Typography>
            <ShekelIcon />
          </Box>

          <a href={`/business-profile/${business.id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#006CBF',
                py: 1.5,
                px: 3,
                borderRadius: '30px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                mr: 1,
                '&:hover': {
                  backgroundColor: 'cornflowerblue',
                },
              }}
            >
              <div style={{
                fontSize: '16px',
                fontWeight: 'Bold',
                fontFamily: 'Inter',
                color: '#FFFFFF',
                textAlign: 'left',
                display: 'inline-block',
                minWidth: '78px',
              }}>
                See Availability
              </div>
            </Button>
          </a>

        </Box>
      </Box>
    </Box>
  );
};

export default Card;
