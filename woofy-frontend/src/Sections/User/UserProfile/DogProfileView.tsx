import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Button, TextField, Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { UserContext } from "../../../provider/UserProvider";
import { api } from "../../../api/api";
import { Age, Size, TrainingLevel } from "../../../models/Enums/Enums";
import { formatEnumValue } from "../../../utils/format-enum-text";
import { toast } from "react-toastify";
import {getImage} from "../../../components/image/imageComponent";
import RegisterYourDogCTA from "../Customer/DogRegister/RegisterYourDogCTA";


const DogProfileView = () => {
    const { userDetails } = useContext(UserContext);
    const [dogData, setDogData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [dogProfile, setDogProfile] = useState({
        dogName: "",
        dogBreed: "",
        age: "",
        size: "",
        trainingLevel: "",
        about: "",
        specialRequirements: "",
        pictures: Array(4).fill({ id: null, url: "/service-avatar-image-1@2x.png" })
    });

    useEffect(() => {
        if (userDetails && userDetails.id) {
            api.post('dogs/getByUserId', { id: userDetails.id })
                .then(async (response) => {
                    if (response.data) {
                        setDogData(response.data);
                        const pictureUrls = await Promise.all(response.data.pictures.map(async (picture) => {
                            const url = await getImage(picture);
                            return { id: picture, url };
                        }));
                        const pictures = pictureUrls.length < 4
                            ? [...pictureUrls, ...Array(4 - pictureUrls.length).fill({ id: null, url: "/service-avatar-image-1@2x.png" })]
                            : pictureUrls;
                        setDogProfile({ ...response.data, pictures });
                    }
                })
                .catch(error => {
                    console.error('Error fetching dog', error);
                });
        }
    }, [userDetails]);

    const validateField = (name, value) => {
        let error = "";
        if (!value.trim()) {
            error = `${name} is required`;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDogProfile((prevProfile) => {
            const updatedProfile = { ...prevProfile, [name]: value };
            validateField(name, value);
            return updatedProfile;
        });
    };

    const handleSave = async () => {
        try {
            const { pictures, ...dogDTO } = dogProfile;

            await api.put(`/dogs/update`, dogDTO, { headers: { "Content-Type": "application/json" } });
            setIsEditing(false);
            toast.success('Dog profile updated successfully');
        } catch (error) {
            console.error('Error updating dog profile:', error);
            toast.error('Failed to update dog profile');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (dogData) {
            setDogProfile({ ...dogProfile, ...dogData, pictures: dogProfile.pictures });
        }
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        if (file) {
            const imageURL = URL.createObjectURL(file);
            setDogProfile(prevProfile => {
                const updatedPictures = [...prevProfile.pictures];
                updatedPictures[index] = { ...updatedPictures[index], url: imageURL, file };
                return { ...prevProfile, pictures: updatedPictures };
            });
            setSelectedImage({ file, index });
        }
    };

    const handleImageSave = async () => {
        if (selectedImage) {
            const pictureId = dogProfile.pictures[selectedImage.index].id;
            let newImageId;
            if (pictureId && pictureId !== null) {
                await updatePhotoInDB(pictureId, selectedImage.file);
                newImageId = pictureId;
            } else {
                newImageId = await savePhotoToDB(selectedImage.file);
                const updatedPictures = [...dogProfile.pictures];
                updatedPictures[selectedImage.index] = { id: newImageId, url: URL.createObjectURL(selectedImage.file) };
                setDogProfile(prevProfile => ({ ...prevProfile, pictures: updatedPictures }));
                await updateImagesForDogEntity([...updatedPictures.map(picture => picture.id)]);
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

    const updateImagesForDogEntity = async (imageIDs) => {
        try {
            await api.put(`/dogs/update/images/`, imageIDs);
            return true;
        } catch (error) {
            console.error(`Error updating dog images: ${error}`);
            return false;
        }
    };

    const handleImageCancel = () => {
        if (dogData) {
            setDogProfile(prevProfile => ({ ...prevProfile, pictures: prevProfile.pictures.map(picture => {
                    const originalPicture = dogData.pictures.find(p => p.id === picture.id);
                    return originalPicture ? { id: originalPicture.id, url: picture.url } : picture;
                }) }));
        }
    };

    if (!dogData) {
        return <Typography><RegisterYourDogCTA/></Typography>;
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
                    Dog Profile
                </Typography>
            </Box>
            <Box sx={{ padding: 4, flexGrow: 1, overflowY: 'auto' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                    {dogProfile.pictures.map((picture, index) => (
                        <Box key={index} sx={{ position: 'relative' }}>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id={`photo-upload-${index}`}
                                onChange={(event) => handleImageChange(index, event)}
                            />
                            <img
                                src={picture.url}
                                alt={`Dog Avatar ${index + 1}`}
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {!isEditing && (
                        <Button variant="contained" color="primary" onClick={() => setIsEditing(!isEditing)}>
                            {"Edit"}
                        </Button>
                    )}
                </Box>
                <Box sx={{ marginTop: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Dog Name"
                                variant="outlined"
                                fullWidth
                                name="dogName"
                                value={dogProfile.dogName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                error={!!errors.dogName}
                                helperText={errors.dogName}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Dog Breed"
                                variant="outlined"
                                fullWidth
                                name="dogBreed"
                                value={dogProfile.dogBreed}
                                onChange={handleChange}
                                disabled={!isEditing}
                                error={!!errors.dogBreed}
                                helperText={errors.dogBreed}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" error={!!errors.age}>
                                <InputLabel required>Age</InputLabel>
                                <Select
                                    name="age"
                                    value={dogProfile.age}
                                    onChange={handleChange}
                                    label="Age"
                                    disabled={!isEditing}
                                    required
                                >
                                    {Object.values(Age).map((age) => (
                                        <MenuItem key={age} value={age}>
                                            {formatEnumValue(age)}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.age && <Typography color="error">{errors.age}</Typography>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" error={!!errors.trainingLevel}>
                                <InputLabel required>Training Level</InputLabel>
                                <Select
                                    name="trainingLevel"
                                    value={dogProfile.trainingLevel}
                                    onChange={handleChange}
                                    label="Training Level"
                                    disabled={!isEditing}
                                    required
                                >
                                    {Object.values(TrainingLevel).map((level) => (
                                        <MenuItem key={level} value={level}>
                                            {formatEnumValue(level)}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.trainingLevel && <Typography color="error">{errors.trainingLevel}</Typography>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" error={!!errors.size}>
                                <InputLabel required>Size</InputLabel>
                                <Select
                                    name="size"
                                    value={dogProfile.size}
                                    onChange={handleChange}
                                    label="Size"
                                    disabled={!isEditing}
                                    required
                                >
                                    {Object.values(Size).map((size) => (
                                        <MenuItem key={size} value={size}>
                                            {formatEnumValue(size)}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.size && <Typography color="error">{errors.size}</Typography>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="About"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                name="about"
                                value={dogProfile.about}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Special Requirements"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                name="specialRequirements"
                                value={dogProfile.specialRequirements}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                    </Grid>
                </Box>
                {isEditing && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4, gap: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default DogProfileView;
