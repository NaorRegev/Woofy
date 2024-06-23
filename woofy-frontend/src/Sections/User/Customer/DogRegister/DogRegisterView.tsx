import React, { FunctionComponent, useState, useContext } from "react";
import { Box, Button, Container, TextField, Typography, TextareaAutosize } from "@mui/material";
import { toast } from "react-toastify";
import {api} from "../../../../api/api";
import { UserContext } from "../../../../provider/UserProvider";
import DogSizeInput from "../../selectButtons/DogSizeInput";
import SendIcon from '@mui/icons-material/Send';
import { Age, Size, TrainingLevel } from "../../../../models/Enums/Enums";
import DogModel from "../../../../models/DogModels/DogModel";
import { useRouter } from "../../../../routes/hooks";
import { useNotifications } from "../../../../provider/NotificationContext";


const DogRegisterView: FunctionComponent = () => {
    const router = useRouter();
    const { addNotification } = useNotifications();
    const [selectedAge, setSelectedAge] = useState<Age>(Age.PUPPY);
    const [selectedSize, setSelectedSize] = useState<Size>(Size.SMALL);
    const [selectedTrainingLevel, setSelectedTrainingLevel] = useState<TrainingLevel>(TrainingLevel.BEGINNER);
    const [images, setImages] = useState<Array<File | null>>([null, null, null, null]);
    const [dog, setDog] = useState(
        new DogModel("", "", Age.PUPPY, Size.SMALL, TrainingLevel.BEGINNER, "", "")
    );

    const [dogNameError, setDogNameError] = useState('');
    const [dogBreedError, setDogBreedError] = useState('');
    const [dogImagesError, setDogImagesError] = useState('');

    const changeHandlerDog = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDog(prevState => ({ ...prevState, [name]: value }));
    };

    const clickAgeHandlerDog = (age: Age) => {
        setDog(prevState => ({ ...prevState, age }));
        setSelectedAge(age);
    };

    const clickSizeHandlerDog = (size: Size) => {
        setDog(prevState => ({ ...prevState, size }));
        setSelectedSize(size);
    };

    const clickTrainingLevelHandlerDog = (trainingLevel: TrainingLevel) => {
        setDog(prevState => ({ ...prevState, trainingLevel }));
        setSelectedTrainingLevel(trainingLevel);
    };

    const validateForm = () => {
        let isValid = true;

        if (!dog.dogName) {
            setDogNameError('Dog name is mandatory');
            isValid = false;
        } else {
            setDogNameError('');
        }

        if (!dog.dogBreed) {
            setDogBreedError('Dog breed is mandatory');
            isValid = false;
        } else {
            setDogBreedError('');
        }

        if (images.every(image => image === null)) {
            setDogImagesError('At least one dog image is mandatory');
            isValid = false;
        } else {
            setDogImagesError('');
        }

        return isValid;
    };

    const registerDogHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const dogData = {
            dogName: dog.dogName,
            dogBreed: dog.dogBreed,
            age: Age[dog.age],
            size: Size[dog.size],
            trainingLevel: TrainingLevel[dog.trainingLevel],
            about: dog.about,
            specialRequirements: dog.specialRequirements,
            pictures: null,
        };

        try {
            const response = await api.post(`/dogs/create`, dogData);
            const imageIDs = await uploadImages();
            const isUpdateSuccess = await updateImagesForDogEntity(imageIDs as number[]);
            router.push("/");
            window.scrollTo(0, 0);
            if (isUpdateSuccess) {
                addNotification({
                    title: 'Dog Registered Successfully!',
                    description: `Your dog ${dog.dogName}, has been successfully registered.`,
                    type: 'dog_register_success',
                    isUnRead: true,
                });
            } else {
                toast.error("Failed to register dog");
            }
        } catch (error) {
            toast.error("Failed to register dog");
            console.log(`Error to register dog: ${error}`);
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
            return null;
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
            toast.error("Failed uploading profile photo");
        }
    };

    const updateImagesForDogEntity = async (imageIDs: number[]) => {
        try {
            const response = await api.put(`/dogs/update/images/`, imageIDs);
            return true;
        } catch (error) {
            console.error(`Error updating dog images: ${error}`);
            return false;
        }
    };
    const dogAges = [
        { age: Age.PUPPY, label: 'Puppy', years: '0-1 years' },
        { age: Age.ADULT, label: 'Adult', years: '1-9 years' },
        { age: Age.SENIOR, label: 'Senior', years: '9 years +' },
    ];

    return (
        <Box sx={{ width: '100%', position: 'relative', backgroundColor: 'text.alternate', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', lineHeight: 'normal', tracking: 'normal' }}>
            <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'start', px: { md: 5 } }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', maxWidth: 'calc(100% - 312px)', textAlign: 'center', fontSize: '29xl', color: 'text.alternate', fontFamily: 'text-medium-normal', px: { md: 5 } }}>
                    <Box sx={{ width: '100%', backgroundColor: '#006cbf', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', pt: 4, px: 2.5, pb: 7.5, gap: 0 }}>
                        <Typography variant="h1" sx={{ fontSize: '48px', lineHeight: '120%', fontFamily: 'Inter', color: 'white', textAlign: 'center' }}>
                            Set Up Your Dog Details
                        </Typography>
                        <Typography sx={{ fontSize: '18px', lineHeight: '150%', fontFamily: 'Inter', color: 'white', textAlign: 'center' }}>
                            Complete the forms below to provide information about your dog.
                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%', backgroundColor: 'text.alternate', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '100%', fontSize: '5xl', color: 'text.primary', gap: 2.5 }}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '100%' }}>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'end', justifyContent: 'start', pt: 2, pb: 1.5 }}>
                                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: 1 }}>
                                    <Typography variant="h3" sx={{ m: 0, width: '100%', fontSize: 'inherit', lineHeight: '34px', fontWeight: 'bold', fontFamily: 'inherit' }}>
                                        Dog Details Form
                                    </Typography>
                                    <Typography sx={{ width: '100%', fontSize: 'base', lineHeight: '150%' }}>
                                        Please fill the necessary information found in the following questions.
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', py: 0, px: 2.5, gap: 3 }}>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                                        What is Your Dog's Name?
                                    </Typography>
                                    <TextField
                                        label="Dog Name"
                                        name="dogName"
                                        variant="outlined"
                                        fullWidth
                                        onChange={changeHandlerDog}
                                        error={!!dogNameError}
                                        helperText={dogNameError}
                                        required

                                    />
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
                                            marginTop: '20px',
                                        }}
                                    >
                                        What is Your Dog's Breed?
                                    </Typography>
                                    <TextField
                                        label="Dog Breed"
                                        name="dogBreed"
                                        variant="outlined"
                                        fullWidth
                                        onChange={changeHandlerDog}
                                        error={!!dogBreedError}
                                        helperText={dogBreedError}
                                        required
                                    />
                                </Box>



                                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
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
                                            marginBottom: '6px',
                                        }}
                                    >
                                        How Old is Your Dog?
                                    </Typography>
                                    {dogAges.map(({ age, label, years }) => (
                                        <Button
                                            key={age}
                                            variant={selectedAge === age ? "contained" : "outlined"}
                                            onClick={() => clickAgeHandlerDog(age)}
                                            sx={{
                                                minWidth: '100px',
                                                flex: '1 1 calc(33% - 10px)',
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
                                                borderColor: selectedAge === age ? 'primary.main' : 'grey.500',
                                                color: selectedAge === age ? 'white' : 'black',
                                                backgroundColor: selectedAge === age ? '#006CBF' : 'transparent',
                                                '&:hover': {
                                                    borderColor: selectedAge === age ? 'primary.main' : 'grey.700',
                                                    backgroundColor: selectedAge === age ? '#0056A4' : 'transparent',
                                                },
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: '16px', marginBottom: '5px' }}>
                                                {label}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontSize: '14px' }}>
                                                {years}
                                            </Typography>
                                        </Button>
                                    ))}
                                </Box>
                                <DogSizeInput selectedSize={selectedSize} onSizeClick={clickSizeHandlerDog} multiple={false} />

                                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
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
                                        Training Level
                                    </Typography>
                                    <Button
                                        variant={selectedTrainingLevel === TrainingLevel.BEGINNER ? "contained" : "outlined"}
                                        onClick={() => clickTrainingLevelHandlerDog(TrainingLevel.BEGINNER)}
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
                                            borderColor: selectedTrainingLevel === TrainingLevel.BEGINNER ? 'primary.main' : 'grey.500',
                                            color: selectedTrainingLevel === TrainingLevel.BEGINNER ? 'white' : 'black',
                                            backgroundColor: selectedTrainingLevel === TrainingLevel.BEGINNER ? '#006CBF' : 'transparent',
                                            '&:hover': {
                                                borderColor: selectedTrainingLevel === TrainingLevel.BEGINNER ? 'primary.main' : 'grey.700',
                                                backgroundColor: selectedTrainingLevel === TrainingLevel.BEGINNER ? '#0056A4' : 'transparent',
                                            },
                                        }}
                                    >
                                        Beginner
                                    </Button>
                                    <Button
                                        variant={selectedTrainingLevel === TrainingLevel.INTERMEDIATE ? "contained" : "outlined"}
                                        onClick={() => clickTrainingLevelHandlerDog(TrainingLevel.INTERMEDIATE)}
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
                                            borderColor: selectedTrainingLevel === TrainingLevel.INTERMEDIATE ? 'primary.main' : 'grey.500',
                                            color: selectedTrainingLevel === TrainingLevel.INTERMEDIATE ? 'white' : 'black',
                                            backgroundColor: selectedTrainingLevel === TrainingLevel.INTERMEDIATE ? '#006CBF' : 'transparent',
                                            '&:hover': {
                                                borderColor: selectedTrainingLevel === TrainingLevel.INTERMEDIATE ? 'primary.main' : 'grey.700',
                                                backgroundColor: selectedTrainingLevel === TrainingLevel.INTERMEDIATE ? '#0056A4' : 'transparent',
                                            },
                                        }}
                                    >
                                        Intermediate
                                    </Button>
                                    <Button
                                        variant={selectedTrainingLevel === TrainingLevel.ADVANCED ? "contained" : "outlined"}
                                        onClick={() => clickTrainingLevelHandlerDog(TrainingLevel.ADVANCED)}
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
                                            borderColor: selectedTrainingLevel === TrainingLevel.ADVANCED ? 'primary.main' : 'grey.500',
                                            color: selectedTrainingLevel === TrainingLevel.ADVANCED ? 'white' : 'black',
                                            backgroundColor: selectedTrainingLevel === TrainingLevel.ADVANCED ? '#006CBF' : 'transparent',
                                            '&:hover': {
                                                borderColor: selectedTrainingLevel === TrainingLevel.ADVANCED ? 'primary.main' : 'grey.700',
                                                backgroundColor: selectedTrainingLevel === TrainingLevel.ADVANCED ? '#0056A4' : 'transparent',
                                            },
                                        }}
                                    >
                                        Advanced
                                    </Button>
                                </Box>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                                            marginTop: '6px',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        About your Dog
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        placeholder="Tell us about your dog..."
                                        name="about"
                                        variant="outlined"
                                        onChange={changeHandlerDog}
                                        sx={{ mb: 2 }}
                                    />
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
                                            marginTop: '6px',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Any Special Requirements For Your Dog?
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        placeholder="Let us know about your dog needs..."
                                        name="specialRequirements"
                                        variant="outlined"
                                        onChange={changeHandlerDog}
                                    />
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                                            marginTop: '6px',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Add Pictures of Your Dog (at least 1 photo*)
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                        {images.map((image, index) => (
                                            <label key={index} style={{ position: "relative" }}>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(event) => handleImageChange(index, event)}
                                                    style={{ display: "none" }}
                                                />
                                                <img
                                                    className="h-[100px] w-[100px] relative object-cover min-h-[100px] shrink-0 cursor-pointer"
                                                    loading="lazy"
                                                    alt=""
                                                    src={image ? URL.createObjectURL(image) : "/service-avatar-image-1@2x.png"}
                                                    onClick={() => document.getElementById(`fileInput-${index}`)?.click()}
                                                />
                                            </label>
                                        ))}
                                    </Box>
                                </Box>
                                {dogImagesError && <Typography color="error">{dogImagesError}</Typography>}
                                <Button
                                    variant="contained"
                                    onClick={registerDogHandler}
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
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default DogRegisterView;
