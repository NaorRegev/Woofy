import React, {FunctionComponent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Business} from "../models/BusinessModels/BusinessModel";
import {BUSINESS_TYPES} from "../models/Enums/Enums";
import {useRouter} from "../routes/hooks";
import {Button, Dialog, Grid, Typography, Container, Box, CircularProgress} from "@mui/material";
import Navbar from "../Sections/Home/NavbarPreLogin";
import BusinessFrame from "../Sections/User/Business/Profile/BusinessFrame";
import TestimonialsContainer from "../Sections/User/Business/Profile/TestimonialsContainer";
import {api} from "../api/api";
import {Helmet} from "react-helmet-async";

type RouteParams = Record<string, string | undefined>;

const BusinessProfilePage: FunctionComponent = () => {
    const {id: businessId} = useParams<RouteParams>();
    const [business, setBusiness] = useState<Business | null>(null);
    const router = useRouter();
    const [selectedService, setSelectedService] = useState<BUSINESS_TYPES>(BUSINESS_TYPES.BOARDING);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`business/${businessId}`);
                const data = response.data;
                setBusiness(data);
                setSelectedService(data.boardingEntity ? BUSINESS_TYPES.BOARDING : data.dogWalkerEntity ? BUSINESS_TYPES.DOG_WALK : data.dogSitterEntity ? BUSINESS_TYPES.DOG_SITTER : BUSINESS_TYPES.DAY_CARE);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [businessId]);

    useEffect(() => {
        if (business) {
            const allServicesNull = !business.boardingEntity && !business.dogWalkerEntity && !business.dogSitterEntity && !business.dayCareEntity;
            if (allServicesNull) {
                router.push("/");
            }
        }
    }, [business, router]);

    if (!business) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress/>
            </Box>
        );
    }

    const availableServices = [
        {type: BUSINESS_TYPES.BOARDING, data: business.boardingEntity, text: "Boarding", icon: "/icon--moon.svg"},
        {type: BUSINESS_TYPES.DOG_WALK, data: business.dogWalkerEntity, text: "Walker", icon: "/icon--walk.svg"},
        {type: BUSINESS_TYPES.DOG_SITTER, data: business.dogSitterEntity, text: "Sitter", icon: "/icon--bed.svg"},
        {type: BUSINESS_TYPES.DAY_CARE, data: business.dayCareEntity, text: "Day Care", icon: "/icon--sun1.svg"}
    ].filter(service => service.data !== null);

    const getServiceData = () => {
        const service = availableServices.find(service => service.type === selectedService);
        return service ? service.data : null;
    };

    return (
        <>
            <Helmet>
                <title> Business Profile | Woofy </title>
            </Helmet>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: 4,
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{mb: 4}}>
                        <BusinessFrame
                            business={business}
                            serviceData={getServiceData()}
                            selectedService={selectedService}
                            setSelectedService={setSelectedService}
                        />
                    </Box>
                    <Box sx={{mb: 4}}>
                        <TestimonialsContainer businessId={Number(businessId)}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default BusinessProfilePage;
