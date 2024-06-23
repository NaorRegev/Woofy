import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { BUSINESS_TYPES } from "../../../models/Enums/Enums";
import './styles.css'; // Import the CSS file

type SelectServiceInputProps = {
    setSelectedServices: (type: BUSINESS_TYPES) => void;
    selectedServices: BUSINESS_TYPES;
    labelText: string; // This is the header for the buttons
}

const SelectServiceTypeComponentIncludeAll: React.FC<SelectServiceInputProps> = ({ setSelectedServices, selectedServices, labelText }) => {
    const services = [
        { type: BUSINESS_TYPES.ALL, icon: "/tablerpaw.svg", text: "All Services" },
        { type: BUSINESS_TYPES.BOARDING, icon: "/icon--moon.svg", text: "Boarding" },
        { type: BUSINESS_TYPES.DAY_CARE, icon: "/icon--sun1.svg", text: "Day Care" },
        { type: BUSINESS_TYPES.DOG_SITTER, icon: "/icon--bed.svg", text: "Sitter" },
        { type: BUSINESS_TYPES.DOG_WALK, icon: "/icon--walk.svg", text: "Walker" }
    ];

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography
                sx={{
                    width: '100%',
                    position: 'relative',
                    fontSize: '16px',
                    lineHeight: '150%',
                    fontFamily: 'Inter',
                    fontWeight: '550',
                    color: 'text.primary',
                    textAlign: 'left',
                    display: 'inline-block',
                }}
            >
                {labelText}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, overflow: 'auto' }}>
                {services.map(service => (
                    <Button
                        key={service.type}
                        variant={selectedServices === service.type ? "contained" : "outlined"}
                        onClick={() => setSelectedServices(service.type)}
                        sx={{
                            width: '130px',
                            height: '45px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: service.type === BUSINESS_TYPES.DOG_SITTER 
                                ? '0 8px 0 20px' 
                                : service.type === BUSINESS_TYPES.ALL 
                                ? '0 8px 0 1px' 
                                : 0, // Adjust padding conditionally
                            textTransform: 'none',
                            borderRadius: '30px',
                            fontFamily: 'Inter',
                            fontSize: '16px',
                            fontWeight: 'regular',
                            color: selectedServices === service.type ? 'white' : 'black',
                            borderColor: selectedServices !== service.type ? 'grey.500' : 'primary.main',
                            backgroundColor: selectedServices === service.type ? '#006CBF' : 'transparent',
                            '&:hover': {
                                borderColor: selectedServices !== service.type ? 'grey.700' : '#006CBF',
                                backgroundColor: selectedServices === service.type ? '#0056A4' : 'transparent',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                className={`w-7 h-7 relative overflow-hidden shrink-0 ${selectedServices === service.type ? "icon-white" : "icon-grey"}`}
                                alt=""
                                src={service.icon}
                            />
                        </Box>
                        <Box
                            className={`ServiceTypeButtonText ${selectedServices === service.type ? "white-text" : ""}`}
                            sx={{ marginLeft: 0, whiteSpace: 'nowrap' }}
                        >
                            {service.text}
                        </Box>
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default SelectServiceTypeComponentIncludeAll;