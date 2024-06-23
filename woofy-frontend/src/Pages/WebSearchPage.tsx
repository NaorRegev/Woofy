import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Link as MuiLink, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Navbar from "../Sections/Home/NavbarPreLogin";
import HeroContainer from "../Sections/User/Business/Search/HeroContainer";
import FiltersHeader from "../Sections/User/Business/Search/FiltersHeader";
import Card from "../Sections/User/Business/Search/Card";
import { api } from "../api/api";
import { Age, BUSINESS_TYPES, HOME_CONDITIONS, PETS_IN_HOME, ROLE, Size } from "../models/Enums/Enums";
import { UserContext } from "../provider/UserProvider";
import RegisterYourDogCTA from "../Sections/User/Customer/DogRegister/RegisterYourDogCTA";
import MapComponent from "../layouts/Map/components/MapComponent";
import { Helmet } from "react-helmet-async";

type Business = {
    id: number;
    profilePhotoID: number;
    businessName: string;
    address: string;
    city: string;
    lat: number;
    lon: number;
    dogSitterEntity?: any;
    dogWalkerEntity?: any;
    boardingEntity?: any;
    dayCareEntity?: any;
};

const WebSearchPage: FunctionComponent = () => {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
    const [numResultsToShow, setNumResultsToShow] = useState(10);
    const [businessAverageReviews, setBusinessAverageReviews] = useState<{ [key: number]: number }>({});
    const [businessReviewsCounts, setBusinessReviewsCounts] = useState<{ [key: number]: number }>({});
    const [selectedServices, setSelectedServices] = useState<BUSINESS_TYPES>(BUSINESS_TYPES.ALL);
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
    const [selectedDogSize, setSelectedDogSize] = useState<Size | null>(null);
    const [selectedDogAge, setSelectedDogAge] = useState<Age | null>(null);
    const [selectedHomeConditions, setSelectedHomeConditions] = useState<HOME_CONDITIONS[]>([]);
    const [selectedPetsInHome, setSelectedPetsInHome] = useState<PETS_IN_HOME[]>([]);
    const [selectedReviewScore, setSelectedReviewScore] = useState<number[]>([]);
    const [sliderRateValue, setSliderRateValue] = useState<number[]>([0, 300]);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [mapOpen, setMapOpen] = useState(false); // State to control map popup

    const { userDetails } = useContext(UserContext);
    const [hasDog, setHasDog] = useState(false);

    const showMoreResults = () => {
        setNumResultsToShow(prevNum => prevNum + 5);
    };

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (userDetails && userDetails.id) {
            api.post(`dogs/getByUserId`, { id: userDetails.id })
                .then(response => {
                    if (response.data) {
                        setHasDog(true);
                    }
                })
                .catch(error => {
                    console.error('Error fetching dog', error);
                });
        }
    }, [userDetails]);

    useEffect(() => {
        const fetchBusinesses = async () => {
            const response = await api.get('/business/all');
            const data = await response.data;
            setBusinesses(data);
            setFilteredBusinesses(data);

            const averageReviews: { [key: number]: number } = {};
            const reviewsCounts: { [key: number]: number } = {};
            for (const business of data) {
                const averageReviewResponse = await api.get(`reviews/business/average/${business.id}`);
                averageReviews[business.id] = averageReviewResponse.data;
                const reviewCountResponse = await api.get(`reviews/business/count/${business.id}`);
                reviewsCounts[business.id] = reviewCountResponse.data;
            }
            setBusinessAverageReviews(averageReviews);
            setBusinessReviewsCounts(reviewsCounts);
        };

        fetchBusinesses();
    }, []);

    const filterBusinesses = async () => {
        let filtered = businesses;

        // Filter by selected service
        if (selectedServices) {
            const serviceCheck = {
                [BUSINESS_TYPES.ALL]: business => business.dogSitterEntity || business.dogWalkerEntity || business.boardingEntity || business.dayCareEntity,
                [BUSINESS_TYPES.DOG_SITTER]: business => business.dogSitterEntity,
                [BUSINESS_TYPES.BOARDING]: business => business.boardingEntity,
                [BUSINESS_TYPES.DAY_CARE]: business => business.dayCareEntity,
                [BUSINESS_TYPES.DOG_WALK]: business => business.dogWalkerEntity,
            };
            const checkService = serviceCheck[selectedServices];
            if (checkService) filtered = filtered.filter(checkService);
        }

        // Filter by dog size
        if (selectedDogSize) {
            console.log(`Filtering by dog size: ${selectedDogSize as Size}`);
            filtered = filtered.filter(business =>
                [business.dogSitterEntity, business.dogWalkerEntity, business.boardingEntity, business.dayCareEntity]
                    .some(entity => entity && entity.acceptableDogSizes.includes(selectedDogSize))
            );
        }

        // Filter by rate
        if (sliderRateValue[0] > 0 || sliderRateValue[1] < 300) {
            filtered = filtered.filter(business =>
                [business.dogSitterEntity, business.dogWalkerEntity, business.boardingEntity, business.dayCareEntity]
                    .some(entity => entity && entity.price >= sliderRateValue[0] && entity.price <= sliderRateValue[1])
            );
        }

        // Filter by home conditions
        if (selectedHomeConditions.length > 0) {
            filtered = filtered.filter(business =>
                [business.dogSitterEntity, business.dogWalkerEntity, business.boardingEntity, business.dayCareEntity]
                    .some(entity => entity && entity.homeConditions &&
                        selectedHomeConditions.every(condition => entity.homeConditions.includes(condition))
                    )
            );
        }

        // Filter by pets in home
        if (selectedPetsInHome.length > 0) {
            filtered = filtered.filter(business =>
                [business.dogSitterEntity, business.dogWalkerEntity, business.boardingEntity, business.dayCareEntity]
                    .some(entity => entity && entity.petsInHome &&
                        selectedPetsInHome.every(pet => entity.petsInHome.includes(pet))
                    )
            );
        }

        // Filter by reviews
        if (selectedReviewScore.length > 0) {
            filtered = filtered.filter(business =>
                selectedReviewScore.includes(Math.floor(businessAverageReviews[business.id]))
            );
        }

        // Filter by city
        if (selectedCity) {
            const normalizeCityName = (city) => city.replace(/[^a-zA-Z\u0590-\u05FF]/g, '').toLowerCase();
            const normalizedSelectedCity = normalizeCityName(selectedCity);
            filtered = filtered.filter(business => normalizeCityName(business.city) === normalizedSelectedCity);
        }

        // Filter by date availability
        if (selectedStartDate || selectedEndDate) {
            const availabilityCheckPromises = filtered.map(async (business) => {
                try {
                    const startDate = selectedStartDate ? formatDate(selectedStartDate) : '';
                    const endDate = selectedEndDate ? formatDate(selectedEndDate) : startDate;

                    if ((selectedServices === BUSINESS_TYPES.BOARDING || selectedServices === BUSINESS_TYPES.ALL) && business.boardingEntity) {
                        const response = await api.post('/appointment/boarding/available-capacity-by-date-range', {
                            startDate,
                            endDate,
                            businessId: business.id,
                        });

                        if (response.data && Object.values(response.data).some(capacity => capacity > 0)) {
                            return business;
                        }
                    }

                    if ((selectedServices === BUSINESS_TYPES.DAY_CARE || selectedServices === BUSINESS_TYPES.ALL) && business.dayCareEntity) {
                        const response = await api.post('/appointment/day-care/available-capacity-by-date', {
                            date: startDate,
                            businessId: business.id,
                        });

                        if (response.data && response.data > 0) {
                            return business;
                        }
                    }

                    if ((selectedServices === BUSINESS_TYPES.DOG_SITTER || selectedServices === BUSINESS_TYPES.ALL) && business.dogSitterEntity) {
                        const response = await api.post('/appointment/dog-sitter/available-hours-by-business', {
                            date: startDate,
                            businessId: business.id,
                        });

                        if (response.data && response.data.length > 0) {
                            return business;
                        }
                    }

                    if ((selectedServices === BUSINESS_TYPES.DOG_WALK || selectedServices === BUSINESS_TYPES.ALL) && business.dogWalkerEntity) {
                        const response = await api.post('/appointment/dog-walker/available-hours-by-business', {
                            date: startDate,
                            businessId: business.id,
                        });

                        if (response.data && response.data.length > 0) {
                            return business;
                        }
                    }
                } catch (error) {
                    console.error(`Error checking availability for business ${business.id}`, error);
                }

                return null;
            });

            const availableBusinesses = await Promise.all(availabilityCheckPromises);
            filtered = availableBusinesses.filter(business => business !== null);
        }

        // Set the state with the filtered businesses
        setFilteredBusinesses(filtered);
    };

    useEffect(() => {
        filterBusinesses();
    }, [selectedServices, selectedStartDate, selectedEndDate, selectedDogSize, businesses, sliderRateValue, selectedHomeConditions, selectedPetsInHome, selectedReviewScore, selectedCity]);

    return (
        <>
            <Helmet>
                <title> Discover | Woofy </title>
            </Helmet>
            <Box
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                }}
            >
                <HeroContainer setSelectedServices={setSelectedServices} selectedServices={selectedServices}
                    setSelectedDogSize={setSelectedDogSize} selectedDogSize={selectedDogSize}
                    setSelectedDogAge={setSelectedDogAge} selectedDogAge={selectedDogAge}
                    setSelectedCity={setSelectedCity} selectedCity={selectedCity}
                    setSelectedStartDate={setSelectedStartDate} selectedStartDate={selectedStartDate}
                    setSelectedEndDate={setSelectedEndDate} selectedEndDate={selectedEndDate}
                />
                {!hasDog && userDetails?.role == ROLE.CUSTOMER && <RegisterYourDogCTA />}
                <Box
                    component="main"
                    sx={{
                        width: '100%',
                        backgroundColor: 'background-color-primary',
                        pt: 5,
                        px: 5,
                        gap: 10.5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        boxSizing: 'border-box',
                        '@media (max-width: 1275px)': {
                            pt: 3,
                            pb: 5,
                        },
                        '@media (max-width: 750px)': {
                            gap: 5.25,
                            px: 2.5,
                        },
                        '@media (max-width: 1100px)': {
                            pt: 2.5,
                            pb: 3.125,
                        },
                        '@media (max-width: 450px)': {
                            gap: 2.625,
                            pb: 1.25,
                        },
                    }}
                >
                    <Box
                        component="section"
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'start',
                            justifyContent: 'start',
                            gap: 8,
                            pl: 4,
                            '@media (max-width: 750px)': {
                                gap: 4,
                                pl: 2,
                            },
                            '@media (max-width: 450px)': {
                                gap: 2,
                                pl: 1,
                            },
                        }}
                    >
                        <FiltersHeader
                            selectedHomeConditions={selectedHomeConditions}
                            setSelectedHomeConditions={setSelectedHomeConditions}
                            selectedPetsInHome={selectedPetsInHome}
                            setSelectedPetsInHome={setSelectedPetsInHome}
                            selectedReviews={selectedReviewScore}
                            setSelectedReviews={setSelectedReviewScore}
                            sliderRateValue={sliderRateValue}
                            setSliderRateValue={setSliderRateValue}
                        />
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                                gap: 3,
                                width: 'calc(100% - 352px)',
                                '@media (max-width: 1100px)': {
                                    width: '100%',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    gap: 2.5,
                                    width: '100%',
                                    paddingRight: '45px',
                                    '@media (max-width: 450px)': {
                                        flexWrap: 'wrap',
                                        paddingRight: 0,
                                    },
                                }}
                            >
                                <MuiLink
                                    component="button"
                                    className="relative flex flex-row items-center justify-center gap-[8px] text-left font-inter"
                                    onClick={() => setMapOpen(true)} // Open the map popup
                                    style={{
                                        marginRight: 0,
                                        textDecoration: 'none',
                                        color: '#006CBF',
                                    }}
                                >
                                    <img className="w-8 relative h-10 overflow-hidden shrink-0" alt="Map Pin Icon"
                                        src="/assets/icons/map-pin.svg" />
                                    <b className="relative leading-[150%] text-[20px]">Show on map</b> {/* Increased text size here */}
                                </MuiLink>
                            </Box>

                            <Box sx={{
                                width: '100%',
                                backgroundColor: 'background-color-primary',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        textAlign: 'left',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            height: '58px',
                                            fontSize: '24px',
                                            fontWeight: 'bold',
                                            fontFamily: 'inter',
                                            color: 'black',
                                            boxSizing: 'border-box',
                                            mb: '16px',
                                        }}
                                    >
                                        Popular Caregivers Nearby
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
                                    {filteredBusinesses.slice(0, numResultsToShow).map((business, index) => (
                                        <Card
                                            key={index}
                                            business={business}
                                            businessAverageReview={businessAverageReviews[business.id]}
                                            businessReviewsCount={businessReviewsCounts[business.id]}
                                            propFlex="unset"
                                            propAlignSelf="stretch"
                                            selectedService={selectedServices}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={showMoreResults}
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
                                color: '#FFFFFF',
                                '&:hover': {
                                    backgroundColor: 'cornflowerblue',
                                },
                            }}
                        >
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'Bold',
                                fontFamily: 'Inter',
                                textAlign: 'left',
                                display: 'inline-block',
                                minWidth: '78px',
                            }}>
                                Show More Results
                            </div>
                        </Button>
                    </Box>
                </Box>

                <Dialog
                    open={mapOpen}
                    onClose={() => setMapOpen(false)}
                    fullWidth
                    maxWidth="lg"
                >
                    <DialogTitle>Business Map</DialogTitle>
                    <DialogContent>
                        <MapComponent businesses={filteredBusinesses} />
                    </DialogContent>
                </Dialog>
            </Box>
        </>
    );
};

export default WebSearchPage;
