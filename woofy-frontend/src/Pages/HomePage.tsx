import React, { FunctionComponent } from "react";
import { Box } from "@mui/material";
import HeroPage from "../Sections/Home/HeroPage";
import AboutServicePage from "../Sections/Home/AboutServicePage";
import TestimonialSection from "../Sections/Home/TestimonialSection";
import { Helmet } from "react-helmet-async";

const HomePage: FunctionComponent = () => {
    return (
        <>
            <Helmet>
                <title> Home | Woofy </title>
            </Helmet>
            <Box
                sx={{
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                    lineHeight: "normal",
                    tracking: "normal",
                    gap: { xs: 2, md: 4 }, // Reduced gap
                    p: { xs: 2, md: 4 },
                }}
            >
                <HeroPage />
                <AboutServicePage />
                <TestimonialSection />
            </Box>
        </>
    );
};

export default HomePage;
