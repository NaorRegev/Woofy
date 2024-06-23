import React, { FunctionComponent, useContext, useState } from "react";
import { BoardingModel } from "../../../../models/BusinessModels/BusinessTypesModels/StayAtBusiness/BoardingModel";
import { DogWalkerModel } from "../../../../models/BusinessModels/BusinessTypesModels/HomeStay/DogWalkerModel";
import { DayCareModel } from "../../../../models/BusinessModels/BusinessTypesModels/StayAtBusiness/DayCareModel";
import { DogSitterModel } from "../../../../models/BusinessModels/BusinessTypesModels/HomeStay/DogSitterModel";
import '../../../../css/button.css';
import SelectServiceTypeComponent from "../../selectButtons/SelectServiceTypeComponent";
import BusinessTypesBaseRegistration from "./BusinessTypesBaseRegistration";
import PetsInHomeComponent from "../../selectButtons/PetsInHomeComponent";
import HomeConditionComponent from "../../selectButtons/HomeConditionComponent";
import { toast } from "react-toastify";
import { api } from "../../../../api/api";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { BUSINESS_TYPES, HOME_CONDITIONS, PETS_IN_HOME, Size, WEEKDAYS } from "../../../../models/Enums/Enums";
import { useRouter } from "../../../../routes/hooks";
import DogSizeInput from "../../selectButtons/DogSizeInput";
import { useNotifications } from "../../../../provider/NotificationContext";
import { formatEnumValue } from "../../../../utils/format-enum-text";

const serviceTypeMapping = {
    [BUSINESS_TYPES.DOG_WALK]: 'dog-walker',
    [BUSINESS_TYPES.DOG_SITTER]: 'dog-sitter',
    [BUSINESS_TYPES.DAY_CARE]: 'day-care',
    [BUSINESS_TYPES.BOARDING]: 'boarding',
};

