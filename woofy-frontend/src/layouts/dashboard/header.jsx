import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { UserContext } from '../../provider/UserProvider';
import Typography from '@mui/material/Typography';
import NotificationsPopover from './common/notifications-popover';
import AccountPopover from './common/account-popover';
import { bgBlur } from '../../theme/css';
import { HEADER } from './config-layout';
import Logo from "../../components/logo";
import { RouterLink } from '../../routes/components';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../provider/AuthProvider";

export default function Header({ onOpenNav }) {
    const { userDetails } = useContext(UserContext);
    const theme = useTheme();
    const { token } = useAuth();
    const navigate = useNavigate();

    const renderContent = (
        <>
            <Box sx={{ mt: 3.5, ml: { xs: 2, sm: 3, md: 4 }, display: 'inline-block' }}>
                <Logo />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            {token ? (
                <Stack direction="row" alignItems="center" spacing={3} sx={{ mt: 1.5 }}>
                    <NotificationsPopover />
                    <AccountPopover />
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#222222',
                            fontWeight: '600',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {userDetails ? `${userDetails.firstName} ${userDetails.lastName}` : 'Guest User'}
                    </Typography>
                </Stack>
            ) : (
                <Stack 
                    direction={{ xs: 'row', sm: 'row', md: 'row' }} 
                    alignItems={{ xs: 'center', sm: 'center', md: 'center' }} 
                    spacing={2} 
                    sx={{ 
                        mt: 1.5, 
                        flexWrap: 'nowrap',
                        ml: { sm: '-30px', md: 0 },  // Shift left on tablets
                        justifyContent: { xs: 'flex-end', sm: 'flex-end', md: 'flex-end' }  // Right align for mobile
                    }}
                >
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Button
                            onClick={() => navigate("/Hero-page")}
                            sx={{
                                textTransform: 'none',
                                color: theme.palette.text.primary,
                                fontSize: { xs: '14px', md: '16px' },
                                fontWeight: 'normal',
                                whiteSpace: 'nowrap',
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            }}
                        >
                            Home
                        </Button>
                        <Button
                            onClick={() => navigate("/search-page")}
                            sx={{
                                textTransform: 'none',
                                color: theme.palette.text.primary,
                                fontSize: { xs: '14px', md: '16px' },
                                fontWeight: 'normal',
                                whiteSpace: 'nowrap',
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            }}
                        >
                            Discover
                        </Button>
                        <Button
                            onClick={() => navigate("/sign-up")}
                            sx={{
                                textTransform: 'none',
                                color: theme.palette.text.primary,
                                fontSize: { xs: '14px', md: '16px' },
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            }}
                        >
                            Become a Caregiver
                        </Button>
                    </Box>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/sign-up")}
                        sx={{
                            borderColor: '#666666',
                            borderRadius: '30px',
                            fontSize: { xs: '14px', md: '16px' },
                            fontWeight: '600', 
                            color: 'black',
                            padding: { xs: '6px 20px', md: '8px 24px' },
                            whiteSpace: 'nowrap',
                            '&:hover': {
                                backgroundColor: 'grey.200',
                                borderColor: 'grey.700',
                            },
                        }}
                    >
                        Join now
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/login")}
                        sx={{
                            backgroundColor: '#006CBF', // Background color #006CBF
                            borderRadius: '30px', // 30px border radius
                            fontSize: { xs: '14px', md: '16px' }, // Font size 16px
                            fontWeight: '600', // Font weight 600
                            padding: { xs: '6px 20px', md: '8px 24px' },
                            marginLeft: { xs: 0, sm: '8px' }, // Adjust margin
                            whiteSpace: 'nowrap',
                            '&:hover': {
                                backgroundColor: '#6495ED', // Same hover color as Discover button
                            },
                        }}
                    >
                        Sign in
                    </Button>
                </Stack>
            )}
        </>
    );

    return (
        <AppBar
            sx={{
                boxShadow: 'none',
                height: HEADER.H_MOBILE,
                zIndex: theme.zIndex.appBar + 1,
                ...bgBlur({
                    color: theme.palette.background.default,
                }),
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter,
                }),
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: { lg: 5 },
                }}
            >
                {renderContent}
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    onOpenNav: PropTypes.func,
};
