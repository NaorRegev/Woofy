import React from "react";
import { TextField, Box, Typography, Button } from '@mui/material';
import DogSizeInput from "../../selectButtons/DogSizeInput";
import { Size, WEEKDAYS } from "../../../../models/Enums/Enums";

type FormUpdate = {
    selectedSize: Size[];
    clickSizeHandlerDog: (size: Size) => void;
    selectedDays: WEEKDAYS[];
    clickWorkingDaysHandler: (day: WEEKDAYS) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const BusinessTypesBaseRegistration: React.FC<FormUpdate> = ({
    clickSizeHandlerDog,
    selectedSize,
    handleInputChange,
    selectedDays,
    clickWorkingDaysHandler
}) => {
    return (
        <Box component="form" sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <DogSizeInput selectedSize={selectedSize} onSizeClick={clickSizeHandlerDog} multiple={true} />
            <Typography
                sx={{
                    width: '100%',
                    position: 'relative',
                    fontSize: '16px',
                    lineHeight: '150%',
                    fontFamily: 'Inter',
                    fontWeight: 550,
                    color: 'text.primary',
                    textAlign: 'left',
                    display: 'inline-block',
                    marginTop: '8px',
                }}
            >
                Dog Capacity Per Day
            </Typography>

            <Typography
                sx={{
                    width: '100%',
                    position: 'relative',
                    fontSize: '16px',
                    lineHeight: '150%',
                    fontFamily: 'Inter',
                    fontWeight: 550,
                    color: 'text.primary',
                    textAlign: 'left',
                    display: 'inline-block',
                }}
            >
                About Yourself
            </Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Tell us about the Service..."
                name="about"
                onChange={handleInputChange}
            />
            <Typography
                sx={{
                    width: '100%',
                    position: 'relative',
                    fontSize: '16px',
                    lineHeight: '150%',
                    fontFamily: 'Inter',
                    fontWeight: 550,
                    color: 'text.primary',
                    textAlign: 'left',
                    display: 'inline-block',
                }}
            >
                Asked Price For Service (Per Visit)
            </Typography>
            <TextField
                fullWidth
                placeholder="Price*"
                type="number"
                required
                name="price"
                onChange={handleInputChange}
            />

            <Typography
                sx={{
                    width: '100%',
                    position: 'relative',
                    fontSize: '16px',
                    lineHeight: '150%',
                    fontFamily: 'Inter',
                    fontWeight: 550,
                    color: 'text.primary',
                    textAlign: 'left',
                    display: 'inline-block',
                    marginBottom: '10px'
                }}
            >
                Availability For Service
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    name="startDate"
                    required
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        style: {
                            color: '#aaa', // Light-light neutral color
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    name="endDate"
                    required
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        style: {
                            color: '#aaa', // Light-light neutral color
                        },
                    }}
                />
            </Box>

            <Typography
                sx={{
                    width: '100%',
                    position: 'relative',
                    fontSize: '16px',
                    lineHeight: '150%',
                    fontFamily: 'Inter',
                    fontWeight: 550,
                    color: 'text.primary',
                    textAlign: 'left',
                    display: 'inline-block',
                    marginTop: '8px',
                }}
            >
                Working Days
            </Typography>


            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
                {Object.values(WEEKDAYS).map(day => (
                    <Button
                        key={day}
                        variant={selectedDays.includes(day) ? "contained" : "outlined"}
                        onClick={() => clickWorkingDaysHandler(day)}
                        sx={{
                            minWidth: '130px',
                            height: '45px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textTransform: 'none',
                            borderRadius: '10px',
                            fontFamily: 'Inter',
                            fontSize: '16px',
                            fontWeight: 'regular',
                            border: '1px solid',
                            borderColor: selectedDays.includes(day) ? 'primary.main' : 'grey.500',
                            color: selectedDays.includes(day) ? 'white' : 'black',
                            backgroundColor: selectedDays.includes(day) ? '#006CBF' : 'transparent',
                            '&:hover': {
                                borderColor: selectedDays.includes(day) ? 'primary.main' : 'grey.700',
                                backgroundColor: selectedDays.includes(day) ? '#0056A4' : 'transparent',
                            },
                        }}
                    >
                        {capitalize(day)}
                    </Button>
                ))}
            </Box>
            <Typography
                sx={{
                    width: '100%',
                    position: 'relative',
                    fontSize: '16px',
                    lineHeight: '150%',
                    fontFamily: 'Inter',
                    fontWeight: 550,
                    color: 'text.primary',
                    textAlign: 'left',
                    display: 'inline-block',
                    marginBottom: '10px',
                    marginTop: '8px',
                }}
            >
                Working Hours
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <TextField
                    fullWidth
                    label="Start Time"
                    type="time"
                    name="startTime"
                    required
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        style: {
                            color: '#aaa', // Light-light neutral color
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="End Time"
                    type="time"
                    name="endTime"
                    required
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        style: {
                            color: '#aaa', // Light-light neutral color
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default BusinessTypesBaseRegistration;