const ServiceRegisterView: FunctionComponent = () => {
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState<Size[]>([]);
    const [selectedHomeConditions, setHomeConditions] = useState<HOME_CONDITIONS[]>([]);
    const [selectedPetsInHome, setPetsInHome] = useState<PETS_IN_HOME[]>([]);
    const [selectedDays, setSelectedDays] = useState<WEEKDAYS[]>([]);
    const [images, setImages] = useState<Array<File | null>>([null, null, null, null]);
    const { addNotification } = useNotifications();

    // Boarding, Day Care, Sitter, Walker buttons
    const [selectedServices, setSelectedServices] = useState<BUSINESS_TYPES>(BUSINESS_TYPES.BOARDING);

    const serviceFormTitles = {
        [BUSINESS_TYPES.BOARDING]: "Boarding Service Form",
        [BUSINESS_TYPES.DAY_CARE]: "Day Care Service Form",
        [BUSINESS_TYPES.DOG_SITTER]: "Sitter Service Form",
        [BUSINESS_TYPES.DOG_WALK]: "Walker Service Form",
    };

    const [businessInput, setBusinessInput] = useState<Record<string, any>>({});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setBusinessInput(prevState => ({ ...prevState, [name]: value }));
    };

    const updateBusinessModel = (updatedData: Partial<BoardingModel | DogWalkerModel | DayCareModel | DogSitterModel>) => {
        setBusinessInput(prevState => {
            if (prevState) {
                return { ...prevState, ...updatedData };
            }
            return prevState;
        });
    };

    const clickSizeHandlerDog = (size: Size) => {
        setSelectedSize(prevSizes => {
            let newSizes;
            if (prevSizes.includes(size)) {
                newSizes = prevSizes.filter(s => s !== size);
            } else {
                newSizes = [...prevSizes, size];
            }
            updateBusinessModel({ acceptableDogSizes: newSizes });
            return newSizes;
        });
    };

    const clickHomeConditionsHandler = (homeCondition: HOME_CONDITIONS) => {
        setHomeConditions(prevHomeConditions => {
            let newHomeConditions;
            if (prevHomeConditions.includes(homeCondition)) {
                newHomeConditions = prevHomeConditions.filter(s => s !== homeCondition);
            } else {
                newHomeConditions = [...prevHomeConditions, homeCondition];
            }
            updateBusinessModel({ homeConditions: newHomeConditions });
            return newHomeConditions;
        });
    }

    const clickPetsInHomeHandler = (petsInHome: PETS_IN_HOME) => {
        setPetsInHome(prevPetsInHome => {
            let newPetsInHome;
            if (prevPetsInHome.includes(petsInHome)) {
                newPetsInHome = prevPetsInHome.filter(s => s !== petsInHome);
            } else {
                newPetsInHome = [...prevPetsInHome, petsInHome];
            }
            updateBusinessModel({ petsInHome: newPetsInHome });
            return newPetsInHome;
        });
    }
    const clickWorkingDaysHandler = (workingDay: string) => {
        setSelectedDays(prevDays => {
            let newDays;
            if (prevDays.includes(workingDay as WEEKDAYS)) {
                newDays = prevDays.filter(s => s !== workingDay as WEEKDAYS);
            } else {
                newDays = [...prevDays, workingDay as WEEKDAYS];
            }
            updateBusinessModel({ workingDays: newDays });
            return newDays;
        })
    }

    const registerBusinessHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let business;
        switch (selectedServices) {
            case BUSINESS_TYPES.BOARDING:
                business = new BoardingModel();
                break;
            case BUSINESS_TYPES.DOG_WALK:
                business = new DogWalkerModel();
                break;
            case BUSINESS_TYPES.DAY_CARE:
                business = new DayCareModel();
                break;
            case BUSINESS_TYPES.DOG_SITTER:
                business = new DogSitterModel();
                break;
        }
        // Copy over the relevant fields from the business state
        for (let key in business) {
            if (key in businessInput) {
                (business as any)[key] = (businessInput as any)[key];
            }
        }


        try {
            const response = await api.post(`/business/business-type/${serviceTypeMapping[selectedServices]}/create`, business);
            const imageIDs = await uploadImages();
            const isUpdateSuccess = updateImagesForServiceEntity(imageIDs as number[]);
            router.push("/");
            if (await isUpdateSuccess) {
                addNotification({
                    title: 'Service Added!',
                    description: `The ${formatEnumValue(selectedServices)} service has been successfully added.`,
                    type: 'register_success',
                    isUnRead: true,
                });
            } else {
                toast.error("Failed to register service");
            }

        } catch (error) {
            toast.error("Failed to register service");
            console.log(`Error to register service: ${error}`);
        }

    };

    const updateImagesForServiceEntity = async (imageIDs: number[]) => {
        try {
            const response = await api.put(`/business/update/images/`, imageIDs);
            return true;
        } catch (error) {
            console.error(`Error updating dog images: ${error}`);
            return false;
        }
    };

    // Handle images
    const handleImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        // Check if the selected file is an image
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        if (file) {
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);
        }
    };

    const uploadImages = async () => {
        try {
            const imageIDs = await Promise.all(
                images.map(async (image) => {
                    if (image) {
                        return savePhotoToDB(image);
                    }
                    return null;
                })
            );
            return imageIDs.filter((id) => id !== null); // Filter out null values
        } catch (error) {
            toast.error("Failed uploading images");
            return null
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
            return response.data.imageID; // return the ID of the saved image
        } catch (error) {
            toast.error("Failed uploading profile photo")
        }

    };

    return (
        <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', lineHeight: 'normal', tracking: 'normal' }}>
            <Box sx={{ width: '100vw', position: 'relative', left: 0, backgroundColor: '#006cbf', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', pt: 8, px: 2.5, pb: 7.5, gap: 0 }}>
                <Typography component="h1" sx={{ fontSize: '36px', lineHeight: '120%', fontFamily: 'Inter', fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: '20px' }}>
                    Set Up Your Services Details
                </Typography>
                <Typography sx={{ fontSize: '16px', lineHeight: '150%', fontFamily: 'Inter', color: 'white', textAlign: 'center' }}>
                    Complete the forms below to provide your business information.
                </Typography>
            </Box>
            <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'start', px: { md: 5 } }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', width: '100%', textAlign: 'center', fontSize: '29xl', color: 'text.alternate', fontFamily: 'text-medium-normal', px: { md: 5 } }}>
                    <Box sx={{ width: '100%', backgroundColor: 'text.alternate', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '100%', fontSize: '5xl', color: 'text.primary', gap: 2.5 }}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '100%' }}>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'end', justifyContent: 'start', pt: 5, pb: 2.5 }}>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
                                    <Typography variant="h4" sx={{ fontFamily: 'Inter', fontWeight: 'bold', color: 'text.primary', textAlign: 'center' }}>
                                        Services Details
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'Inter', color: 'text.primary', textAlign: 'center' }}>
                                        Please Complete your business account information.
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', py: 0, px: 2.5, gap: 3 }}>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: 1 }}>
                                    <SelectServiceTypeComponent selectedServices={selectedServices} setSelectedServices={setSelectedServices} labelText="Choose your service" />
                                </Box>
                                <Box>
                                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
                                        <Typography variant="h4" sx={{ fontFamily: 'Inter', fontWeight: 'bold', color: 'text.primary', textAlign: 'center' }}>
                                            {serviceFormTitles[selectedServices]}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontFamily: 'Inter', color: 'text.primary', textAlign: 'center' }}>
                                            Please fill the necessary information found in the following questions.
                                        </Typography>
                                    </Box>
                                    {(selectedServices === BUSINESS_TYPES.DOG_WALK || selectedServices === BUSINESS_TYPES.DOG_SITTER) && (
                                        <Box component="form" sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            <Typography sx={{ width: '100%', position: 'relative', fontSize: '16px', lineHeight: '150%', fontFamily: 'Inter', fontWeight: 550, color: 'text.primary', textAlign: 'left', display: 'inline-block', marginTop: '8px' }}>
                                                Appointment Length
                                            </Typography>
                                            <TextField fullWidth placeholder="Enter appointment length in minutes*" type="number" name="appointmentLengthInMinutes" required onChange={handleInputChange} />
                                        </Box>
                                    )}
                                    {(selectedServices === BUSINESS_TYPES.BOARDING || selectedServices === BUSINESS_TYPES.DAY_CARE) && (
                                        <>
                                            <Box sx={{ mb: 2 }}>
                                                <PetsInHomeComponent selectedPetsInHome={selectedPetsInHome} clickPetsInHomeHandler={clickPetsInHomeHandler} />
                                            </Box>
                                            <Box sx={{ mb: 3 }}>
                                                <HomeConditionComponent selectedHomeConditions={selectedHomeConditions} clickHomeConditionsHandler={clickHomeConditionsHandler} />
                                            </Box>
                                            <Box>
                                                <TextField fullWidth placeholder="Number of Dogs*" type="number" name="dogCapacity" required onChange={handleInputChange} />
                                            </Box>
                                        </>
                                    )}
                                </Box>
                                <BusinessTypesBaseRegistration handleInputChange={handleInputChange} selectedSize={selectedSize} clickSizeHandlerDog={clickSizeHandlerDog} selectedDays={selectedDays} clickWorkingDaysHandler={clickWorkingDaysHandler} />
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: 3 }}>
                                    <Typography sx={{ width: '100%', position: 'relative', fontSize: '16px', lineHeight: '150%', fontFamily: 'Inter', fontWeight: 550, color: 'text.primary', textAlign: 'left', display: 'inline-block', marginTop: '8px' }}>
                                        Add Pictures of Your Services
                                    </Typography>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 3, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                                    {images.map((image, index) => (
                                        <label key={index} className="relative">
                                            <input type="file" accept="image/*" onChange={(event) => handleImageChange(index, event)} style={{ display: 'none' }} />
                                            <img className="h-[100px] w-[100px] relative object-cover min-h-[100px] shrink-0 cursor-pointer" loading="lazy" alt="" src={image ? URL.createObjectURL(image) : "/service-avatar-image-1@2x.png"} onClick={() => document.getElementById(`fileInput-${index}`)?.click()} />
                                        </label>
                                    ))}
                                </Box>
                                <Button variant="contained" onClick={registerBusinessHandler} sx={{ mt: 4, mb: 10, borderRadius: '30px', backgroundColor: '#006CBF', '&:hover': { backgroundColor: '#0056A4' }, width: '120px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto' }}>
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default ServiceRegisterView;
