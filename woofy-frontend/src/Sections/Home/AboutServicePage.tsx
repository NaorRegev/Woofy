import React, { FunctionComponent, useMemo, CSSProperties } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export type AboutServicePageType = {
    className?: string;
};

const AboutServicePage: FunctionComponent<AboutServicePageType> = ({
    className = "",
}) => {
    const navigate = useNavigate();

    const FrameComponent = ({
        className = "",
        iconSearch,
        heading,
        text,
        propMinWidth,
        propMinWidth1,
    }: {
        className?: string;
        iconSearch?: string;
        heading?: string;
        text?: string;
        propMinWidth?: CSSProperties["minWidth"];
        propMinWidth1?: CSSProperties["minWidth"];
    }) => {
        const heading1Style: CSSProperties = useMemo(() => {
            return {
                minWidth: propMinWidth,
            };
        }, [propMinWidth]);

        const text1Style: CSSProperties = useMemo(() => {
            return {
                minWidth: propMinWidth1,
            };
        }, [propMinWidth1]);

        return (
            <Box
                className={className}
                sx={{
                    alignSelf: "stretch",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    justifyContent: "start",
                    maxWidth: "100%",
                    textAlign: "left",
                    color: "text.primary",
                }}
            >
                <Box
                    sx={{
                        alignSelf: "stretch",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "start",
                        justifyContent: "start",
                        maxWidth: "100%",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            height: 48,
                            width: 48,
                            objectFit: "cover",
                            flexShrink: 0,
                            maxWidth: "100%",
                        }}
                        alt=""
                        src={iconSearch}
                    />
                    <Typography
                        component="b"
                        sx={{
                            flex: 1,
                            lineHeight: "140%",
                            fontWeight: "bold",
                            display: "inline-block",
                            minWidth: "53px",
                            maxWidth: "100%",
                            fontSize: { xs: "16px", md: "20px" },
                            ...heading1Style,
                        }}
                    >
                        {heading}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "start",
                        justifyContent: "start",
                        maxWidth: "100%",
                        mt: -0.5,
                        typography: "body1",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            height: "120px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            pt: 2,
                            pb: 0,
                            boxSizing: "border-box",
                            ml: 3,
                        }}
                    >
                        <Box
                            sx={{
                                width: "0.5px",
                                flex: 1,
                                bgcolor: "text.primary",
                                borderRight: 2,
                                borderColor: "text.primary",
                            }}
                        />
                    </Box>
                    <Typography
                        component="div"
                        sx={{
                            flex: 1,
                            lineHeight: "150%",
                            display: "inline-block",
                            minWidth: "343px",
                            maxWidth: "100%",
                            ...text1Style,
                        }}
                    >
                        {text}
                    </Typography>
                </Box>
            </Box>
        );
    };

    return (
        <Box
            component="section"
            sx={{
                width: "100%",
                backgroundColor: "background-color-primary",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                flexWrap: "wrap",
                alignItems: "start",
                justifyContent: "start",
                py: { xs: 4, md: 16 },  
                px: { xs: 2, md: 16 },
                boxSizing: "border-box",
                gap: { xs: 4, md: 8 },
                maxWidth: "100%",
                textAlign: "left",
                color: "text-primary",
                mt: 4,
            }}
            className={className}
        >
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                    gap: { xs: 4, md: 4 },  
                    minWidth: { xs: "100%", md: "400px" },
                    maxWidth: "100%",
                }}
            >
                <Box
                    sx={{
                        alignSelf: "stretch",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "start",
                        gap: 2,
                    }}
                >
                    <Typography
                        component="div"
                        sx={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "18px",
                            fontWeight: "600",
                            lineHeight: "150%",
                        }}
                    >
                        Find the Perfect Care for You
                    </Typography>

                    <Typography
                        component="h1"
                        sx={{
                            m: 0,
                            lineHeight: "120%",
                            fontWeight: "bold",
                            fontSize: { xs: "32px", md: "48px" },
                            fontFamily: "Inter, sans-serif",
                            mb: 1.5,
                        }}
                    >
                        <span>Discover How Our</span>
                        <br />
                        <span>Dog Care Platform Works</span>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "start",
                        pt: 1,  
                        pb: 0,
                    }}
                >
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
                                backgroundColor: 'grey.200',
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
                                fontSize: { xs: '14px', md: '18px' }, // Responsive font size
                                lineHeight: '120%',
                                fontWeight: 'bold',
                                color: 'black',
                                textAlign: 'left',
                                minWidth: '50px',
                            }}
                        >
                            Get Started
                        </Typography>
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 2,
                    minWidth: { xs: "100%", md: "400px" },
                    maxWidth: "100%",
                }}
            >
                <FrameComponent
                    iconSearch="/icon--search2.svg"
                    heading="Search"
                    text="Easily search for trusted dog boardings, day cares, sitters, and walkers"
                />
                <FrameComponent
                    iconSearch="/icon--briefcasealt.svg"
                    heading="Book"
                    text="Book services with just a few clicks"
                    propMinWidth="38px"
                    propMinWidth1="212px"
                />
                <FrameComponent
                    iconSearch="/icon--bone.svg"
                    heading="Manage"
                    text="Manage appointments and dog care details all in one place"
                    propMinWidth="61px"
                    propMinWidth1="343px"
                />
                <Box
                    sx={{
                        alignSelf: "stretch",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "start",
                        maxWidth: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            maxWidth: "100%",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <Box
                            component="img"
                            sx={{
                                height: 48,
                                width: 48,
                                objectFit: "cover",
                                flexShrink: 0,
                                maxWidth: "100%",
                            }}
                            loading="lazy"
                            alt=""
                            src="/icon--donateheart1.svg"
                        />
                        <Typography
                            component="b"
                            sx={{
                                flex: 1,
                                lineHeight: "140%",
                                fontWeight: "bold",
                                display: "inline-block",
                                minWidth: "66px",
                                maxWidth: "100%",
                                fontSize: { xs: "16px", md: "20px" },
                            }}
                        >
                            Connect
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "start",
                            justifyContent: "end",
                            maxWidth: "100%",
                            ml: 8.2,
                            typography: "body1",
                        }}
                    >
                        <Typography
                            component="div"
                            sx={{
                                width: "528px",
                                lineHeight: "150%",
                                display: "inline-block",
                                maxWidth: "100%",
                            }}
                        >
                            Connect with dog care providers who love dogs as much as you do
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AboutServicePage;
