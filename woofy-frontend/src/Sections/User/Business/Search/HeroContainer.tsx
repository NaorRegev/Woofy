import React, { FunctionComponent, useState, useEffect } from "react";
import { Box, Typography, TextField, Icon, InputAdornment, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SelectServiceTypeComponentIncludeAll from "../../selectButtons/SelectServiceTypeComponentIncludeAll";
import { Age, BUSINESS_TYPES, Size } from "../../../../models/Enums/Enums";
import { toast } from "react-toastify";

type HeroContainerProps = {
  setSelectedServices: (type: BUSINESS_TYPES) => void;
  selectedServices: BUSINESS_TYPES | null;
  selectedDogSize: Size | null;
  setSelectedDogSize: (size: Size) => void;
  selectedDogAge: Age | null;
  setSelectedDogAge: (age: Age) => void;
  selectedCity: String;
  setSelectedCity: (city: String) => void;
  selectedStartDate: Date | null;
  setSelectedStartDate: (date: Date) => void;
  selectedEndDate: Date | null;
  setSelectedEndDate: (date: Date) => void;
};

const HeroContainer: FunctionComponent<HeroContainerProps> = ({
  setSelectedServices, selectedServices,
  selectedDogSize, setSelectedDogSize,
  selectedDogAge, setSelectedDogAge,
  setSelectedCity, selectedCity,
  setSelectedStartDate, selectedStartDate,
  setSelectedEndDate, selectedEndDate
}) => {

  const [cityInput, setCityInput] = useState<String>('');
  const [startDateInput, setStartDateInput] = useState<Date | null>(null);
  const [endDateInput, setEndDateInput] = useState<Date | null>(null);

  const dogSizes = [
    { label: 'Small', value: Size.SMALL, weight: '1-9 kg' },
    { label: 'Medium', value: Size.MEDIUM, weight: '9-22 kg' },
    { label: 'Large', value: Size.LARGE, weight: '22-45 kg' },
    { label: 'Giant', value: Size.GIANT, weight: '45 kg +' },
  ];

  const dogAges = [
    { age: 'Puppy', years: '0-1 year' },
    { age: 'Adult', years: '2-8 years' },
    { age: 'Senior', years: '9 years +' },
  ];

  const handleDogSizeClick = (size: Size) => {
    setSelectedDogSize(size);
  };

  const handleDogAgeClick = (age: Age) => {
    setSelectedDogAge(age);
  };

  const handleSearchClick = () => {
    return () => {
      if (endDateInput && startDateInput && endDateInput < startDateInput) {
        toast.error('End date should be greater than start date');
        return;
      }
      setSelectedCity(cityInput);
      setSelectedStartDate(startDateInput);
      setSelectedEndDate(selectedServices === BUSINESS_TYPES.BOARDING ? endDateInput : null);
    };
  };

  const handleClearAllClick = () => {
    setSelectedCity('');
    setCityInput('');
    setSelectedStartDate(null);
    setStartDateInput(null);
    setSelectedEndDate(null);
    setEndDateInput(null);
  };

  useEffect(() => {
    if (selectedServices !== BUSINESS_TYPES.BOARDING) {
      setSelectedEndDate(null);
      setEndDateInput(null);
    }
  }, [selectedServices]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component="header"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
          width: '100%',
          textAlign: 'left',
          fontSize: '21xl',
          color: 'text.borderPrimary',
          fontFamily: 'text-regular-normal',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
            px: 3,
            pb: 1,
            pt: 'calc(20% - 300px)', // Adjust this value to position content between center and bottom
            backgroundImage: 'url(/hero-frame@3x.png)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 37%',
            width: '100%',
            minHeight: '400px',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#FAFAFA',
              opacity: 0.24,
              zIndex: 1,
            },
            '& > *': {
              position: 'relative',
              zIndex: 2,
            },
          }}
        >

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'start',
              maxWidth: '1280px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'start',
                pb: 1.5,
                gap: 1,
                width: '100%',
              }}
            >
              <Typography
                component="h3"
                sx={{
                  m: 0,
                  position: 'relative',
                  fontSize: '40px',
                  lineHeight: '120%',
                  fontWeight: 'bold',
                  fontFamily: 'Inter',
                  '@media (max-width: 750px)': {
                    fontSize: '32px',
                    lineHeight: '38px',
                  },
                  '@media (max-width: 450px)': {
                    fontSize: '24px',
                    lineHeight: '29px',
                  },
                }}
              >
                <span>Find a </span>
                <span style={{ color: '#006CBF' }}>caregiver</span>
                <span> for every journey</span>
              </Typography>

              <Typography
                sx={{
                  fontSize: '20px',
                  lineHeight: '150%',
                  fontWeight: 'bold',
                  fontFamily: 'Inter',
                  '@media (max-width: 450px)': {
                    fontSize: '16px',
                    lineHeight: '24px',
                  },
                }}
              >
                Discover the best caregivers that fits your every travel needs
              </Typography>

            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'start',
                maxWidth: '1280px',
                marginBottom: '24px',
              }}
            >
              <SelectServiceTypeComponentIncludeAll
                setSelectedServices={setSelectedServices}
                selectedServices={selectedServices}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'start',
                py: 1,
                px: 1.5,
                gap: 1.5,
                pt: 2,
                mt: 1,
                width: '100%',
                borderRadius: '10px 10px 0 0',
                backgroundColor: '#fff',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.02)',
              }}
            >
              <TextField
                sx={{
                  flex: 1,
                  borderRadius: '3px',
                  outline: 'none',
                  fontFamily: 'text-regular-normal',
                  fontSize: 'base',
                  backgroundColor: '#fff',
                  height: 56,
                  color: 'colorNeutralNeutralDark',
                  textAlign: 'left',
                  minWidth: '300px',
                  p: 0,
                }}
                placeholder="City"
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon>
                        <img
                          className="h-[30px] w-[30px] relative overflow-hidden shrink-0"
                          alt=""
                          src="/icon--globe.svg"
                        />
                      </Icon>
                    </InputAdornment>
                  ),
                }}
              />

              <DatePicker
                value={startDateInput}
                onChange={(newValue) => setStartDateInput(newValue)}
                format="dd/MM/yyyy"
                label="Start Date"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Start Date"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 56,
                        backgroundColor: '#fff',
                        '& fieldset': {
                          borderColor: '#d9d9d9',
                        },
                        '&:hover fieldset': {
                          borderColor: '#d9d9d9',
                        },
                        '& input::placeholder': {
                          color: 'rgba(0, 0, 0, 0.85)',
                          fontSize: 16,
                        },
                        '& input': {
                          color: 'rgba(0, 0, 0, 0.85)',
                          fontSize: 16,
                          fontWeight: 400,
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon>
                            <img
                              className="h-[30px] w-[30px] relative overflow-hidden shrink-0"
                              alt=""
                              src="/icon--calendar.svg"
                            />
                          </Icon>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <DatePicker
                value={endDateInput}
                onChange={(newValue) => setEndDateInput(newValue)}
                label="End Date"
                format="dd/MM/yyyy"
                disabled={selectedServices !== BUSINESS_TYPES.BOARDING}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="End Date"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 56,
                        backgroundColor: '#fff',
                        '& fieldset': {
                          borderColor: '#d9d9d9',
                        },
                        '&:hover fieldset': {
                          borderColor: '#d9d9d9',
                        },
                        '& input::placeholder': {
                          color: 'rgba(0, 0, 0, 0.85)',
                          fontSize: 16,
                        },
                        '& input': {
                          color: 'rgba(0, 0, 0, 0.85)',
                          fontSize: 16,
                          fontWeight: 400,
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon>
                            <img
                              className="h-[30px] w-[30px] relative overflow-hidden shrink-0"
                              alt=""
                              src="/icon--calendar.svg"
                            />
                          </Icon>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'start',
                py: 1,
                px: 1.5,
                gap: 1.5,
                pb: 2,
                pt: 1.5,
                width: '100%',
                borderRadius: '0 0 10px 10px',
                backgroundColor: '#fff',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.02)',
                mb: 4, // Add space between the end of the box with search button and other content
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'start',
                  backgroundColor: '#fff',
                  borderRadius: '3px',
                  px: 2,
                  border: '1px solid',
                  borderColor: 'gainsboro',
                  height: 56,
                  flexWrap: 'nowrap',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    lineHeight: '150%',
                    fontWeight: 'normal',
                    color: 'text.primary',
                    textAlign: 'left',
                    mr: 2,
                    borderRight: '1px solid',
                    borderColor: 'border-primary',
                    pr: 2,
                  }}
                >
                  Dog Size
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 0.5,
                    flexWrap: 'nowrap',
                  }}
                >
                  {dogSizes.map((size) => (
                    <Button
                      key={size.value}
                      variant={selectedDogSize === size.value ? "contained" : "outlined"}
                      onClick={() => handleDogSizeClick(size.value)}
                      sx={{
                        minWidth: '80px',
                        height: '48px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textTransform: 'none',
                        borderRadius: '10px',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        border: '1px solid transparent',
                        color: selectedDogSize === size.value ? 'white' : 'text.primary',
                        backgroundColor: selectedDogSize === size.value ? '#006CBF' : 'transparent',

                        '&:hover': {
                          borderColor: 'transparent',
                          backgroundColor: selectedDogSize === size.value ? '#0056A4' : 'transparent',
                        },
                      }}
                    >
                      <Typography sx={{ m: 0 }}>{size.label}</Typography>
                      <Typography sx={{ m: 0 }}>{size.weight}</Typography>
                    </Button>
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'start',
                  backgroundColor: '#fff',
                  borderRadius: '3px',
                  px: 2,
                  border: '1px solid',
                  borderColor: 'gainsboro',
                  height: 56,
                  flexWrap: 'nowrap',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    lineHeight: '150%',
                    fontWeight: 'normal',
                    color: 'text.primary',
                    textAlign: 'left',
                    mr: 2,
                    borderRight: '1px solid',
                    borderColor: 'border-primary',
                    pr: 2,
                  }}
                >
                  Dog Age
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 0.5,
                    flexWrap: 'nowrap',
                  }}
                >
                  {dogAges.map((age) => (
                    <Button
                      key={age.age}
                      variant={selectedDogAge === age.age ? "contained" : "outlined"}
                      onClick={() => handleDogAgeClick(age.age)}
                      sx={{
                        minWidth: '80px',
                        height: '48px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textTransform: 'none',
                        borderRadius: '10px',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        border: '1px solid transparent',
                        color: selectedDogAge === age.age ? 'white' : 'text.primary',
                        backgroundColor: selectedDogAge === age.age ? '#006CBF' : 'transparent',
                        '&:hover': {
                          borderColor: 'transparent',
                          backgroundColor: selectedDogAge === age.age ? '#0056A4' : 'transparent',
                        },
                      }}
                    >
                      <Typography sx={{ m: 0 }}>{age.age}</Typography>
                      <Typography sx={{ m: 0 }}>{age.years}</Typography>
                    </Button>
                  ))}
                </Box>
              </Box>
              <Button
                onClick={handleSearchClick()}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 56,
                  backgroundColor: '#006CBF',
                  borderRadius: '3px',
                  color: '#fff',
                  flex: 1,
                  '&:hover': {
                    backgroundColor: '#0056A4',
                  },
                }}
              >
                <Icon
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <img
                    className="h-6 w-6 relative overflow-hidden shrink-0"
                    alt=""
                    src="/icon--search.svg"
                  />
                </Icon>
                <Typography
                  sx={{
                    fontSize: 'lg',
                    lineHeight: '150%',
                    fontWeight: 'bold',
                    color: '#fff',
                    ml: 1,
                  }}
                >
                  Search
                </Typography>
              </Button>
              <Button
                variant="contained"
                onClick={handleClearAllClick}
                sx={{
                  backgroundColor: '#FFFFFF', // White background
                  height: 56, // Match height of Search button
                  py: 1, // Reduced vertical padding
                  px: 2, // Reduced horizontal padding
                  borderRadius: '10px', // Smaller border radius
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap',
                  color: '#006CBF', // Blue text color
                  '&:hover': {
                    backgroundColor: '#E0E0E0', // Light grey on hover
                  },
                }}
              >
                <div style={{
                  fontSize: '16px', // Match font size of Search button text
                  fontWeight: '550', // Corrected capitalization
                  fontFamily: 'Inter',
                  textAlign: 'left',
                  display: 'inline-block',
                  minWidth: '10px',
                }}>
                  Clear
                </div>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default HeroContainer;
