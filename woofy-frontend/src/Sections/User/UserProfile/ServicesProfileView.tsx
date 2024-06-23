import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, TextField, Grid, Button } from "@mui/material";
import { UserContext } from "../../../provider/UserProvider";
import { api } from "../../../api/api";
import DogSizeInput from "../selectButtons/DogSizeInput";
import HomeConditionComponent from "../selectButtons/HomeConditionComponent";
import PetsInHomeComponent from "../selectButtons/PetsInHomeComponent";
import { toast } from "react-toastify";
import { getImage } from "../../../components/image/imageComponent";

const serviceTypeMapping = {
    dogSitterEntity: 'dog-sitter',
    dogWalkerEntity: 'dog-walker',
    dayCareEntity: 'day-care',
    boardingEntity: 'boarding'
};

const ServicesProfileView = () => {
    const { userDetails } = useContext(UserContext);
    const [business, setBusiness] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [serviceData, setServiceData] = useState({});
    const [businessImages, setBusinessImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`business/${userDetails.id}`);
                const data = response.data;
                setBusiness(data);

                const imageUrls = await Promise.all(data.images.map(async (imageId) => {
                    const url = await getImage(imageId);
                    return { id: imageId, url };
                }));
                const images = imageUrls.length < 4
                    ? [...imageUrls, ...Array(4 - imageUrls.length).fill({ id: null, url: "/service-avatar-image-1@2x.png" })]
                    : imageUrls;
                setBusinessImages(images);

                const updatedData = Object.keys(serviceTypeMapping).reduce((acc, serviceType) => {
                    const mappedType = serviceTypeMapping[serviceType];
                    if (data[serviceType]) {
                        acc[mappedType] = data[serviceType];
                    }
                    return acc;
                }, {});
                setServiceData(updatedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userDetails.id]);

    const handleChange = (event, serviceType) => {
        const { name, value } = event.target;
        setServiceData((prevData) => ({
            ...prevData,
            [serviceType]: {
                ...prevData[serviceType],
                [name]: value,
            },
        }));
    };

    const handleSizeClick = (size, serviceType) => {
        setServiceData((prevData) => {
            const currentSizes = prevData[serviceType]?.acceptableDogSizes || [];
            const updatedSizes = currentSizes.includes(size)
                ? currentSizes.filter((s) => s !== size)
                : [...currentSizes, size];
            return {
                ...prevData,
                [serviceType]: {
                    ...prevData[serviceType],
                    acceptableDogSizes: updatedSizes,
                },
            };
        });
    };

    const handleHomeConditionsClick = (condition, serviceType) => {
        setServiceData((prevData) => {
            const currentConditions = prevData[serviceType]?.homeConditions || [];
            const updatedConditions = currentConditions.includes(condition)
                ? currentConditions.filter((c) => c !== condition)
                : [...currentConditions, condition];
            return {
                ...prevData,
                [serviceType]: {
                    ...prevData[serviceType],
                    homeConditions: updatedConditions,
                },
            };
        });
    };

    const handlePetsInHomeClick = (condition, serviceType) => {
        setServiceData((prevData) => {
            const currentConditions = prevData[serviceType]?.petsInHome || [];
            const updatedConditions = currentConditions.includes(condition)
                ? currentConditions.filter((c) => c !== condition)
                : [...currentConditions, condition];
            return {
                ...prevData,
                [serviceType]: {
                    ...prevData[serviceType],
                    petsInHome: updatedConditions,
                },
            };
        });
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        const imageURL = URL.createObjectURL(file);
        setBusinessImages(prevImages => {
            const updatedImages = Array.isArray(prevImages) ? [...prevImages] : [];
            updatedImages[index] = { url: imageURL, file };
            return updatedImages;
        });
        setSelectedImage({ file, index });
    };

    const handleImageSave = async () => {
        if (selectedImage) {
            const { file, index } = selectedImage;
            const existingImageId = businessImages[index]?.id;
            if (existingImageId) {
                await updatePhotoInDB(existingImageId, file);
                const url = await getImage(existingImageId);
                setBusinessImages(prevImages => {
                    const updatedImages = Array.isArray(prevImages) ? [...prevImages] : [];
                    updatedImages[index] = { id: existingImageId, url };
                    return updatedImages;
                });
            } else {
                const newImageId = await savePhotoToDB(file);
                const url = await getImage(newImageId);
                setBusinessImages(prevImages => {
                    const updatedImages = Array.isArray(prevImages) ? [...prevImages] : [];
                    updatedImages[index] = { id: newImageId, url };
                    const updatedImageIds = updatedImages.map(image => image.id);
                    api.patch(`/business/update`, { images: updatedImageIds });
                    return updatedImages;
                });
            }
            setSelectedImage(null);
            toast.success('Profile photo updated successfully');
        }
    };

    const savePhotoToDB = async (file) => {
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
        }
    };

    const updatePhotoInDB = async (id, file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            await api.patch(`/image/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            toast.error("Failed updating profile photo");
        }
    };

    const handleImageCancel = () => {
        if (business) {
            const imageUrls = Array.isArray(business.images) ? business.images.map((imageId, index) => ({
                id: imageId,
                url: businessImages[index]?.url || "/service-avatar-image-1@2x.png"
            })) : [];
            setBusinessImages(imageUrls);
            setSelectedImage(null);
        }
    };

    const handleSave = async () => {
        try {
            await Promise.all(Object.keys(serviceData).map(async (serviceType) => {
                const { AppointmentEntities, ScheduleEntities, ...serviceDetails } = serviceData[serviceType]; // Exclude AppointmentEntities and ScheduleEntities
                await api.put(`business/business-type/${serviceType}/edit`, serviceDetails, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            }));

            const updatedImageIds = businessImages.map(image => image.id);
            await api.patch(`/business/update`, { images: updatedImageIds });

            setIsEditing(false);
            toast.success('Service details updated successfully');
        } catch (error) {
            console.error('Error updating service details:', error);
            toast.error('Failed to update service details');
        }
    };

    const renderService = (service, serviceType) => (
        <Box key={serviceType} sx={{ marginBottom: 4, paddingBottom: 4, borderBottom: '1px solid #ddd' }}>
            <Typography variant="h6">{serviceType.replace(/([A-Z])/g, ' $1').trim()}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Price"
                        variant="outlined"
                        fullWidth
                        name="price"
                        value={serviceData[serviceType]?.price || ""}
                        onChange={(event) => handleChange(event, serviceType)}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Dog Capacity"
                        variant="outlined"
                        fullWidth
                        name="dogCapacity"
                        value={serviceData[serviceType]?.dogCapacity || ""}
                        onChange={(event) => handleChange(event, serviceType)}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Start Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        name="startDate"
                        value={serviceData[serviceType]?.startDate || ""}
                        onChange={(event) => handleChange(event, serviceType)}
                        disabled={!isEditing}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="End Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        name="endDate"
                        value={serviceData[serviceType]?.endDate || ""}
                        onChange={(event) => handleChange(event, serviceType)}
                        disabled={!isEditing}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Start Time"
                        type="time"
                        variant="outlined"
                        fullWidth
                        name="startTime"
                        value={serviceData[serviceType]?.startTime || ""}
                        onChange={(event) => handleChange(event, serviceType)}
                        disabled={!isEditing}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="End Time"
                        type="time"
                        variant="outlined"
                        fullWidth
                        name="endTime"
                        value={serviceData[serviceType]?.endTime || ""}
                        onChange={(event) => handleChange(event, serviceType)}
                        disabled={!isEditing}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="About"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        name="about"
                        value={serviceData[serviceType]?.about || ""}
                        onChange={(event) => handleChange(event, serviceType)}
                        disabled={!isEditing}
                    />
                </Grid>

                {/* Unique fields for boarding */}
                {serviceType === 'boarding' && (
                    <>
                        <Grid item xs={12} sm={6}>
                            <HomeConditionComponent
                                selectedHomeConditions={serviceData[serviceType]?.homeConditions || []}
                                clickHomeConditionsHandler={(condition) => handleHomeConditionsClick(condition, serviceType)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <PetsInHomeComponent
                                selectedPetsInHome={serviceData[serviceType]?.petsInHome || []}
                                clickPetsInHomeHandler={(condition) => handlePetsInHomeClick(condition, serviceType)}
                            />
                        </Grid>
                    </>
                )}

                {/* Unique fields for day care */}
                {serviceType === 'day-care' && (
                    <>
                        <Grid item xs={12} sm={6}>
                            <HomeConditionComponent
                                selectedHomeConditions={serviceData[serviceType]?.homeConditions || []}
                                clickHomeConditionsHandler={(condition) => handleHomeConditionsClick(condition, serviceType)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <PetsInHomeComponent
                                selectedPetsInHome={serviceData[serviceType]?.petsInHome || []}
                                clickPetsInHomeHandler={(condition) => handlePetsInHomeClick(condition, serviceType)}
                            />
                        </Grid>
                    </>
                )}

                <Grid item xs={12}>
                    <DogSizeInput
                        selectedSize={serviceData[serviceType]?.acceptableDogSizes || []}
                        onSizeClick={(size) => handleSizeClick(size, serviceType)}
                        multiple={true}
                    />
                </Grid>
            </Grid>
        </Box>
    );

    if (!business) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: "#0071c2",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 8,
                }}
            >
                <Typography variant="h1" sx={{
                    fontSize: '48px!important',
                    lineHeight: '120%',
                    fontFamily: 'inter',
                    color: 'white',
                    textAlign: 'center',
                    position: 'relative'
                }}>
                    Services Profile
                </Typography>
            </Box>
            <Box sx={{ padding: 4, flexGrow: 1, overflowY: 'auto' }}>
                <Box sx={{ marginTop: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {Array.isArray(businessImages) && businessImages.map((image, index) => (
                        <Box key={index} sx={{ position: 'relative' }}>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id={`photo-upload-${index}`}
                                onChange={(event) => handleImageChange(index, event)}
                            />
                            <img
                                src={image.url}
                                alt={`Service image ${index}`}
                                style={{ height: "100px", width: "100px", borderRadius: "50%", cursor: "pointer" }}
                                onClick={() => document.getElementById(`photo-upload-${index}`).click()}
                            />
                        </Box>
                    ))}
                </Box>
                {selectedImage && (
                    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                        <Button variant="contained" onClick={handleImageSave}>
                            Save photo
                        </Button>
                        <Button variant="outlined" onClick={handleImageCancel}>
                            Cancel
                        </Button>
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                    <Button
                        variant="outlined"
                        onClick={() => setIsEditing(!isEditing)}
                        sx={{
                            py: 1,
                            px: 2,
                            borderRadius: "30px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            color: isEditing ? 'black' : '#444444', // Change text color to black when editing
                            border: '1px solid',
                            borderColor: isEditing ? 'grey.500' : 'grey.500',
                            backgroundColor: 'transparent',
                            textTransform: "none",
                            '&:hover': {
                                backgroundColor: isEditing ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                                borderColor: 'grey.700',
                            },
                        }}
                    >
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                    {isEditing && (
                        <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                                sx={{
                                    borderRadius: '30px',
                                    backgroundColor: '#006CBF',
                                    '&:hover': {
                                        backgroundColor: '#0056A4',
                                    },
                                    padding: '10px 20px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                Save Changes
                            </Button>
                    )}
                </Box>

                <Box sx={{ marginTop: 4 }}>
                    {serviceData['dog-sitter'] && renderService(serviceData['dog-sitter'], 'dog-sitter')}
                    {serviceData['dog-walker'] && renderService(serviceData['dog-walker'], 'dog-walker')}
                    {serviceData['boarding'] && renderService(serviceData['boarding'], 'boarding')}
                    {serviceData['day-care'] && renderService(serviceData['day-care'], 'day-care')}
                </Box>
            </Box>
        </Box>
    );
};

export default ServicesProfileView;
