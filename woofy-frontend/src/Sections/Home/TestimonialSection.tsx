import React, { FunctionComponent } from 'react';
import { Box, Typography, Avatar } from '@mui/material';

export type TestimonialSectionType = {
    className?: string;
};

export type WoofyReviewType = {
    className?: string;
    avatarImage?: string;
    name?: string;
    date?: string;
    quote?: string;
};

const WoofyReview: FunctionComponent<WoofyReviewType> = ({
                                                             className = "",
                                                             avatarImage,
                                                             name = "Name Surname",
                                                             date = "Date",
                                                             quote,
                                                         }) => {
    return (
        <Box
            className={className}
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "start",
                py: 2,
                px: 4,
                gap: 3,
                minWidth: 280,
                maxWidth: "100%",
                textAlign: "left",
                fontSize: "18px",
                color: "text.primary",
                fontFamily: "Roboto, sans-serif",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 2.5,
                    flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
            >
                <Avatar
                    src={avatarImage}
                    alt=""
                    sx={{ width: 56, height: 56 }}
                />
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start" }}>
                    <Typography
                        variant="body1"
                        component="b"
                        sx={{ fontWeight: "bold", minWidth: 119 }}
                    >
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{ minWidth: 36 }}>
                        {date}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                    justifyContent: "start",
                    gap: 0.5,
                }}
            >
                {[...Array(5)].map((_, index) => (
                    <img
                        key={index}
                        src="/vector.svg"
                        alt=""
                        style={{ width: 20, height: 19 }}
                    />
                ))}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start", fontSize: "1.125rem" }}>
                <blockquote style={{ margin: 0, width: "100%", lineHeight: "1.5" }}>
                    {quote}
                </blockquote>
            </Box>
        </Box>
    );
};

const TestimonialSection: FunctionComponent<TestimonialSectionType> = ({
                                                                           className = "",
                                                                       }) => {
    return (
        <Box
            component="section"
            className={className}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                p: { xs: 2, md: 4 },
                gap: { xs: 4, md: 8 },
                maxWidth: "100%",
                textAlign: "center",
                fontSize: "2.25rem",
                color: "text.primary",
                fontFamily: "Roboto, sans-serif",
                backgroundColor: "background.paper",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 560,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 3,
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h3"
                    component="b"
                    sx={{
                        fontWeight: "bold",
                        lineHeight: 1.2,
                        fontSize: { xs: "2.5rem", md: "3.5rem" },
                    }}
                >
                    Happy Customers
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: "18px",
                        lineHeight: "1.5",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                    }}
                >
                    Read what our satisfied dog owners have to say about Woofy
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "start",
                    justifyContent: "center",
                    gap: { xs: 4, md: 8 },
                    p: { xs: 2, md: 4 },
                }}
            >
                <WoofyReview
                    avatarImage="/Naor.png"
                    name="Naor Regev"
                    date="March 25, 2024"
                    quote={`"Woofy's dog care platform is a game-changer! I found the perfect dog sitter for my furry friend."`}
                />
                <WoofyReview
                    avatarImage="/Tal.png"
                    name="Tal Tribitch"
                    date="April 5, 2024"
                    quote={`"The booking process was so easy and convenient. Highly recommend!"`}
                />
                <WoofyReview
                    avatarImage="/Yuval.jpeg"
                    name="Yuval Ben Eliyahu"
                    date="May 20, 2024"
                    quote={`"I love how I can read reviews and compare different pet care providers."`}
                />
                <WoofyReview
                    avatarImage="/Nadav.jpg"
                    name="Nadav Lior"
                    date="June 15, 2024"
                    quote={`"Fantastic service! My dog had a great time and I had peace of mind."`}
                />
            </Box>
        </Box>
    );
};

export default TestimonialSection;
