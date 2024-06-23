import React, { FunctionComponent, useEffect, useState, CSSProperties, useMemo } from "react";
import { Box, Typography, Grid, Avatar, Divider, Button, Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Business } from "../../../../models/BusinessModels/BusinessModel";
import { DogSitterModel } from "../../../../models/BusinessModels/BusinessTypesModels/HomeStay/DogSitterModel";
import { DogWalkerModel } from "../../../../models/BusinessModels/BusinessTypesModels/HomeStay/DogWalkerModel";
import { BoardingModel } from "../../../../models/BusinessModels/BusinessTypesModels/StayAtBusiness/BoardingModel";
import { DayCareModel } from "../../../../models/BusinessModels/BusinessTypesModels/StayAtBusiness/DayCareModel";
import { BUSINESS_TYPES } from "../../../../models/Enums/Enums";
import { getImage } from "../../../../components/image/imageComponent";
import { useTheme } from '@mui/material/styles';
import Modal from 'react-modal';
import { formatEnumValue } from "../../../../utils/format-enum-text";
import BookAnAppointment from "../Profile/BookAnAppointment";
import {api} from "../../../../api/api";
import { PhoneIphone } from "@mui/icons-material";

interface BusinessFrameProps {
  business: Business;
  serviceData: DogSitterModel | DogWalkerModel | BoardingModel | DayCareModel | null;
  selectedService: BUSINESS_TYPES;
  setSelectedService: (service: BUSINESS_TYPES) => void;
}

Modal.setAppElement('#root');

