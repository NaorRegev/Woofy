import React from "react";
import { Button, Box, Typography } from '@mui/material';
import { Size } from "../../../models/Enums/Enums";

type DogSizeInputProps = {
    selectedSize: Size | Size[];
    onSizeClick: (size: Size) => void;
    multiple: boolean;
};

const DogSizeInput: React.FC<DogSizeInputProps> = ({ onSizeClick, selectedSize, multiple }) => {
    const dogSizes = [
        { size: Size.SMALL, label: 'Small', weight: '2-9 kg' },
        { size: Size.MEDIUM, label: 'Medium', weight: '9-22 kg' },
        { size: Size.LARGE, label: 'Large', weight: '22-45 kg' },
        { size: Size.GIANT, label: 'Giant', weight: '45 kg +' },
    ];

    const isSelected = (size: Size) => {
        if (multiple) {
            return Array.isArray(selectedSize) ? selectedSize.includes(size) : false;
        }
        return selectedSize === size;
    };

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
                {multiple ? "Acceptable Dog Sizes" : "What is Your Dog's Size?"}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                {dogSizes.map(({ size, label, weight }) => (
                    <Button
                        key={size}
                        variant={isSelected(size) ? "contained" : "outlined"}
                        onClick={() => onSizeClick(size)}
                        sx={{
                            minWidth: '100px',
                            flex: '1 1 calc(25% - 10px)',
                            height: '70px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px 5px',
                            textTransform: 'none',
                            borderRadius: '10px',
                            fontFamily: 'Inter',
                            fontSize: '16px',
                            fontWeight: 'regular',
                            border: '1px solid',
                            borderColor: isSelected(size) ? 'primary.main' : 'grey.500',
                            color: isSelected(size) ? 'white' : 'black',
                            backgroundColor: isSelected(size) ? '#006CBF' : 'transparent',
                            '&:hover': {
                                borderColor: isSelected(size) ? 'primary.main' : 'grey.700',
                                backgroundColor: isSelected(size) ? '#0056A4' : 'transparent',
                            },
                        }}
                    >
                        <Typography variant="body1" sx={{ fontSize: '16px', marginBottom: '5px' }}>
                            {label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '14px' }}>
                            {weight}
                        </Typography>
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default DogSizeInput;
