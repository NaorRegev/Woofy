import React, { ChangeEvent, FunctionComponent, useState } from "react";
import RegistrationModel from "../../models/RegistrationModel";
import ImageComponent from "../../components/image/imageComponent";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';

type RegistrationComponentProps = {
    updateCompleteRegistrationUser: (updatedData: Partial<RegistrationModel>) => void;
    onFileSelect: (file: File) => void;
    DogOwnerOrCareGiveractiveButton: string | null;
    errors: { [key: string]: string };
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const RegistrationView: FunctionComponent<RegistrationComponentProps> = ({ DogOwnerOrCareGiveractiveButton, updateCompleteRegistrationUser, onFileSelect, errors, setErrors }) => {


    const validateField = (name: string, value: string) => {
        let error = "";
        if (value.trim() === "") {
            error = `${name} is required`;
        }
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateCompleteRegistrationUser({ [name]: value });
        validateField(name, value);
    };

    return (
        <ThemeProvider theme={createTheme()}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <ImageComponent onFileSelect={onFileSelect} />
                            </Grid>
                            {DogOwnerOrCareGiveractiveButton == 'caregiver' && (
                                <Grid item xs={12}>
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
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Business Name
                                    </Typography>
                                    <TextField
                                        required
                                        fullWidth
                                        id="businessName"
                                        label="Business Name"
                                        name="businessName"
                                        autoComplete="business-name"
                                        onChange={changeHandler}
                                        error={!!errors.businessName}
                                        helperText={errors.businessName}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
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
                                        marginBottom: '8px',
                                    }}
                                >
                                    First Name
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="given-name"
                                    onChange={changeHandler}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                        marginBottom: '8px',
                                    }}
                                >
                                    Last Name
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={changeHandler}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                        marginBottom: '12px',
                                    }}
                                >
                                    Phone Number
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    id="phoneNumber"
                                    label="Phone Number"
                                    name="phoneNumber"
                                    autoComplete="tel"
                                    onChange={changeHandler}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                    InputProps={{
                                        startAdornment: (
                                            <img
                                                className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                                                alt=""
                                                src="/icon--phone.svg"
                                            />
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                        marginBottom: '12px',
                                    }}
                                >
                                    Permanent Address
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Permanent Address"
                                    name="address"
                                    autoComplete="address"
                                    onChange={changeHandler}
                                    error={!!errors.address}
                                    helperText={errors.address}
                                    InputProps={{
                                        startAdornment: (
                                            <img
                                                className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                                                alt=""
                                                src="/icon--home.svg"
                                            />
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                        marginBottom: '12px',
                                    }}
                                >
                                    City
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    name="city"
                                    autoComplete="address-level2"
                                    onChange={changeHandler}
                                    error={!!errors.city}
                                    helperText={errors.city}
                                    InputProps={{
                                        startAdornment: (
                                            <img
                                                className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                                                alt=""
                                                src="/icon--buildinghouse.svg"
                                            />
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                        marginBottom: '12px',
                                    }}
                                >
                                    Zip Code
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    id="zipCode"
                                    label="Zip Code"
                                    name="zipCode"
                                    autoComplete="postal-code"
                                    onChange={changeHandler}
                                    error={!!errors.zipCode}
                                    helperText={errors.zipCode}
                                />
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default RegistrationView;
