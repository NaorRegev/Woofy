import React from "react";
import { Button, Box, Typography } from '@mui/material';
import { PETS_IN_HOME } from "../../../models/Enums/Enums";
import {formatEnumValue} from "../../../utils/format-enum-text";

type FormUpdate = {
    selectedPetsInHome: PETS_IN_HOME[];
    clickPetsInHomeHandler: (homeConditions: PETS_IN_HOME) => void;
}

const PetsInHomeComponent: React.FC<FormUpdate> = ({ clickPetsInHomeHandler, selectedPetsInHome }) => {
    const petsInHomeConditions = Object.values(PETS_IN_HOME);

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
                        marginTop: '24px',
                    }}
                >
                    Pets in Your Home
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                    {petsInHomeConditions.map(condition => (
                        <Button
                            key={condition}
                            variant={selectedPetsInHome.includes(condition) ? "contained" : "outlined"}
                            onClick={() => clickPetsInHomeHandler(condition)}
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
                                borderColor: selectedPetsInHome.includes(condition) ? 'primary.main' : 'grey.500',
                                color: selectedPetsInHome.includes(condition) ? 'white' : 'black',
                                backgroundColor: selectedPetsInHome.includes(condition) ? '#006CBF' : 'transparent',
                                '&:hover': {
                                    borderColor: selectedPetsInHome.includes(condition) ? 'primary.main' : 'grey.700',
                                    backgroundColor: selectedPetsInHome.includes(condition) ? '#0056A4' : 'transparent',
                                },
                            }}
                        >
                            {formatEnumValue(condition)}
                        </Button>
                    ))}
                </Box>
            </Box>
        
    )
}

export default PetsInHomeComponent;
