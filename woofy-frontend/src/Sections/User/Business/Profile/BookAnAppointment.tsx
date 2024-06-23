import React, { useState, useEffect } from 'react';
import { BUSINESS_TYPES } from '../../../../models/Enums/Enums';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fDate } from '../../../../utils/format-time';
import { api } from '../../../../api/api';
import { formatEnumValue } from "../../../../utils/format-enum-text";
import { useNotifications } from "../../../../provider/NotificationContext";
import { useRouter } from "../../../../routes/hooks";
import { useAuth } from "../../../../provider/AuthProvider";

interface Business {
    id: number;
    businessName: string;
}

interface Slot {
    startTime: string;
    endTime: string;
}

interface Props {
    business: Business;
    selectedService: string;
}

const BookAnAppointment: React.FC<Props> = ({ business, selectedService }) => {
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableSlots, setAvailableSlots] = useState<Record<string, number> | Slot[] | number>([]);
    const [dayCareAvilability, setDayCareAvailability] = useState<number>(0);
    const [isFetching, setIsFetching] = useState(false);
    const [isAvailabilityFetched, setIsAvailabilityFetched] = useState(false);
    const { addNotification } = useNotifications();
    const router = useRouter();
    const { token } = useAuth();
    const { userDetails } = useAuth();
    const servicePrices = {
        [BUSINESS_TYPES.BOARDING]: business.boardingEntity?.price,
        [BUSINESS_TYPES.DAY_CARE]: business.dayCareEntity?.price,
        [BUSINESS_TYPES.DOG_SITTER]: business.dogSitterEntity?.price,
        [BUSINESS_TYPES.DOG_WALK]: business.dogWalkerEntity?.price,
    };

    useEffect(() => {
        setAvailableSlots([]);
        setIsAvailabilityFetched(false);
    }, [selectedDate, endDate]);

    useEffect(() => {
        setEndDate(null);
        setSelectedDate(null);
        setAvailableSlots([]);
        setIsAvailabilityFetched(false);
    }, [selectedService]);

    const validateFields = () => {
        let isValid = true;

        if (!endDate && selectedService === BUSINESS_TYPES.BOARDING) {
            toast.error('End Date is required');
            isValid = false;
        }
        if (selectedService === BUSINESS_TYPES.BOARDING && selectedDate && endDate && selectedDate >= endDate) {
            toast.error('Start Date must be before End Date');
            isValid = false;
        }
        if (!selectedDate) {
            toast.error('Selected Date is required');
            isValid = false;
        }
        return isValid;
    };

    const handleFindAvailability = async () => {
        if (!validateFields()) {
            return;
        }

        setIsFetching(true);

        try {
            let response;
            switch (selectedService) {
                case BUSINESS_TYPES.BOARDING:
                    response = await api.post('/appointment/boarding/available-capacity-by-date-range', {
                        startDate: fDate(selectedDate!, 'yyyy-MM-dd'),
                        endDate: fDate(endDate!, 'yyyy-MM-dd'),
                        businessId: business.id,
                    });
                    setAvailableSlots(response.data);
                    break;
                case BUSINESS_TYPES.DAY_CARE:
                    response = await api.post('/appointment/day-care/available-capacity-by-date', {
                        date: fDate(selectedDate!, 'yyyy-MM-dd'),
                        businessId: business.id,
                    });
                    setDayCareAvailability(response.data);
                    break;
                case BUSINESS_TYPES.DOG_SITTER:
                case BUSINESS_TYPES.DOG_WALK:
                    response = await api.post(`/appointment/${selectedService === BUSINESS_TYPES.DOG_SITTER ? 'dog-sitter' : 'dog-walker'}/available-hours-by-business`, {
                        date: fDate(selectedDate!, 'yyyy-MM-dd'),
                        businessId: business.id,
                    });
                    setAvailableSlots(response.data);
                    break;
                default:
                    throw new Error('Invalid service type');
            }
            setIsAvailabilityFetched(true);
        } catch (error) {
            console.error('Error fetching available slots:', error);
            toast.error('Error fetching available slots');
        } finally {
            setIsFetching(false);
        }
    };

    const handleSetAppointment = async (startDate: Date, endDate: Date | null, startTime?: string, endTime?: string) => {
        if (!token) {
            router.push('/login')
        }
        try {
            let res = await api.post('dogs/getByUserId', { id: userDetails.id })
            if (res.data.length === 0) {
                router.push('/dog-register')
            }
        } catch (error) {
            router.push('/dog-register')
        }

        const appointmentData = {
            businessId: business.id,
            date: fDate(startDate, 'yyyy-MM-dd'),
            endDate: endDate ? fDate(endDate, 'yyyy-MM-dd') : null,
            startTime: startTime || null,
            endTime: endTime || null,
        };

        try {
            let response;
            switch (selectedService) {
                case BUSINESS_TYPES.BOARDING:
                    response = await api.post('/appointment/boarding/create-appointment', appointmentData);
                    break;
                case BUSINESS_TYPES.DAY_CARE:
                    response = await api.post('/appointment/day-care/create-appointment', appointmentData);
                    break;
                case BUSINESS_TYPES.DOG_SITTER:
                    response = await api.post('/appointment/dog-sitter/create-appointment', appointmentData);
                    break;
                case BUSINESS_TYPES.DOG_WALK:
                    response = await api.post('/appointment/dog-walker/create-appointment', appointmentData);
                    break;
                default:
                    throw new Error('Invalid service type');
            }
            console.log('Appointment created:', response.data);
            addNotification({
                title: 'Appointment Added',
                description: `Your appointment in ${business.businessName} for the ${formatEnumValue(selectedService)} service has been booked successfully.`,
                type: 'appointment_added',
                isUnRead: true,
            });
            router.push('/bookings');
        } catch (error) {
            console.error('Error creating appointment:', error);
            toast.error('Error creating appointment');
        }
    };

    const calculateTotalPrice = (startDate: Date, endDate: Date | null): number => {
        if (!startDate || !endDate) return 0;
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / oneDay)) + 1;
        return diffDays * servicePrices[selectedService];
    };

    const groupFullyBookedDates = (dates: string[]): { start: string, end: string }[] => {
        const sortedDates = dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        const ranges: { start: string, end: string }[] = [];
        let start = sortedDates[0];
        let end = sortedDates[0];

        for (let i = 1; i < sortedDates.length; i++) {
            const current = new Date(sortedDates[i]);
            const previous = new Date(sortedDates[i - 1]);
            const diff = (current.getTime() - previous.getTime()) / (1000 * 3600 * 24);

            if (diff > 1) {
                ranges.push({ start, end });
                start = sortedDates[i];
            }
            end = sortedDates[i];
        }
        ranges.push({ start, end });

        return ranges;
    };

    const renderAvailableSlots = () => {
        if (selectedService === BUSINESS_TYPES.BOARDING) {
            const dates = Object.keys(availableSlots as Record<string, number>);
            const fullyBookedDates = dates.filter(date => (availableSlots as Record<string, number>)[date] <= 0);

            if (fullyBookedDates.length > 0) {
                const ranges = groupFullyBookedDates(fullyBookedDates);
                const suggestions = [];

                // Suggest before first fully booked range
                if (selectedDate && new Date(selectedDate) < new Date(ranges[0].start)) {
                    const suggestionEndDate = new Date(new Date(ranges[0].start).getTime() - (1000 * 3600 * 24));
                    if (new Date(selectedDate) <= suggestionEndDate) {
                        suggestions.push({
                            start: selectedDate,
                            end: suggestionEndDate
                        });
                    }
                }

                // Suggest between fully booked ranges
                for (let i = 0; i < ranges.length - 1; i++) {
                    const endRange = new Date(ranges[i].end);
                    const startNextRange = new Date(ranges[i + 1].start);

                    if (startNextRange.getTime() - endRange.getTime() > (1000 * 3600 * 24)) {
                        suggestions.push({
                            start: new Date(endRange.getTime() + (1000 * 3600 * 24)),
                            end: new Date(startNextRange.getTime() - (1000 * 3600 * 24))
                        });
                    }
                }

                // Suggest after last fully booked range
                if (endDate && new Date(endDate) > new Date(ranges[ranges.length - 1].end)) {
                    const suggestionStartDate = new Date(new Date(ranges[ranges.length - 1].end).getTime() + (1000 * 3600 * 24));
                    if (suggestionStartDate <= new Date(endDate)) {
                        suggestions.push({
                            start: suggestionStartDate,
                            end: endDate
                        });
                    }
                }

                // Filter out suggestions that are fully booked
                const validSuggestions = suggestions.filter(suggestion => {
                    const suggestionDates = [];
                    for (let d = new Date(suggestion.start); d <= suggestion.end; d.setDate(d.getDate() + 1)) {
                        suggestionDates.push(d.toISOString().split('T')[0]);
                    }
                    return !suggestionDates.some(date => fullyBookedDates.includes(date));
                });

                return (
                    <div>
                        <Typography variant="body1" color="error" style={{
                            fontWeight: '600',
                            fontSize: '18px',
                            marginBottom: 20,
                            marginLeft: '-270px'
                        }}>
                            This business has no availability from {ranges.map(range => {
                            const startDate = new Date(range.start).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit'
                            });
                            const endDate = new Date(range.end).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit'
                            });
                            return startDate === endDate ? startDate : `${startDate} to ${endDate}`;
                        }).join(', ')}
                        </Typography>
                        {validSuggestions.map((suggestion, index) => (
                            <div key={index}>
                                <Typography variant="body1"
                                            style={{fontWeight: '600', marginBottom: 20, marginLeft: '-262px'}}>
                                    These dates are still available:
                                    <span style={{
                                        color: '#006CBF',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        marginLeft: '4px'
                                    }}>
                                        {suggestion.start.toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: '2-digit'
                                        })} -
                                        {suggestion.end.toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: '2-digit'
                                        })}
                                    </span>
                                </Typography>

                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '158px',
                                    marginRight: '24px'
                                }}>
                                    <Typography
                                        variant="body1"
                                        style={{
                                            fontSize: '16px',
                                            fontWeight: '600', // 600 corresponds to semibold
                                        }}
                                    >
                                        {`Price for ${Math.ceil((new Date(suggestion.end) - new Date(suggestion.start)) / (1000 * 60 * 60 * 24))} ${Math.ceil((new Date(suggestion.end) - new Date(suggestion.start)) / (1000 * 60 * 60 * 24)) === 1 ? 'Night' : 'Nights'
                                        }: ${calculateTotalPrice(suggestion.start, suggestion.end)} ₪`}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        onClick={() => handleSetAppointment(suggestion.start, suggestion.end)}
                                        sx={{
                                            borderRadius: '30px',
                                            backgroundColor: '#006CBF',
                                            '&:hover': {
                                                backgroundColor: '#0056A4',
                                            },
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            whiteSpace: 'nowrap', // Prevent text from wrapping
                                            padding: '0 16px', // Add padding for some spacing
                                            marginLeft: '24px' // Add margin between the text and the button
                                        }}
                                    >
                                        Book now
                                    </Button>
                                </Box>
                            </div>

                        ))}
                    </div>
                );
            } else if (selectedDate && endDate) {
                const fullyBookedInRange = dates.some(date => (availableSlots as Record<string, number>)[date] <= 0 && new Date(date) >= selectedDate && new Date(date) <= endDate);
                if (fullyBookedInRange) {
                    return (
                        <Typography variant="h6" color="error">
                            The selected date range includes fully booked dates.
                        </Typography>
                    );
                }
                return (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start', // Align items to the left
                        }}
                    >
                        <Typography
                            variant="body1"
                            style={{
                                marginLeft: '150px',
                                marginRight: '24px',
                                fontSize: '16px',
                                fontWeight: '600' // 600 corresponds to semibold
                            }}
                        >
                            {`Price for ${Math.ceil((new Date(endDate) - new Date(selectedDate)) / (1000 * 60 * 60 * 24))} ${Math.ceil((new Date(endDate) - new Date(selectedDate)) / (1000 * 60 * 60 * 24)) === 1 ? 'Night' : 'Nights'
                            }: ${calculateTotalPrice(selectedDate, endDate)} ₪`}
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={() => handleSetAppointment(selectedDate, endDate)}
                            sx={{
                                borderRadius: '30px',
                                backgroundColor: '#006CBF',
                                '&:hover': {
                                    backgroundColor: '#0056A4',
                                },
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                whiteSpace: 'nowrap', // Prevent text from wrapping
                                padding: '0 16px', // Add padding for some spacing
                            }}
                        >
                            Book now
                        </Button>
                    </div>


                );
            }
        } else if (selectedService === BUSINESS_TYPES.DAY_CARE) {
            const date = selectedDate ? selectedDate.toLocaleDateString() : '';
            const slots = dayCareAvilability;
            return (
                <div>
                    {slots > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1"
                                        style={{ fontWeight: '600', marginLeft: '272px', marginRight: '16px' }}>
                                Total Price: {servicePrices[selectedService]} ₪
                                {slots < 10 && (
                                    <span style={{ fontSize: '16px', fontWeight: 'normal', marginLeft: '8px' }}>
                                        ({slots} left on this day)
                                    </span>
                                )}
                            </Typography>

                            <Button
                                variant="contained"
                                onClick={() => handleSetAppointment(selectedDate!, selectedDate!)}
                                sx={{
                                    borderRadius: '30px',
                                    backgroundColor: '#006CBF',
                                    '&:hover': {
                                        backgroundColor: '#0056A4',
                                    },
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    whiteSpace: 'nowrap',
                                    padding: '0 16px',
                                }}
                            >
                                Book now
                            </Button>
                        </div>
                    ) : (
                        <Box>
                            <Typography
                                variant="body1"
                                color="error"
                                style={{
                                    fontWeight: '600',
                                    fontSize: '18px',
                                    marginBottom: 0,

                                }}
                            >
                                This business has no availability on this day
                            </Typography>
                            <Typography
                                variant="body1"
                                style={{
                                    color: 'black',
                                    fontWeight: '550',
                                    fontSize: '16px',
                                    marginTop: 20
                                }}
                            >
                                Please try another day
                            </Typography>
                        </Box>


                    )}
                </div>

            );
        } else if ((selectedService === BUSINESS_TYPES.DOG_SITTER || selectedService === BUSINESS_TYPES.DOG_WALK) && Array.isArray(availableSlots)) {
            if (availableSlots.length === 0) {
                return <Box>
                    <Typography
                        variant="body1"
                        color="error"
                        style={{
                            fontWeight: '600',
                            fontSize: '18px',
                            marginBottom: 0,

                        }}
                    >
                        This business has no availability on this day
                    </Typography>
                    <Typography
                        variant="body1"
                        style={{
                            color: 'black',
                            fontWeight: '550',
                            fontSize: '16px',
                            marginTop: 20
                        }}
                    >
                        Please try another day
                    </Typography>
                </Box>;
            }
            return (availableSlots as Slot[]).map((slot, index) => (
                <Box key={index} mb={4} sx={{ ml: '-103px' }}>
                    <Box display="flex" alignItems="center" justifyContent="center" sx={{ gap: '40px' }}>
                        <Typography
                            variant="body1"
                            style={{
                                fontWeight: '600',
                                fontSize: '16px'
                            }}
                        >
                            Appointment: {slot.startTime.split(':').slice(0, 2).join(':')} - {slot.endTime.split(':').slice(0, 2).join(':')}
                        </Typography>
                        <Typography
                            variant="body1"
                            style={{
                                fontWeight: '600',
                                fontSize: '16px'
                            }}
                        >
                            Price: {servicePrices[selectedService]} ₪
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => handleSetAppointment(selectedDate!, selectedDate!, slot.startTime, slot.endTime)}
                            sx={{
                                borderRadius: '30px',
                                backgroundColor: '#006CBF',
                                '&:hover': {
                                    backgroundColor: '#0056A4'
                                },
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                whiteSpace: 'nowrap',
                                padding: '0 16px',
                            }}
                        >
                            Book now
                        </Button>
                    </Box>
                </Box>
            ))
        }
        return null;
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    variant="h3"
                    sx={{
                        m: 0,
                        width: '100%',
                        fontSize: 'inherit',
                        lineHeight: '34px',
                        fontWeight: 'bold',
                        fontFamily: 'inherit',
                        textAlign: 'center'
                    }}
                >
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        {selectedService === BUSINESS_TYPES.BOARDING && (
                            <>
                                <Grid item>
                                    <DatePicker
                                        label="Start Date"
                                        value={selectedDate}
                                        minDate={new Date()} // Prevent selection of past dates
                                        onChange={(date) => setSelectedDate(date)}
                                        slots={{
                                            textField: (params) => <TextField {...params} />,
                                        }}
                                        format="dd.MM.yy"
                                    />
                                </Grid>
                                <Grid item>
                                    <DatePicker
                                        label="End Date"
                                        value={endDate}
                                        minDate={selectedDate ? new Date(selectedDate) : new Date()} // Prevent selection of past dates and ensure end date is after start date
                                        onChange={(date) => setEndDate(date)}
                                        slots={{
                                            textField: (params) => <TextField {...params} />,
                                        }}
                                        format="dd.MM.yy"
                                    />
                                </Grid>
                            </>
                        )}
                        {selectedService !== BUSINESS_TYPES.BOARDING && (
                            <Grid item>
                                <DatePicker
                                    label="Select Date"
                                    value={selectedDate}
                                    minDate={new Date()} // Prevent selection of past dates
                                    onChange={(date) => setSelectedDate(date)}
                                    slots={{
                                        textField: (params) => <TextField {...params} />,
                                    }}
                                    format="dd.MM.yy"
                                />
                            </Grid>
                        )}
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={handleFindAvailability}
                                sx={{
                                    borderRadius: '30px',
                                    backgroundColor: '#006CBF',
                                    '&:hover': {
                                        backgroundColor: '#0056A4',
                                    },
                                    width: '150px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    whiteSpace: 'nowrap', // Prevent text from wrapping
                                    ml: 1
                                }}
                                disabled={isFetching}
                            >
                                {isFetching ? 'Fetching...' : 'Find Availability'}
                            </Button>
                        </Grid>

                        {isAvailabilityFetched && (
                            <Grid item xs={40} style={{ marginTop: '30px' }}>
                                {renderAvailableSlots()}
                            </Grid>
                        )}
                    </Grid>
                </Typography>
                <ToastContainer />
            </div>
        </LocalizationProvider>

    );
};

export default BookAnAppointment;
