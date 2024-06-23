import React from "react";
import { Box, Typography } from "@mui/material";
import BusinessUpComingBookings from "./BusinessUpcomingBookingsView";

const BusinessUpcomingBookingsSection: React.FC = () => {
    return (
        <>
            <Box sx={{
                width: '100%',
                backgroundColor: '#006cbf',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'start',
                pt: 12,
                px: 2.5,
                pb: 8.5,
                gap: 0
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    width: '100%',
                    flexWrap: 'wrap',
                    '@media (min-width: 750px)': { flexWrap: 'wrap' }
                }}>
                    <Typography variant="h1" sx={{
                        fontSize: '48px!important',
                        lineHeight: '120%',
                        fontFamily: 'inter',
                        color: 'white',
                        textAlign: 'center',
                        position: 'relative'
                    }}>
                        Manage Your Bookings
                    </Typography>
                </Box>
            </Box>
            <BusinessUpComingBookings />
        </>
    );
};

export default BusinessUpcomingBookingsSection;
