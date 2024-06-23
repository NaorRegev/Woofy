import React, {FormEvent, FunctionComponent, useCallback, useState} from "react";
import {useLocation} from "react-router-dom";
import RegistrationView from "../Sections/LoginAndRegister/RegistrationView";
import {api, setAuthToken} from "../api/api";
import RegistrationModel, {USERTYPE} from "../models/RegistrationModel";
import {useAuth} from "../provider/AuthProvider";
import {toast} from "react-toastify";
import {Box, Button, Container, Grid, Typography} from '@mui/material';
import {useRouter} from "../routes/hooks";
import {useNotifications} from "../provider/NotificationContext";
import backgroundImage from '/assets/Registration-background.jpg';
import {Helmet} from "react-helmet-async";

const Registration: FunctionComponent = () => {
    const router = useRouter();
    const location = useLocation();
    const {setIsLoggedIn, setToken} = useAuth();
    const basicSignUpUser = location.state;
    const [DogOwnerOrCareGiverActiveButton, setDogOwnerOrCareGiverActiveButton] = useState<string | null>('dogOwner');
    const [completeRegistrationUser, setCompleteRegistrationUser] = useState(
        new RegistrationModel(basicSignUpUser, USERTYPE.CUSTOMER, '', '', '', '', '', '', '')
    );
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const {addNotification} = useNotifications();

    const updateCompleteRegistrationUser = (updatedData: Partial<RegistrationModel>) => {
        setCompleteRegistrationUser(prevState => ({
            ...prevState,
            ...updatedData
        }));
    };

    const onBackButtonTextClick = useCallback(() => {
        router.push("/sign-up");
    }, [router]);

    const onDogOwnerButtonClick = useCallback(() => {
        setDogOwnerOrCareGiverActiveButton('dogOwner');
        setCompleteRegistrationUser(prevState => ({
            ...prevState,
            userType: USERTYPE.CUSTOMER
        }));
    }, []);

    const onCaregiverButtonClick = useCallback(() => {
        setDogOwnerOrCareGiverActiveButton('caregiver');
        setCompleteRegistrationUser(prevState => ({
            ...prevState,
            userType: USERTYPE.BUSINESS
        }));
    }, []);

    const handleFileSelect = (file: File) => {
        setSelectedImage(file);
    };

    const validateForm = () => {
        return new Promise((resolve, reject) => {
            let isValid = true;
            let newErrors: { [key: string]: string } = {};


            let fields: (keyof RegistrationModel)[] = [
                "firstName",
                "lastName",
                "phoneNumber",
                "address",
                "city",
                "zipCode"
            ];

            // If the user is a Caregiver, add "businessName" to the fields array
            if (completeRegistrationUser.userType === USERTYPE.BUSINESS) {
                fields = [...fields, "businessName"];
            }

            fields.forEach(field => {
                if (!completeRegistrationUser[field]) {
                    newErrors[field] = 'This field is required';
                    isValid = false;
                }
            });

            // Check if phoneNumber is exactly 10 digits and only contains numbers
            if (!/^\d{10}$/.test(completeRegistrationUser.phoneNumber)) {
                newErrors.phoneNumber = 'Invalid Phone number';
                isValid = false;
            }

            // check if the zipCode is only digits:
            if (!/^\d+$/.test(completeRegistrationUser.zipCode)) {
                newErrors.zipCode = 'Invalid Zip code';
                isValid = false;
            }

            const address = `${completeRegistrationUser.address} ${completeRegistrationUser.city}`;
            api.post('/map/geocode', address, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Failed to geocode address');
                    }
                })
                .catch(error => {
                    newErrors.address = 'Invalid address';
                    isValid = false;
                })
                .finally(() => {
                    setErrors(newErrors);
                    resolve(isValid);
                });
        });
    };

    const signupHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = await validateForm();
        if (!isValid) {
            return;
        }

        const {basicSignUpModel, ...rest} = completeRegistrationUser;
        const apiEndpoint = rest.userType === USERTYPE.BUSINESS ? '/auth/register-business' : '/auth/register-customer';

        try {
            const res = await api.post(apiEndpoint, {
                ...rest,
                ...basicSignUpModel,
            });
            setAuthToken(res.data.access_token)
            let profilePhotoId = 0;
            if (selectedImage) {
                profilePhotoId = await savePhotoToDB(selectedImage);
                await api.patch('/user/update', {
                    profilePhotoId: profilePhotoId,
                });
            }
            setToken(res.data.access_token);
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("refreshToken", res.data.refresh_token);
            setIsLoggedIn(true);
            router.push("/");

            addNotification({
                title: 'Welcome!',
                description: 'Thank you for registering.',
                type: 'register_success',
                isUnRead: true,
            });
        } catch (error) {
            toast.error("Error in registration. Please make sure you have filled all the fields correctly.");
            console.error("Error from the backend:", error);
        }
    };

    const savePhotoToDB = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await api.post('/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.imageID;
        } catch (error) {
            toast.error("Failed uploading profile photo");
            throw error;
        }
    };

    return (
        <>
            <Helmet>
                <title> Registration | Woofy </title>
            </Helmet>
            <Box
                sx={{
                    width: '100%',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    position: "relative",
                    minHeight: '600px',
                    color: 'white',
                    padding: 10,
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center calc(50% + 150px)',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                />
                <Typography
                    component="h1"
                    sx={{
                        fontSize: '48px',
                        lineHeight: '120%',
                        fontFamily: 'Inter',
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'left',
                        marginTop: '270px',
                        marginBottom: '20px',
                        zIndex: 1,
                    }}
                >
                    Register and start using Woofy
                </Typography>
                <Typography
                    sx={{
                        fontSize: '20px',
                        lineHeight: '150%',
                        fontFamily: 'Inter',
                        color: 'white',
                        textAlign: 'left',
                        zIndex: 1,
                    }}
                >
                    Complete the forms below to provide your contact information and your business details.
                </Typography>
            </Box>

            <Container maxWidth="lg">
                <form onSubmit={signupHandler}>
                    <Box mt={6} display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="h5" style={{fontSize: '24px'}}>Welcome to Woofy!</Typography>
                        <Typography variant="body1">Please complete your account information and settings.</Typography>
                    </Box>
                    <Box mt={5} display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="h6">I consider myself a...</Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: 1, overflow: 'auto', mt: 2, mb: 2}}>
                            <Button
                                variant={DogOwnerOrCareGiverActiveButton === 'dogOwner' ? "contained" : "outlined"}
                                onClick={onDogOwnerButtonClick}
                                sx={{
                                    width: '130px',
                                    height: '45px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textTransform: 'none',
                                    borderRadius: '30px',
                                    fontFamily: 'Inter',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: DogOwnerOrCareGiverActiveButton === 'dogOwner' ? 'white' : 'black',
                                    borderColor: DogOwnerOrCareGiverActiveButton === 'dogOwner' ? 'primary.main' : 'grey.500',
                                    backgroundColor: DogOwnerOrCareGiverActiveButton === 'dogOwner' ? '#006CBF' : 'transparent',
                                    '&:hover': {
                                        borderColor: DogOwnerOrCareGiverActiveButton !== 'dogOwner' ? 'grey.700' : '#006CBF',
                                        backgroundColor: DogOwnerOrCareGiverActiveButton === 'dogOwner' ? '#0056A4' : 'transparent',
                                    },
                                }}
                            >
                                Dog Owner
                            </Button>
                            <Button
                                variant={DogOwnerOrCareGiverActiveButton === 'caregiver' ? "contained" : "outlined"}
                                onClick={onCaregiverButtonClick}
                                sx={{
                                    width: '130px',
                                    height: '45px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textTransform: 'none',
                                    borderRadius: '30px',
                                    fontFamily: 'Inter',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: DogOwnerOrCareGiverActiveButton === 'caregiver' ? 'white' : 'black',
                                    borderColor: DogOwnerOrCareGiverActiveButton === 'caregiver' ? 'primary.main' : 'grey.500',
                                    backgroundColor: DogOwnerOrCareGiverActiveButton === 'caregiver' ? '#006CBF' : 'transparent',
                                    '&:hover': {
                                        borderColor: DogOwnerOrCareGiverActiveButton !== 'caregiver' ? 'grey.700' : '#006CBF',
                                        backgroundColor: DogOwnerOrCareGiverActiveButton === 'caregiver' ? '#0056A4' : 'transparent',
                                    },
                                }}
                            >
                                Caregiver
                            </Button>
                        </Box>
                    </Box>
                    <Grid container justifyContent="center">
                        <RegistrationView
                            DogOwnerOrCareGiveractiveButton={DogOwnerOrCareGiverActiveButton}
                            updateCompleteRegistrationUser={updateCompleteRegistrationUser}
                            onFileSelect={handleFileSelect}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    </Grid>
                    <Box mt={3} display="flex" flexDirection="column" alignItems="center">
                        <Grid container spacing={3} justifyContent="center">
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    onClick={onBackButtonTextClick}
                                    sx={{
                                        mt: 4,
                                        mb: 10,
                                        borderRadius: '30px',
                                        color: '#444444',
                                        borderColor: 'grey.500',
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                            borderColor: 'grey.700',
                                            backgroundColor: 'transparent',
                                        },
                                        width: '120px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                    }}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{
                                        mt: 4,
                                        mb: 10,
                                        borderRadius: '30px',
                                        backgroundColor: '#006CBF',
                                        '&:hover': {
                                            backgroundColor: '#0056A4',
                                        },
                                        width: '120px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                    }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Container>
        </>
    );
};

export default Registration;
