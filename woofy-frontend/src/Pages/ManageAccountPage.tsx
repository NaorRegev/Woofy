import React, {useContext, useState} from "react";
import {Box, Typography, Card, CardContent, Button, Grid} from "@mui/material";
import UserProfileView from "../Sections/User/UserProfile/UserProfileView";
import ServicesProfileView from "../Sections/User/UserProfile/ServicesProfileView";
import DogProfileView from "../Sections/User/UserProfile/DogProfileView";
import {UserContext} from "../provider/UserProvider";
import {ROLE} from "../models/Enums/Enums";
import {Helmet} from "react-helmet-async";

const ManageAccountPage = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const {userDetails} = useContext(UserContext);

    const options = [
        {
            title: "Personal Details",
            description: "Update your info and find out how it’s used.",
            link: "personal-details",
        },
        {
            title: userDetails.role === ROLE.CUSTOMER ? "Dog Profile" : "Services Profile",
            description: userDetails.role === ROLE.CUSTOMER
                ? "Manage your dog's details."
                : "Manage your business services.",
            link: userDetails.role === ROLE.CUSTOMER ? "dog-profile" : "services-profile",
        },
    ];

    const handleOptionClick = (link) => {
        setSelectedOption(link);
    };

    return (
        <>
            <Helmet>
                <title> Manage Account | Woofy </title>
            </Helmet>
            <Box sx={{display: 'flex'}}>
                {!selectedOption ? (
                    <Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                        <Box
                            sx={{
                                width: "100%",
                                backgroundColor: "#006cbf",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                pt: 12,
                                px: 2.5,
                                pb: 8.5,
                                gap: 0,
                            }}
                        >
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: "48px!important",
                                    lineHeight: "120%",
                                    fontFamily: "inter",
                                    color: "white",
                                    textAlign: "center",
                                    position: "relative",
                                }}
                            >
                                Account Settings
                            </Typography>
                        </Box>
                        <Box sx={{padding: 4, overflow: 'auto', flexGrow: 1}}>
                            <Grid container spacing={4}>
                                {options.map((option, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Card sx={{borderRadius: 2, boxShadow: 1}}>
                                            <CardContent>
                                                <Typography variant="h5" component="div">
                                                    {option.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {option.description}
                                                </Typography>
                                                <Button
                                                    variant="text"
                                                    color="primary"
                                                    onClick={() => handleOptionClick(option.link)}
                                                >
                                                    Manage {option.title.toLowerCase()}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{display: 'flex', width: '100%', height: '100%', overflow: 'hidden'}}>
                        <Box sx={{width: '25%', backgroundColor: '#fff', padding: 2, overflowY: 'auto'}}>
                            {options.map((option, index) => (
                                <Card key={index} sx={{marginBottom: 2}}>
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: selectedOption === option.link ? 'primary.main' : 'text.primary',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => handleOptionClick(option.link)}
                                        >
                                            {option.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                        <Box sx={{width: '75%', padding: 2, overflowY: 'auto'}}>
                            {selectedOption === "personal-details" && <UserProfileView/>}
                            {selectedOption === "services-profile" && <ServicesProfileView/>}
                            {selectedOption === "dog-profile" && <DogProfileView/>}
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default ManageAccountPage;
