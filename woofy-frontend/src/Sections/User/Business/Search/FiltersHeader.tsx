import React, { FunctionComponent, useState } from "react";
import { Box, Typography, Checkbox, Divider, Slider, Button } from "@mui/material";
import { HOME_CONDITIONS, PETS_IN_HOME } from "../../../../models/Enums/Enums";
import { OnlinePrediction } from "@mui/icons-material";

type FiltersHeaderProps = {
  selectedHomeConditions: HOME_CONDITIONS[];
  setSelectedHomeConditions: (conditions: HOME_CONDITIONS[]) => void;
  selectedPetsInHome: PETS_IN_HOME[];
  setSelectedPetsInHome: (pets: PETS_IN_HOME[]) => void;
  selectedReviews: number[];
  setSelectedReviews: (reviews: number[]) => void;
  sliderRateValue: number[];
  setSliderRateValue: (value: number[]) => void;
};



const FiltersHeader: FunctionComponent<FiltersHeaderProps> = ({ selectedHomeConditions, setSelectedHomeConditions, selectedPetsInHome, setSelectedPetsInHome, selectedReviews, setSelectedReviews, sliderRateValue, setSliderRateValue }) => {

  const handleHomeConditionsChange = (condition: HOME_CONDITIONS) => {
    setSelectedHomeConditions(prevConditions => {
      if (prevConditions.includes(condition)) {
        return prevConditions.filter(c => c !== condition);
      } else {
        return [...prevConditions, condition];
      }
    });
  };

  const handlePetsInHomeChange = (pet: PETS_IN_HOME) => {
    setSelectedPetsInHome(prevPets => {
      if (prevPets.includes(pet)) {
        return prevPets.filter(p => p !== pet);
      } else {
        return [...prevPets, pet];
      }
    });
  };

  const handleReviesChange = (score: number) => {
    setSelectedReviews(prevReviews => {
      if (prevReviews.includes(score)) {
        return prevReviews.filter(r => r !== score);
      } else {
        return [...prevReviews, score];
      }
    });
  }

  const handleSliderRateChange = (event: any, newValue: number | number[]) => {
    setSliderRateValue(newValue as number[]);
  }


  const clearAll = () => {
    setSelectedHomeConditions([]);
    setSelectedPetsInHome([]);
    setSelectedReviews([]);
    setSliderRateValue([0, 300]);
  };


  const options = [
    { label: "Home", value: HOME_CONDITIONS.HOME },
    { label: "Apartment", value: HOME_CONDITIONS.APARTMENT },
    { label: "Has Fence Yard", value: HOME_CONDITIONS.HAS_FENCE_YARD },
    { label: "Dog Allowed on Furniture", value: HOME_CONDITIONS.DOG_ALLOWED_ON_FURNITURE },
    { label: "Dog Allowed on Bed", value: HOME_CONDITIONS.DOG_ALLOWED_ON_BED },
    { label: "Non-Smoking", value: HOME_CONDITIONS.NON_SMOKING },
  ];

  const petsOptions = [
    { label: "Own a Dog", value: PETS_IN_HOME.OWN_A_DOG },
    { label: "Own a Cat", value: PETS_IN_HOME.OWN_A_CAT },
    { label: "Own Caged Pet", value: PETS_IN_HOME.OWN_CAGED_PET },
    { label: "Has Children", value: PETS_IN_HOME.HAS_CHILDREN },
    { label: "Only One Client at a Time", value: PETS_IN_HOME.ONLY_ONE_CLIENT_AT_A_TIME },
  ];

  const reviewOptions = [
    { label: "5 Stars", value: 5 },
    { label: "4 Stars", value: 4 },
    { label: "3 Stars", value: 3 },
  ];
  return (
    <Box
      sx={{
        width: '18rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'start',
        gap: '28px',
        textAlign: 'left',
        fontSize: '1.125rem',
        color: 'black',
        fontFamily: 'text-regular-normal',
        '@media (max-width: 1100px)': {
          display: 'none',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
          gap: '24px',
          pt: 0,
          px: 0,
          pb: 0,
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            justifyContent: 'space-between',
            gap: '20px',
            fontSize: '2.5rem',
            width: '100%',
          }}
        >
          <Typography
            sx={{
              margin: 0,
              position: 'relative',
              lineHeight: '34px',
              fontWeight: 'bold',
              fontSize: '24px',
              '@media (max-width: 450px)': {
                fontSize: '1.125rem',
                lineHeight: '27px',
              },
            }}
          >
            Filters
          </Typography>
          <Button
            onClick={clearAll}
            sx={{
              pt: '5px',
              pb: 0,
              fontSize: '1rem',
              fontWeight: 'regular',
              textTransform: 'none',
              color: 'black',
            }}
          >
            Clear all
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'start',
              justifyContent: 'start',
              py: 1.5,
              px: 0,
              width: '100%',
              borderTop: '1px solid',
              borderColor: 'border-primary',
            }}
          >
            <Typography sx={{ flex: 1, lineHeight: '150%', fontWeight: 'bold', fontSize: '18px' }}>Rate Per Service</Typography>
            <Box sx={{ height: '4px', width: '4px', overflow: 'hidden', display: 'none' }} />
          </Box>
          <Box sx={{ width: '100%', px: 3 }}>
            <Slider
              value={sliderRateValue}
              onChange={(e, newValue) => handleSliderRateChange(e, newValue as number[])}
              min={0}
              max={300}
              marks={[
                { value: 0, label: '0₪' },
                { value: 300, label: '300₪' },
              ]}
              valueLabelDisplay="auto"
              sx={{
                color: '#006CBF',
                '& .MuiSlider-thumb': {
                  backgroundColor: '#006CBF',
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#006CBF',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: '#d9d9d9',
                },
              }}
            />
          </Box>

        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: '8px', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            justifyContent: 'start',
            pt: 1.5,
            pb: 0.625,
            pr: 4,
            pl: 0,
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'border-primary',
          }}
        >
          <Typography sx={{ flex: 1, lineHeight: '150%', fontWeight: 'bold', fontSize: '18px', mt: 1, mb: 0.5 }}>Home Conditions</Typography>
          <Box sx={{ height: '4px', width: '4px', overflow: 'hidden', display: 'none' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: '16px', fontSize: '1rem' }}>
          {options.map((condition) => (
            <Box key={condition.value} sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Checkbox
                checked={selectedHomeConditions.includes(condition.value)}
                onChange={() => handleHomeConditionsChange(condition.value)}
                sx={{ padding: 0, color: 'rgba(0, 0, 0, 0.54)' }}
              />
              <Typography sx={{ lineHeight: '150%', marginLeft: '4px' }}>{condition.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: '8px', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            justifyContent: 'start',
            pt: 1.5,
            pb: 0.625,
            pr: 4,
            pl: 0,
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'border-primary',
          }}
        >
          <Typography sx={{ flex: 1, lineHeight: '150%', fontWeight: 'bold', fontSize: '18px', mt: 1, mb: 0.5 }}>Pets in Home</Typography>
          <Box sx={{ height: '4px', width: '4px', overflow: 'hidden', display: 'none' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: '16px', fontSize: '1rem' }}>
          {petsOptions.map((pet) => (
            <Box key={pet.value} sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Checkbox
                checked={selectedPetsInHome.includes(pet.value)}
                onChange={() => handlePetsInHomeChange(pet.value)}
                sx={{ padding: 0, color: 'rgba(0, 0, 0, 0.54)' }}
              />
              <Typography sx={{ lineHeight: '150%', marginLeft: '4px' }}>{pet.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: '8px', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            justifyContent: 'start',
            pt: 1.5,
            pb: 1.25,
            pr: 4,
            pl: 0,
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'border-primary',
          }}
        >
          <Typography sx={{ flex: 1, lineHeight: '150%', fontWeight: 'bold', fontSize: '18px', mt: 1, mb: 0.5 }}>Review Score</Typography>
          <Box sx={{ height: '4px', width: '4px', overflow: 'hidden', display: 'none' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: '16px', fontSize: '1rem' }}>
          {reviewOptions.map((option) => (
            <Box key={option.value} sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Checkbox
                checked={selectedReviews.includes(option.value)}
                onChange={() => handleReviesChange(option.value)}
                sx={{ padding: 0, color: 'rgba(0, 0, 0, 0.54)' }}
              />
              <Typography sx={{ lineHeight: '150%', marginLeft: '4px' }}>{option.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'border-primary' }} />
    </Box>
  );
};

export default FiltersHeader;
