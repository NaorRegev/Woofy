import React, {FunctionComponent, useState, useEffect} from "react";
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import {BUSINESS_TYPES} from "../../../../models/Enums/Enums";
import SelectServiceTypeComponent from "../../selectButtons/SelectServiceTypeComponent";
import BusinessUpcomingBookingCard from "./BusinessUpcomingBookingCard";
import {api} from "../../../../api/api";
import defaultProfilePicture from "../../../../../public/avatar-image@2x.png";
import {getImage} from "../../../../components/image/imageComponent";
import {toast} from "react-toastify";
import {Helmet} from "react-helmet-async";

const BusinessUpComingBookings: FunctionComponent = () => {
    const [selectedServices, setSelectedServices] = useState<BUSINESS_TYPES | null>(null);
    const [bookings, setBookings] = useState([]);
    const [displayedBookings, setDisplayedBookings] = useState(3);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const handleViewAll = () => {
        setSelectedServices(null);
    };

    const handleShowMore = () => {
        setDisplayedBookings(prev => prev + 3);
    };

    const handleShowLess = () => {
        setDisplayedBookings(prev => (prev - 3 < 3 ? 3 : prev - 3));
    };

    const handleCancelBooking = (booking) => {
        setSelectedBooking(booking);
        setOpenDialog(true);
    };

    const handleConfirmCancel = () => {
        if (selectedBooking) {
            cancelAppointment(selectedBooking.businessType, selectedBooking.appointmentId);
            setOpenDialog(false);
            setSelectedBooking(null);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedBooking(null);
    };

    const cancelAppointment = async (businessType, appointmentId) => {
        try {
            await api.delete(`appointment/${serviceTypeMapping[businessType]}/delete-appointment/${appointmentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
                }
            });
            toast.success('Appointment cancelled successfully');

            setBookings(prevBookings => prevBookings.filter(booking => booking.appointmentId !== appointmentId));
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            toast.error('Failed to cancel appointment');
        }
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await api.get("appointment/get-all");
                const bookingsWithDogDetails = await Promise.all(
                    res.data.map(async (booking) => {
                        let dogProfileImage = defaultProfilePicture;
                        let dogDetails = {};
                        try {
                            const dogResponse = await api.post('dogs/getByUserId', {id: booking.userId});
                            if (dogResponse.data) {
                                if (dogResponse.data.profilePhotoID) {
                                    dogProfileImage = await getImage(dogResponse.data.profilePhotoID);
                                }
                                dogDetails = dogResponse.data;
                            }
                        } catch (error) {
                            console.error('Error fetching dog details', error);
                        }
                        return {
                            ...booking,
                            profileImage: dogProfileImage,
                            dogDetails,
                        };
                    })
                );
                const currentDateTime = new Date();
                const futureBookings = bookingsWithDogDetails.filter(booking => new Date(booking.date) >= currentDateTime);
                console.log(`futureBooking: ${JSON.stringify(futureBookings)}`);
                setBookings(futureBookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <>
            <Helmet>
                <title> Upcoming Bookings | Woofy </title>
            </Helmet>
            <Box
                className="self-stretch overflow-hidden flex flex-col items-center justify-start pt-12 px-5 pb-8 box-border gap-5 max-w-full text-center text-4xl text-text-primary font-medium">
                <Box className="w-full max-w-[768px] flex flex-col items-start justify-start">
                    <Box className="self-stretch flex flex-col items-center justify-start">
                        <Typography
                            style={{fontFamily: 'Inter', fontSize: '40px', fontWeight: 'bold'}}
                            className="m-0 self-stretch relative leading-[58px] mq450:text-10xl mq450:leading-[35px] mq1050:text-19xl mq1050:leading-[46px]">
                            Upcoming Bookings
                        </Typography>
                    </Box>
                </Box>

                <Box className="w-full max-w-[768px] flex flex-row items-center justify-center mb-3"
                     sx={{alignItems: "center"}}>
                    <SelectServiceTypeComponent setSelectedServices={setSelectedServices}
                                                selectedServices={selectedServices}/>
                    <Button
                        onClick={handleViewAll}
                        variant={selectedServices === null ? "contained" : "outlined"}
                        sx={{
                            marginRight: 10,
                            marginTop: 2,
                            width: '130px',
                            height: '45px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textTransform: 'none',
                            borderRadius: '30px',
                            fontFamily: 'Inter',
                            fontSize: '16px',
                            fontWeight: 'regular',
                            color: selectedServices === null ? 'white' : 'black',
                            borderColor: selectedServices !== null ? 'grey.500' : 'primary.main',
                            backgroundColor: selectedServices === null ? '#006CBF' : 'transparent',
                            '&:hover': {
                                borderColor: selectedServices !== null ? 'grey.700' : '#006CBF',
                                backgroundColor: selectedServices === null ? '#0056A4' : 'transparent',
                            },
                        }}
                    >
                        <Box
                            className={`ServiceTypeButtonText ${selectedServices === null ? "white-text" : ""}`}
                            sx={{marginLeft: 0, whiteSpace: 'nowrap'}}
                        >
                            View All
                        </Box>
                    </Button>
                </Box>

                <Box className="w-full max-w-[768px] flex flex-col items-center justify-center gap-7 text-left text-xl">
                    <Box
                        className="self-stretch flex flex-col items-start justify-start border-solid border-text-primary pb-3">
                        <Box
                            className="self-stretch flex flex-col items-center justify-start gap-8 max-w-full border-solid border-gray-500 pt-7">
                            {bookings
                                .filter(booking => selectedServices === null || booking.businessType === selectedServices)
                                .slice(0, displayedBookings)
                                .map(booking => (
                                    <BusinessUpcomingBookingCard
                                        key={booking.appointmentId}
                                        icon={getIconForType(booking.businessType)}
                                        businessType={booking.businessType}
                                        customerName={booking.customerName}
                                        date={booking.date}
                                        endDate={booking.endDate}
                                        startTime={booking.startTime}
                                        customerProfilePhotoID={booking.customerProfilePhotoID}
                                        profileImage={booking.profileImage}
                                        dogName={booking.dogDetails.dogName}
                                        dogDetails={booking.dogDetails}
                                        onCancel={() => handleCancelBooking(booking)}
                                    />
                                ))}
                        </Box>
                    </Box>

                    <Box className="flex flex-row gap-5">
                        {displayedBookings < bookings.length && (
                            <Button onClick={handleShowMore} variant="outlined"
                                    className="rounded-11xl border border-solid border-gray-300 hover:bg-gray-500 hover:border-gray-100">
                                Show More
                            </Button>
                        )}
                        {displayedBookings > 3 && (
                            <Button onClick={handleShowLess} variant="outlined"
                                    className="rounded-11xl border border-solid border-gray-300 hover:bg-gray-500 hover:border-gray-100">
                                Show Less
                            </Button>
                        )}
                    </Box>
                </Box>

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Cancel Booking"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to cancel this booking?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            No
                        </Button>
                        <Button onClick={handleConfirmCancel} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
};

const getIconForType = (type) => {
    switch (type) {
        case BUSINESS_TYPES.BOARDING:
            return "/boarding-icon--moon.svg";
        case BUSINESS_TYPES.DAY_CARE:
            return "/icon--sun.svg";
        case BUSINESS_TYPES.DOG_SITTER:
            return "/sitting-icon--bed.svg";
        case BUSINESS_TYPES.DOG_WALK:
            return "/walking-icon--walk.svg";
        default:
            return "/placeholder-image@2x.png";
    }
};

export default BusinessUpComingBookings;
