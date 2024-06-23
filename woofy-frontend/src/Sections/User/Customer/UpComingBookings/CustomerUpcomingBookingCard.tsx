import React, { FunctionComponent, useMemo, CSSProperties, useState, useEffect } from "react";
import { Box, Typography, IconButton, Menu, MenuItem, Dialog, DialogContent } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { BUSINESS_TYPES } from "../../../../models/Enums/Enums";
import { getImage } from "../../../../components/image/imageComponent";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

export type UpcomingBookingCardType = {
    icon?: string;
    businessType?: BUSINESS_TYPES;
    businessName?: string;
    businessId?: number;
    address?: string;
    city?: string;
    date?: string;
    endDate?: string;
    startTime?: string;
    businessProfilePhotoID?: number;
    businessProfileImage?: any;
    serviceImageIDs?: number[];
    onCancel: () => void;
    /** Style props */
    propMinWidth?: CSSProperties["minWidth"];
    serviceTagWidth?: CSSProperties["width"];
    serviceTagHeight?: CSSProperties["height"];
    businessTypeWidth?: CSSProperties["width"];
};

const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const CustomerUpcomingBookingCard: FunctionComponent<UpcomingBookingCardType> = ({
    icon,
    businessType,
    businessName,
    businessId,
    address,
    city,
    date,
    endDate,
    startTime,
    businessProfilePhotoID,
    serviceImageIDs,
    onCancel,
    propMinWidth,
    serviceTagWidth,
    serviceTagHeight,
    businessTypeWidth,
}) => {
    const [profileImage, setProfileImage] = useState<string | undefined>('/default-avatar-image@2x.png');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [serviceImages, setServiceImages] = useState<string[]>([]);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImage = async () => {
            if (businessProfilePhotoID) {
                const image = await getImage(businessProfilePhotoID);
                setProfileImage(image);
            } else {
                setProfileImage('/default-avatar-image@2x.png');
            }
        };

        fetchImage();
    }, [businessProfilePhotoID]);

    useEffect(() => {
        const fetchServiceImages = async () => {
            if (serviceImageIDs) {
                const images = await Promise.all(
                    serviceImageIDs.map(async (imageID) => await getImage(imageID))
                );
                setServiceImages(images);
            }
        };

        fetchServiceImages();
    }, [serviceImageIDs]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleImageClick = (image: string) => {
        setCurrentImage(image);
    };

    const businessTypeStyle: CSSProperties = useMemo(() => ({
        minWidth: propMinWidth,
        width: businessTypeWidth,
    }), [propMinWidth, businessTypeWidth]);

    const serviceTagStyle: CSSProperties = useMemo(() => ({
        width: serviceTagWidth,
        height: 30,
        lineHeight: "30px",
    }), [serviceTagWidth]);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    gap: 2,
                    borderColor: "grey.700",
                    width: "100%",
                    maxWidth: "100%",
                    mx: "auto",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                        backgroundColor: "#f5f5f5",
                    },
                    position: "relative",
                }}
            >
                <Box
                    component="img"
                    sx={{
                        height: { xs: 100, md: 144 },
                        width: { xs: 100, md: 144 },
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}
                    alt="profile"
                    src={profileImage || "/placeholder-image@2x.png"}
                />
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: { xs: "center", md: "flex-start" },
                        gap: 1,
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            gap: 1,
                        }}
                    >
                        <Typography
                            component="b"
                            sx={{
                                fontWeight: "bold",
                                lineHeight: "150%",
                                fontSize: { xs: "1rem", md: "1.25rem" },
                                textAlign: { xs: "center", md: "left" },
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {businessName}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 1,
                                position: "absolute",
                                top: 16,
                                right: 48, // Moved right to accommodate 3 dots icon
                                bgcolor: "#006CBF",
                                borderRadius: "24px",
                                color: "white",
                                p: 1,
                                ...serviceTagStyle,
                                minWidth: 120,
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    height: 24,
                                    width: 24,
                                    objectFit: "cover",
                                }}
                                alt="icon"
                                src={icon}
                            />
                            <Typography
                                variant="body2"
                                component="div"
                                sx={{
                                    lineHeight: "150%",
                                    fontWeight: "medium",
                                    minWidth: 70,
                                    ...businessTypeStyle,
                                }}
                            >
                                {formatEnumValue(businessType)}
                            </Typography>
                        </Box>
                        <IconButton
                            sx={{ position: "absolute", top: 16, right: 16 }}
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: { xs: "center", md: "flex-start" },
                            gap: 0.5,
                            width: "100%",
                        }}
                    >
                        <Typography
                            variant="body2"
                            component="div"
                            sx={{
                                lineHeight: "150%",
                                textAlign: { xs: "center", md: "left" },
                                fontSize: { xs: "1rem", md: "1rem" },
                                whiteSpace: "nowrap",
                            }}
                        >
                            {businessType === BUSINESS_TYPES.BOARDING ? `${formatDate(date)} - ${formatDate(endDate)}` : formatDate(date)}
                        </Typography>
                        <Typography
                            variant="body2"
                            component="div"
                            sx={{
                                lineHeight: "150%",
                                textAlign: { xs: "center", md: "left" },
                            }}
                        >
                            {startTime ? startTime.substring(0, 5) : null}
                        </Typography>
                        <Typography
                            variant="body2"
                            component="div"
                            whiteSpace={"nowrap"}
                            sx={{
                                lineHeight: "150%",
                                textAlign: { xs: "center", md: "left" },
                            }}
                        >
                            {address}, {city}
                        </Typography>
                    </Box>
                    {serviceImages.length > 0 && (
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                position: 'absolute',
                                bottom: 16,
                                right: 16,
                                paddingTop: 1,
                            }}
                        >
                            {serviceImages.map((image, index) => (
                                <Box
                                    component="img"
                                    key={index}
                                    sx={{
                                        height: 70,
                                        width: 70,
                                        borderRadius: '8px',
                                        objectFit: "cover",
                                        cursor: 'pointer',
                                    }}
                                    alt={`Service ${index + 1}`}
                                    src={image}
                                    onClick={() => handleImageClick(image)}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-end" },
                        width: "100%",
                        mt: { xs: 2, md: 0 },
                    }}
                >
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => navigate(`/business-profile/${businessId}`)}>Business Page</MenuItem>
                        <MenuItem onClick={onCancel}>Cancel Booking</MenuItem>
                    </Menu>
                </Box>
            </Box>

            <Dialog
                open={!!currentImage}
                onClose={() => setCurrentImage(null)}
                maxWidth="sm"
                fullWidth
            >
                <DialogContent sx={{ backgroundColor: theme.palette.background.default }}>
                    <IconButton
                        sx={{ position: 'absolute', top: 16, right: 16, color: theme.palette.grey[700] }}
                        onClick={() => setCurrentImage(null)}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box
                        component="img"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '80vh',
                            objectFit: 'contain',
                        }}
                        src={currentImage || ""}
                        alt="Service Image"
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CustomerUpcomingBookingCard;

const formatEnumValue = (value: string | undefined) => {
    if (!value) return '';
    return value.replace(/_/g, ' ').toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
};