const BusinessFrame: FunctionComponent<BusinessFrameProps> = ({ business, serviceData, selectedService, setSelectedService }) => {
  const [profileImage, setProfileImage] = useState("/user-avatar-image@2x.png");
  const [imageData, setImageData] = useState<{ img: string; title: string }[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [averageReview, setAverageReview] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchImages = async () => {
      if (business?.profilePhotoID) {
        const profileImageResponse = await getImage(business.profilePhotoID);
        setProfileImage(profileImageResponse || "/user-avatar-image@2x.png");
      }
      if (business?.images) {
        const fetchedImages = await Promise.all(business.images.map(async (id) => {
          const imageSrc = await getImage(id);
          return { img: imageSrc || '', title: business.businessName };
        }));
        setImageData(fetchedImages.filter(image => image.img)); // Filter out any empty image URLs
      }
    };

    const fetchReviewsData = async () => {
      if (business?.id) {
        const averageReviewResponse = await api.get(`/reviews/business/average/${business.id}`);
        const averageReviewData = await averageReviewResponse.data;
        setAverageReview(averageReviewData);

        const reviewCountResponse = await api.get(`/reviews/business/count/${business.id}`);
        const reviewCountData = await reviewCountResponse.data;
        setReviewCount(reviewCountData);
      }
    };

    fetchImages();
    fetchReviewsData();
  }, [business]);

  const availableServices = [
    { type: BUSINESS_TYPES.BOARDING, data: business.boardingEntity, text: "Boarding", icon: "/icon--moon.svg" },
    { type: BUSINESS_TYPES.DAY_CARE, data: business.dayCareEntity, text: "Day Care", icon: "/icon--sun1.svg" },
    { type: BUSINESS_TYPES.DOG_WALK, data: business.dogWalkerEntity, text: "Walker", icon: "/icon--walk.svg" },
    { type: BUSINESS_TYPES.DOG_SITTER, data: business.dogSitterEntity, text: "Sitter", icon: "/icon--bed.svg" },
  ].filter(service => service.data !== null);

  const renderDetailBox = (title: string, values: string[]) => (
    <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1, p: 2, mb: 2, width: '100%', height: '100%' }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Grid container spacing={1}>
        {values.map((value, index) => (
          <Grid item xs={12} key={index} display="flex" alignItems="center">
            <img
              src="/check.svg"
              alt="check"
              style={{ height: 24, width: 24 }}
            />
            <Typography sx={{ ml: 1 }}>{value}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, width: '100%' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h4" fontWeight="bold">
            {business.businessName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={profileImage} alt={`${business.firstName} ${business.lastName}`} sx={{ width: 64, height: 64 }} />
            <Typography variant="h6" fontWeight="bold">{`${business.firstName} ${business.lastName}`}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="/icon--map.svg" alt="" style={{ height: 24, width: 24 }} />
            <Typography variant="body1" fontWeight="medium">{business.address}, {business.city}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <img src="/vector.svg" alt="" style={{ height: 20, width: 20 }} />
            <Typography variant="body1">
              {reviewCount === 0 ? "No reviews yet" : `(${averageReview} stars) • ${reviewCount} reviews`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <PhoneIphone />
            <Typography variant="body1">{business.phoneNumber}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography variant="h5" fontWeight="bold">{`${serviceData ? serviceData.price : ""} ₪`}</Typography>
            <Typography variant="body1" sx={{ color: 'grey.600' }}>
              {selectedService === BUSINESS_TYPES.BOARDING ? "Per Night*" : "Per Service*"}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ mt: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <img src="/tablerpaw.svg" alt="tablerpaw" style={{ height: 32, width: 32 }} />
              <Typography variant="h5" fontWeight="bold">Services</Typography>
            </Box>
            <Box display="flex" flexDirection="row" gap={2} justifyContent="center" alignItems="center" mb={4}>
              {availableServices.map(service => (
                <Button
                  key={service.type}
                  onClick={() => setSelectedService(service.type)}
                  variant={selectedService === service.type ? 'contained' : 'outlined'}
                  color={selectedService === service.type ? 'primary' : 'secondary'}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '5px 10px',
                    textTransform: 'none',
                    borderRadius: '30px',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: 'regular',
                    color: selectedService === service.type ? 'white' : 'black',
                    borderColor: selectedService !== service.type ? 'grey.500' : 'primary.main',
                    backgroundColor: selectedService === service.type ? '#006CBF' : 'transparent',
                    '&:hover': {
                      borderColor: selectedService !== service.type ? 'grey.700' : '#006CBF',
                      backgroundColor: selectedService === service.type ? '#0056A4' : 'transparent',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" justifyContent="center" mr={1}>
                    <img
                      src={service.icon}
                      alt={service.text}
                      className={`icon-${selectedService === service.type ? "white" : "grey"}`}
                      style={{ width: 24, height: 24 }}
                    />
                  </Box>
                  {service.text}
                </Button>
              ))}
            </Box>
          </Box>
          <Divider />
          <Typography variant="h5" fontWeight="bold" sx={{ textAlign: 'center' }}>About {business.businessName}</Typography>
          <Typography variant="body1">{serviceData ? serviceData.about : "N/A"}</Typography>
          <Divider />
          <Grid container spacing={2}>
            {selectedService === BUSINESS_TYPES.BOARDING || selectedService === BUSINESS_TYPES.DAY_CARE ? (
              <>
                {serviceData && (serviceData as BoardingModel | DayCareModel).homeConditions.length > 0 && (
                  <Grid item xs={12} sm={6} md={6}>
                    {renderDetailBox("Home Conditions", (serviceData as BoardingModel | DayCareModel).homeConditions.map(formatEnumValue))}
                  </Grid>
                )}
                {serviceData && (serviceData as BoardingModel | DayCareModel).petsInHome.length > 0 && (
                  <Grid item xs={12} sm={6} md={6}>
                    {renderDetailBox("Pets in Home", (serviceData as BoardingModel | DayCareModel).petsInHome.map(formatEnumValue))}
                  </Grid>
                )}
              </>
            ) : null}
            {serviceData && (
              <Grid item xs={12} sm={6} md={6}>
                {renderDetailBox("Acceptable Dog Sizes", (serviceData.acceptableDogSizes || []).map(formatEnumValue))}
              </Grid>
            )}
          </Grid>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box mb={2}>
            {imageData.length > 0 && (
              <img
                src={imageData[0].img}
                alt={imageData[0].title}
                style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => handleImageClick(imageData[0].img)}
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
            {imageData.slice(1, 4).map((item) => (
              <Box
                key={item.img}
                sx={{ flex: 1 }}
                onClick={() => handleImageClick(item.img)}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
                />
              </Box>
            ))}
          </Box>
          <Grid container spacing={2}>
            {business.boardingEntity && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #ccc', borderRadius: '16px', p: 2, width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img src="/icon--moon.svg" alt="Boarding" style={{ height: 24, width: 24 }} />
                    <Typography variant="body1" fontWeight="bold" style={{ fontSize: '20px' }}>Boarding</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body1" fontWeight="bold" style={{ fontSize: '20px' }}>{business.boardingEntity.price} ₪</Typography>
                    <Typography variant="body2" style={{ fontSize: '16px', fontWeight: 'regular', color: '#666666' }}>Per Night</Typography>
                  </Box>
                </Box>
              </Grid>
            )}
            {business.dayCareEntity && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #ccc', borderRadius: '16px', p: 2, width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img src="/icon--sun1.svg" alt="Day Care" style={{ height: 24, width: 24 }} />
                    <Typography variant="body1" fontWeight="bold" style={{ fontSize: '20px' }}>Day Care</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body1" fontWeight="bold" style={{ fontSize: '20px' }}>{business.dayCareEntity.price} ₪</Typography>
                    <Typography variant="body2" style={{ fontSize: '16px', fontWeight: 'regular', color: '#666666' }}>Per Day</Typography>
                  </Box>
                </Box>
              </Grid>
            )}
            {business.dogSitterEntity && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #ccc', borderRadius: '16px', p: 2, width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <img src="/icon--bed.svg" alt="Sitting" style={{ height: 24, width: 24 }} />
                    <Typography variant="body1" fontWeight="bold" style={{ fontSize: '20px' }}>Sitting</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body1" fontWeight="bold" style={{ fontSize: '20px' }}>{business.dogSitterEntity.price} ₪</Typography>
                    <Typography variant="body2" style={{ fontSize: '16px', fontWeight: 'regular', color: '#666666' }}>Per Visit</Typography>
                  </Box>
                </Box>
              </Grid>
            )}
            {business.dogWalkerEntity && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #ccc', borderRadius: '16px', p: 2, width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <img src="/icon--walk.svg" alt="Walking" style={{ height: 24, width: 24 }} />
                    <Typography variant="body1" fontWeight="bold" style={{ fontSize: '20px' }}>Walking</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body1" fontWeight="bold" style={{ fontSize: '20px' }}>{business.dogWalkerEntity.price} ₪</Typography>
                    <Typography variant="body2" style={{ fontSize: '16px', fontWeight: 'regular', color: '#666666' }}>Per Walk</Typography>
                  </Box>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <img src="/icon--calendarcheck.svg" alt="calendercheck" style={{ height: 32, width: 32 }} />
          <Typography variant="h5" fontWeight="bold">Availability</Typography>
        </Box>
        <Box display="flex" flexDirection="row" gap={2} justifyContent="center" alignItems="center" mb={4}>
          {availableServices.map(service => (
            <Button
              key={service.type}
              onClick={() => setSelectedService(service.type)}
              variant={selectedService === service.type ? 'contained' : 'outlined'}
              color={selectedService === service.type ? 'primary' : 'secondary'}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5px 10px',
                textTransform: 'none',
                borderRadius: '30px',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontWeight: 'regular',
                color: selectedService === service.type ? 'white' : 'black',
                borderColor: selectedService !== service.type ? 'grey.500' : 'primary.main',
                backgroundColor: selectedService === service.type ? '#006CBF' : 'transparent',
                '&:hover': {
                  borderColor: selectedService !== service.type ? 'grey.700' : '#006CBF',
                  backgroundColor: selectedService === service.type ? '#0056A4' : 'transparent',
                },
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="center" mr={1}>
                <img
                  src={service.icon}
                  alt={service.text}
                  className={`icon-${selectedService === service.type ? "white" : "grey"}`}
                  style={{ width: 24, height: 24 }}
                />
              </Box>
              {service.text}
            </Button>
          ))}
        </Box>
        <Box display="flex" justifyContent="center" mb={4} sx={{ border: 1, borderColor: 'grey.300', borderRadius: '16px', py: 2 }}>
          <BookAnAppointment business={business} selectedService={selectedService} />
        </Box>
      </Box>
      <Dialog
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ backgroundColor: theme.palette.background.default }}>
          <IconButton
            sx={{ position: 'absolute', top: 16, right: 16, color: theme.palette.grey[700] }}
            onClick={() => setModalIsOpen(false)}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain',
            }}
            src={selectedImage}
            alt="Service Image"
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BusinessFrame;
