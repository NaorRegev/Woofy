import HomeIcon from '@mui/icons-material/Home';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import UpComingIcon from '@mui/icons-material/Upcoming';
import ChatIcon from '@mui/icons-material/Chat';
import StarIcon from '@mui/icons-material/Star';
import LoginIcon from '@mui/icons-material/Login';
import SignUpIcon from '@mui/icons-material/AppRegistrationSharp';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import HistoryIcon from '@mui/icons-material/History';
import {useContext} from "react";
import {UserContext} from "../../provider/UserProvider";
import {USERTYPE} from "../../models/RegistrationModel";


function Navigation() {
    const {userDetails} = useContext(UserContext);
    const userRole = userDetails?.role;

    const dashboardNavConfig = [
        {
            title: 'dashboard',
            path: '/',
            icon: <HomeIcon/>,
        },
        ]

    const businessNavConfig = [
        {
            title: 'Services',
            path: '/services',
            icon: <FavoriteBorderIcon/>,
        },
        {
            title: 'Upcoming Bookings',
            path: '/bookings',
            icon: <UpComingIcon/>,
        },
    ];


    const customerNavConfig = [
        {
            title: 'My Bookings',
            path: '/bookings',
            icon: <UpComingIcon/>,
        },
        {
            title: 'History',
            path: '/past-bookings',
            icon: <HistoryIcon/>,
        },
    ];

    const publicNavConfig = [

        {
            title: 'Reviews',
            path: '/reviews',
            icon: <StarIcon/>,
        },
        {
            title: 'Manage Account',
            path: '/manage-account',
            icon: <PersonIcon/>,
        },
        {
            title: 'Support',
            path: '/support',
            icon: <SupportIcon/>, // Replace with the appropriate icon for 'Support'
        },
        {
            title: 'Settings',
            path: '/settings',
            icon: <SettingsIcon/>,
        },

    ];
    const navConfig = [
        ...dashboardNavConfig,
        ...(userRole === USERTYPE.BUSINESS ? businessNavConfig : []),
        ...(userRole === USERTYPE.CUSTOMER ? customerNavConfig : []),
        ...(userRole === undefined ? unsignedConfig : []),
        ...publicNavConfig

    ];
    return { navConfig };
}

export default Navigation;