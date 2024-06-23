import {useAuth} from "../provider/AuthProvider";
import Signup from "../Pages/Signup";
import Registration from "../Pages/Registration";
import BusinessDashboard from "../Pages/BusinessDashboard";
import ServiceRegisterView from "../Sections/User/Business/ServicesRegistration/ServiceRegisterView";
import DogRegisterView from "../Sections/User/Customer/DogRegister/DogRegisterView";
import {USERTYPE} from "../models/RegistrationModel";
import {UserContext} from "../provider/UserProvider";
import {Suspense, useContext} from "react";
import {Outlet, useRoutes} from "react-router-dom";
import LoginPage from "../Pages/Login";
import DashboardLayout from "../layouts/dashboard";
import NotFoundPage from "../Pages/PageNotFound";
import CustomerReviewsView from "../Sections/User/Business/Reviews/CustomerReviewsView";
import UserProfileView from "../Sections/User/UserProfile/UserProfileView";
import ServicesDetails from "../Sections/User/Business/ServicesDetails";

import MapPage from "../layouts/Map/MapPage";
import BusinessProfilePage from "../Pages/BusinessProfilePage";
import WebSearchPage from "../Pages/WebSearchPage";
import HomePage from "../Pages/HomePage";
import CustomerUpComingBookings from "../Sections/User/Customer/UpComingBookings/CustomerUpcomingBookingsView";
import CustomerPreviousBookings from "../Sections/User/PastBookings/CustomerPreviousBookingsView";
import BusinessUpcomingBookingsSection
    from "../Sections/User/Business/UpComingBookings/BusinessUpcomingBookingsSection";
import ManageAccountPage from "../Pages/ManageAccountPage";


const Router = () => {
    const {token} = useAuth();
    const {userDetails} = useContext(UserContext);


    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path: "/",
            element: (
                <DashboardLayout>
                    <Suspense>
                        <Outlet/>
                    </Suspense>
                </DashboardLayout>
            ), // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "/",
                    element: <HomePage/>,
                },
                {

                    path: "/search-page",
                    element: <WebSearchPage/>,
                },
                {
                    path: "/map",
                    element: <MapPage/>,
                }, {
                    path: "/business-profile/:id",
                    element: <BusinessProfilePage/>,
                },

                {
                    path: "*",
                    element: <NotFoundPage/>,
                },
            ],
        },

    ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedBusinessOnly = [
        {
            path: "/",
            element: (
                <DashboardLayout>
                    <Suspense>
                        <Outlet/>
                    </Suspense>
                </DashboardLayout>
            ), // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "/",
                    element: <BusinessDashboard/>,
                },
                {
                    path: "/service-register",
                    element: <ServiceRegisterView/>,
                },
                {
                    path: "/services",
                    element: <ServicesDetails/>,
                },
                {
                    path: "/reviews",
                    element: <CustomerReviewsView/>,
                },
                {
                    path: "/account",
                    element: <ManageAccountPage/>,
                },
                {
                    path: "/account/personal-details",
                    element: <UserProfileView/>,
                },
                {
                    path: "/bookings",
                    element: <BusinessUpcomingBookingsSection/>,
                }, {
                    path: "/past-bookings",
                    element: <CustomerPreviousBookings/>,
                },


            ],
        },
    ]

    const routesForAuthenticatedCustomerOnly = [
        {
            path: "/",
            element: (
                <DashboardLayout>
                    <Suspense>
                        <Outlet/>
                    </Suspense>
                </DashboardLayout>),
            children: [
                {
                    path: "/",
                    element: <WebSearchPage/>,
                },
                {
                    path: "/bookings",
                    element: <CustomerUpComingBookings/>,
                },
                {
                    path: "/dog-register",
                    element: <DogRegisterView/>,
                }, {
                    path: "/reviews",
                    element: <CustomerReviewsView/>,
                },
                {
                    path: "/account",
                    element: <ManageAccountPage/>,
                },
                {
                    path: "/account/personal-details",
                    element: <UserProfileView/>,
                },
                {
                    path: "/past-bookings",
                    element: <CustomerPreviousBookings/>,
                },


            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: "/sign-up",
            element: <Signup/>,
        },
        {
            path: "/registration",
            element: <Registration/>,
        },
        {
            path: "*",
            element: <LoginPage/>,
        },
    ];

    // Combine and conditionally include routes based on authentication status
    const routing = useRoutes([
        ...(userDetails?.role === USERTYPE[USERTYPE.BUSINESS] ? routesForAuthenticatedBusinessOnly : []),
        ...(userDetails?.role === USERTYPE[USERTYPE.CUSTOMER] ? routesForAuthenticatedCustomerOnly : []),
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForPublic,
    ]);

    // Return the routing configuration
    return routing;
};

export default Router;