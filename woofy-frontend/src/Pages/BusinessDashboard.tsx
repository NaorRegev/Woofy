import React, {FunctionComponent, useContext} from "react";
import RegisterYourBusinessCTA from "../Sections/User/Business/RegisterYourBusinessCTA";
import {UserContext} from "../provider/UserProvider";
import {Box, Typography, Grid} from "@mui/material";
import BusinessUpComingBookings from "../Sections/User/Business/UpComingBookings/BusinessUpcomingBookingsView";
import {Helmet} from "react-helmet-async";

const BusinessDashboard: FunctionComponent = () => {
    const {userDetails} = useContext(UserContext);

    return (
        <>
            <Helmet>
                <title> Business Dashboard | Woofy </title>
            </Helmet>
            <Box
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "background.default", // Ensure the background color of the whole page is set to default
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        backgroundColor: "#006cbf",
                        pt: 9,
                        px: 5,
                        pb: 7.5,
                        gap: 10.5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxSizing: "border-box",
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
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "5px",
                            width: "100%",
                            flexWrap: "wrap",
                            "@media (min-width: 750px)": {flexWrap: "wrap"},
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: {xs: "24px!important", md: "48px!important"}, // Responsive font size
                                lineHeight: "120%",
                                fontFamily: "inter",
                                color: "white",
                                textAlign: "center",
                                position: "relative",
                            }}
                        >
                            Welcome Back,
                        </Typography>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: {xs: "24px!important", md: "48px!important"}, // Responsive font size
                                lineHeight: "120%",
                                fontFamily: "inter",
                                color: "white",
                                textAlign: "center",
                                position: "relative",
                            }}
                        >
                            {userDetails ? `${userDetails.firstName} ${userDetails.lastName}` : "Guest User"}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        py: 4, // Add some vertical padding for better spacing
                    }}
                >
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12}>
                            <RegisterYourBusinessCTA/>
                        </Grid>
                        <Grid item xs={12}>
                            <BusinessUpComingBookings/>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default BusinessDashboard;
