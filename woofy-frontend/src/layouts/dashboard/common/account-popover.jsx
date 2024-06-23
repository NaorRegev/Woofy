import {useCallback, useContext, useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import {alpha} from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {UserContext} from "../../../provider/UserProvider";
import {getImage} from "../../../components/image/imageComponent";
import {useAuth} from "../../../provider/AuthProvider";
import {api} from "../../../api/api";
import {toast} from "react-toastify";
import {RouterLink} from "../../../routes/components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import UpComingIcon from "@mui/icons-material/Upcoming";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import {USERTYPE} from "../../../models/RegistrationModel";


export default function AccountPopover() {
    // ----------------------------------------------------------------------
    const {userDetails} = useContext(UserContext);
    const userRole = userDetails?.role;

    const dashboardNavConfig = [
        {
            label: 'Home',
            path: '/',
            icon: 'eva:home-fill',
        },
    ]
    const publicNavConfig = [
        {
            label: 'Manage Account',
            path: '/account',
            icon: 'eva:person-fill',
        },
    ];
    const businessNavConfig = [
        {
            label: 'Upcoming Bookings',
            path: '/bookings',
            icon: <UpComingIcon/>,
        },
        {
            label: 'History',
            path: '/past-bookings',
            icon: <HistoryIcon/>,
        },
    ];
    const customerNavConfig = [
        {
            label: 'My Bookings',
            path: '/bookings',
            icon: <UpComingIcon/>,
        },
        {
            label: 'History',
            path: '/past-bookings',
            icon: <HistoryIcon/>,
        },
    ];

    const MENU_OPTIONS = [
        ...dashboardNavConfig,
        ...(userRole === USERTYPE.BUSINESS ? businessNavConfig : []),
        ...(userRole === USERTYPE.CUSTOMER ? customerNavConfig : []),
        ...publicNavConfig

    ];

// ----------------------------------------------------------------------

    const [open, setOpen] = useState(null);
    const [imageSrc, setImageSrc] = useState("/user-avatar-image@2x.png");
    const {logout} = useAuth();

    const onLogoutButtonClick = useCallback(async () => {
        logout();
        try {
            const res = await api.post('auth/logout');
        } catch (error) {
            toast.error('An error occurred while logging out. Please try again.');
        }
    }, [logout]);
    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    useEffect(() => {
        const fetchImage = async () => {
            if (userDetails?.profilePhotoID) {
                const image = await getImage(userDetails.profilePhotoID);
                setImageSrc(image);
            }
            else setImageSrc('/default-avatar-image@2x.png')
        };

        fetchImage();
    }, [userDetails]);



    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    width: 50,
                    height: 50,
                    background: (theme) => alpha(theme.palette.grey[500], 0.08),
                    ...(open && {
                        background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                    }),
                }}
            >
                <Avatar
                    src={imageSrc}
                    alt={userDetails ? userDetails.firstName + " " + userDetails.lastName : "Guest User"}
                    sx={{ width: 50, height: 50 }}
                >
                    {userDetails ? userDetails.firstName.charAt(0).toUpperCase() : "G"}
                </Avatar>
            </IconButton>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1,
                        ml: 0.75,
                        width: 200,
                    },
                }}
            >
                <Box sx={{my: 1.5, px: 2}}>
                    <Typography variant="subtitle2" noWrap>
                        {userDetails ? userDetails.firstName + " " + userDetails.lastName : "Guest User"}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}} noWrap>
                        {userDetails ? userDetails.email : "Not logged in"}
                    </Typography>
                </Box>

                <Divider sx={{borderStyle: 'dashed'}}/>

                {MENU_OPTIONS.map((option) => (
                    <MenuItem
                        key={option.label}
                        component={RouterLink}
                        href={option.path}
                        onClick={handleClose}
                    >
                        {option.label}
                    </MenuItem>
                ))}

                <Divider sx={{borderStyle: 'dashed', m: 0}}/>

                {userDetails && (
                    <MenuItem
                        disableRipple
                        disableTouchRipple
                        onClick={onLogoutButtonClick}
                        sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
                    >
                        Logout
                    </MenuItem>
                )}
            </Popover>
        </>
    );
}
