import React from "react";
import { Button, Box, Typography } from '@mui/material';
import { HOME_CONDITIONS } from "../../../models/Enums/Enums";
import { formatEnumValue } from "../../../utils/format-enum-text";

type FormUpdate = {
    selectedHomeConditions: HOME_CONDITIONS[];
    clickHomeConditionsHandler: (homeConditions: HOME_CONDITIONS) => void;
}

const HomeConditionComponent: React.FC<FormUpdate> = ({ clickHomeConditionsHandler, selectedHomeConditions }) => {
    const homeConditions = Object.values(HOME_CONDITIONS);

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
                    marginTop: '8px',
                }}
            >
                Your Home Conditions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                {homeConditions.map(condition => (
                    <Button
                        key={condition}
                        variant={selectedHomeConditions.includes(condition) ? "contained" : "outlined"}
                        onClick={() => clickHomeConditionsHandler(condition)}
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
                            borderColor: selectedHomeConditions.includes(condition) ? 'primary.main' : 'grey.500',
                            color: selectedHomeConditions.includes(condition) ? 'white' : 'black',
                            backgroundColor: selectedHomeConditions.includes(condition) ? '#006CBF' : 'transparent',
                            '&:hover': {
                                borderColor: selectedHomeConditions.includes(condition) ? 'primary.main' : 'grey.700',
                                backgroundColor: selectedHomeConditions.includes(condition) ? '#0056A4' : 'transparent',
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

export default HomeConditionComponent;