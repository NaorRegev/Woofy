import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { api } from '../api/api';
import { useAuth } from './AuthProvider';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const { isLoggedIn, token } = useAuth();

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (token) {
                try {
                    const response = await api.get('/user');
                    setUserDetails(response.data);
                } catch (error) {
                    console.error("Failed to fetch user details: ", error);
                }
            }
        };

        if (isLoggedIn && token) {
            fetchUserDetails();
        }
    }, [isLoggedIn, token]);  // Depend on token to ensure it's set before fetching

    const contextValue = useMemo(() => ({ userDetails, setUserDetails }), [userDetails, isLoggedIn]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider };
