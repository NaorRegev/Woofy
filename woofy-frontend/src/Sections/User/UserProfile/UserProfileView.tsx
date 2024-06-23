import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { UserContext } from "../../../provider/UserProvider";
import { api } from "../../../api/api";
import UserProfileRow from "./UserProfileRow";
import { getImage } from "../../../components/image/imageComponent";
import { toast } from "react-toastify";
import { useAuth } from "../../../provider/AuthProvider";

const UserProfileView = () => {
    const { userDetails } = useContext(UserContext);
    const { logout } = useAuth();
    const [imageSrc, setImageSrc] = useState("/user-avatar-image@2x.png");
    const [profile, setProfile] = useState({
        businessName: userDetails?.role === "BUSINESS" ? "" : undefined,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        city: "",
        zipCode: "",
        email: "",
        password: "*****",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [editingField, setEditingField] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [originalImageSrc, setOriginalImageSrc] = useState("");
    const [open, setOpen] = useState(false); // State for the dialog

    useEffect(() => {
        if (userDetails) {
            setProfile({
                businessName: userDetails.businessName || "",
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                phoneNumber: userDetails.phoneNumber,
                address: userDetails.address,
                city: userDetails.city,
                zipCode: userDetails.zipCode,
                email: userDetails.email,
                password: "*******",
            });
        }

        const fetchImage = async () => {
            if (userDetails?.profilePhotoID) {
                const image = await getImage(userDetails.profilePhotoID);
                setImageSrc(image);
                setOriginalImageSrc(image);
            } else {
                setImageSrc('/default-avatar-image@2x.png');
                setOriginalImageSrc('/default-avatar-image@2x.png');
            }
        };

        fetchImage();
    }, [userDetails]);

    const validateField = (name, value, profile) => {
        let error = "";
        if (!value.trim()) {
            error = `${name} is required`;
        } else {
            switch (name) {
                case "phoneNumber":
                    if (!/^\d{10}$/.test(value)) {
                        error = "Phone number must be 10 digits";
                    }
                    break;
                case "email":
                    if (!/\S+@\S+\.\S+/.test(value)) {
                        error = "Email is invalid";
                    }
                    break;
                case "confirmPassword":
                    if (profile.newPassword !== profile.confirmPassword) {
                        error = "Passwords do not match";
                    }
                    break;
                default:
                    break;
            }
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile((prevProfile) => {
            const updatedProfile = { ...prevProfile, [name]: value };
            validateField(name, value, updatedProfile);
            return updatedProfile;
        });
    };

    const handleSave = async (field) => {
        try {
            const dataToUpdate = {};
            if (field === "name") {
                dataToUpdate.firstName = profile.firstName;
                dataToUpdate.lastName = profile.lastName;
            } else if (field === "password") {
                await api.patch(`/user/change-password`, {
                    currentPassword: profile.password,
                    newPassword: profile.newPassword,
                    confirmationPassword: profile.confirmPassword,
                });
            } else {
                dataToUpdate[field] = profile[field];
            }

            if (userDetails.role === "BUSINESS" && field === "businessName") {
                await api.patch(`/business/update`, { businessName: profile.businessName });
            } else {
                await api.patch(`/user/update`, dataToUpdate);
            }

            setEditingField("");
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response.data.message || 'Failed to update profile');
        }
    };

    const handleEdit = (field) => {
        if (field === "password") {
            setProfile((prevProfile) => ({
                ...prevProfile,
                password: "",
            }));
        }
        setEditingField(field);
    };

    const handleCancel = (field) => {
        setEditingField("");
        if (userDetails) {
            setProfile({
                ...profile,
                [field]: userDetails[field] || "",
                password: "*******",
            });
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImageSrc(imageURL);
            setSelectedImage(file);
        }
    };

    const handleImageSave = async () => {
        if (selectedImage && userDetails.profilePhotoID) {
            const formData = new FormData();
            formData.append('image', selectedImage);
            try {
                await api.patch(`/image/update/${userDetails.profilePhotoID}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setOriginalImageSrc(imageSrc); // Update original image src to the new one
                setSelectedImage(null);
                toast.success('Profile photo updated successfully');
            } catch (error) {
                console.error('Error updating profile photo:', error);
                toast.error('Failed to update profile photo');
            }
        }
    };

    const handleImageCancel = () => {
        setImageSrc(originalImageSrc);
        setSelectedImage(null);
    };

    // Handle dialog open and close
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteAccount = async () => {
        try {
            await api.delete('user/delete');
            toast.success('Account deleted successfully');
            logout();
        } catch (error) {
            toast.error('Error deleting account');
        } finally {
            setOpen(false);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                backgroundColor: "white",
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    mb: 4,
                    backgroundColor: "#0071c2",
                    color: "white",
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
                    Personal Details
                </Typography>
            </Box>

            <Box sx={{ padding: "20px" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                    <img
                        src={imageSrc}
                        alt="User Avatar"
                        style={{ height: "100px", width: "100px", borderRadius: "50%" }}
                    />
                    <Button
                        variant="outlined"
                        component="label"
                        sx={{
                            py: 1,
                            px: 2,
                            borderRadius: "30px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            color: 'black', // Change text color to black
                            border: '1px solid',
                            borderColor: 'grey.500',
                            textTransform: "none",
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                borderColor: 'grey.700',
                            },
                            ml: 2
                        }}
                    >
                        <img
                            src="/manage-button-icon--editalt.svg"
                            alt=""
                            style={{ height: "24px", width: "24px" }}
                        />
                        <Typography
                            sx={{
                                fontSize: "base",
                                fontFamily: "text.medium.normal",
                                color: "color.neutral.darker",
                                textAlign: "left",
                                minWidth: "30px",
                            }}
                        >
                            Edit photo
                        </Typography>
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>

                    {selectedImage && (
                        <>
                            <Button
                                variant="contained"
                                sx={{ ml: 2 }}
                                onClick={handleImageSave}
                            >
                                Save photo
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ ml: 2 }}
                                onClick={handleImageCancel}
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {userDetails?.role === "BUSINESS" && (
                        <UserProfileRow
                            fullNameLabel="Business Name"
                            nameSurname={profile.businessName}
                            editable={editingField === "businessName"}
                            name="businessName"
                            value={profile.businessName}
                            onChange={handleChange}
                            onSave={() => handleSave("businessName")}
                            onCancel={() => handleCancel("businessName")}
                            error={errors.businessName}
                            onEdit={() => handleEdit("businessName")}
                        />
                    )}
                    <UserProfileRow
                        fullNameLabel="Full Name"
                        nameSurname={`${profile.firstName} ${profile.lastName}`}
                        editable={editingField === "name"}
                        firstName={profile.firstName}
                        lastName={profile.lastName}
                        onChange={handleChange}
                        onSave={() => handleSave("name")}
                        onCancel={() => handleCancel("name")}
                        firstNameError={errors.firstName}
                        lastNameError={errors.lastName}
                        onEdit={() => handleEdit("name")}
                        isNameField={true}
                    />
                    <UserProfileRow
                        fullNameLabel="Phone Number"
                        nameSurname={profile.phoneNumber}
                        editable={editingField === "phoneNumber"}
                        name="phoneNumber"
                        value={profile.phoneNumber}
                        onChange={handleChange}
                        onSave={() => handleSave("phoneNumber")}
                        onCancel={() => handleCancel("phoneNumber")}
                        error={errors.phoneNumber}
                        onEdit={() => handleEdit("phoneNumber")}
                    />
                    <UserProfileRow
                        fullNameLabel="Permanent Address"
                        nameSurname={profile.address}
                        editable={editingField === "address"}
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        onSave={() => handleSave("address")}
                        onCancel={() => handleCancel("address")}
                        error={errors.address}
                        onEdit={() => handleEdit("address")}
                    />
                    <UserProfileRow
                        fullNameLabel="City"
                        nameSurname={profile.city}
                        editable={editingField === "city"}
                        name="city"
                        value={profile.city}
                        onChange={handleChange}
                        onSave={() => handleSave("city")}
                        onCancel={() => handleCancel("city")}
                        error={errors.city}
                        onEdit={() => handleEdit("city")}
                    />
                    <UserProfileRow
                        fullNameLabel="Zip Code"
                        nameSurname={profile.zipCode}
                        editable={editingField === "zipCode"}
                        name="zipCode"
                        value={profile.zipCode}
                        onChange={handleChange}
                        onSave={() => handleSave("zipCode")}
                        onCancel={() => handleCancel("zipCode")}
                        error={errors.zipCode}
                        onEdit={() => handleEdit("zipCode")}
                    />
                    <UserProfileRow
                        fullNameLabel="Email Address"
                        nameSurname={profile.email}
                        editable={editingField === "email"}
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        onSave={() => handleSave("email")}
                        onCancel={() => handleCancel("email")}
                        error={errors.email}
                        onEdit={() => handleEdit("email")}
                    />
                    <UserProfileRow
                        fullNameLabel="Password"
                        nameSurname="********"
                        editable={editingField === "password"}
                        name="password"
                        value={profile.password}
                        onChange={handleChange}
                        onSave={() => handleSave("password")}
                        onCancel={() => handleCancel("password")}
                        error={errors.password}
                        newPassword={profile.newPassword}
                        confirmPassword={profile.confirmPassword}
                        onNewPasswordChange={handleChange}
                        onConfirmPasswordChange={handleChange}
                        newPasswordError={errors.newPassword}
                        confirmPasswordError={errors.confirmPassword}
                        onEdit={() => handleEdit("password")}
                        isPasswordField={true}
                    />
                </Box>

                {/* Add Delete Account Button */}
                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button variant="contained" color="error" onClick={handleClickOpen}>
                        Delete Account
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirm Account Deletion"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete your account? This action cannot be undone.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteAccount} color="error">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </Box>
    );
};

export default UserProfileView;
