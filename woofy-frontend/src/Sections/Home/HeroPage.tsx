import React, { FunctionComponent } from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export type HeroPageType = {
    className?: string;
};

const HeroPage: FunctionComponent<HeroPageType> = ({ className = "" }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isTabletOrPhone = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            component="section"
            sx={{
                width: '100%',
                minHeight: '100vh',  // Ensure it takes the full viewport height
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: { xs: 'center', lg: 'stretch' },
                justifyContent: 'space-between',
                backgroundColor: 'background-color-primary',
                overflow: 'hidden',
                padding: 0,
                margin: 0,
            }}
            className={className}
        >
            <Box
                sx={{
                    flex: { xs: '1', lg: '0 1 40%' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center', // Center the container content
                    padding: { xs: 2, md: 4 },
                    minWidth: { lg: '300px' },
                    textAlign: 'left', // Ensure text is left-aligned
                }}
            >
                <Box sx={{ width: '100%', textAlign: 'left' }}>
                    <Typography
                        component="h1"
                        sx={{
                            lineHeight: '120%',
                            fontWeight: 'bold',
                            fontSize: { xs: '36px', md: '80px' }, // Adjust font size for better scaling
                            fontFamily: 'Inter, sans-serif',
                            mb: 1.5,
                            textAlign: 'left', // Ensure text is left-aligned
                        }}
                    >
                        <span>Find the</span>
                        <br />
                        <span style={{ color: '#006CBF' }}>perfect care</span>
                        <br />
                        <span>for your</span>
                        <br />
                        <span>furry friend</span>
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: '16px', md: '24px' }, // Adjust font size for better scaling
                            lineHeight: '150%',
                            mb: 4,
                            textAlign: 'left', // Ensure text is left-aligned
                        }}
                    >
                        <span>Discover trusted dog day cares, overnight</span>
                        <br />
                        <span>boardings, sitters, dog walkers near you.</span>
                        <br />
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'start', // Align buttons to start
                            gap: 2.5,
                            flexWrap: 'wrap', // Ensure buttons wrap if necessary
                        }}
                    >
                        <Button
                            sx={{
                                cursor: 'pointer',
                                border: 'none',
                                py: { xs: 1.5, md: 2 },
                                px: { xs: 3, md: 4 },
                                backgroundColor: '#006CBF',
                                borderRadius: '30px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#6495ED',
                                },
                                minWidth: 'fit-content', // Ensure button maintains its width
                                whiteSpace: 'nowrap', // Prevent button text from wrapping
                                fontSize: { xs: '14px', md: '18px' }, // Responsive font size
                            }}
                            onClick={() => navigate('/search-page')}
                        >
                            <Typography
                                sx={{
                                    lineHeight: '120%',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    textAlign: 'left',
                                    minWidth: '50px',
                                }}
                            >
                                Discover
                            </Typography>
                        </Button>
                        <Button
                            sx={{
                                cursor: 'pointer',
                                py: { xs: 1.5, md: 2 },
                                px: { xs: 3, md: 4 },
                                backgroundColor: 'transparent',
                                borderRadius: '30px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textTransform: 'none',
                                border: '1px solid',
                                borderColor: 'grey.500',
                                color: '#444444',
                                '&:hover': {
                                    backgroundColor: 'grey.100',
                                    borderColor: 'grey.700',
                                },
                                minWidth: 'fit-content', // Ensure button maintains its width
                                whiteSpace: 'nowrap', // Prevent button text from wrapping
                                fontSize: { xs: '14px', md: '18px' }, // Responsive font size
                            }}
                            onClick={() => navigate('/sign-up')}
                        >
                            <Typography
                                sx={{
                                    lineHeight: '120%',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textAlign: 'left',
                                    minWidth: '50px',
                                }}
                            >
                                Join Now
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    height: '100%',
                    margin: 0,
                    padding: 0,
                }}
            >
                <Box
                    component="img"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        margin: 0,
                        padding: 0,
                    }}
                    loading="lazy"
                    alt="Hero"
                    src="/HeroImage.jpg"
                />
            </Box>
        </Box>
    );
};

export default HeroPage;
