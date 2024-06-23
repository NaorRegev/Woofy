import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { api, setAuthToken } from '../api/api';
import { toast } from 'react-toastify';
import { useRouter } from '../routes/hooks';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (storedToken) {
            setAuthToken(storedToken);
            setToken(storedToken);
            setIsLoggedIn(true);
        }
        setLoading(false); // Set loading to false after checking the token
    }, []);

    const login = async (basicSignInUser, rememberMe) => {
        try {
            const res = await api.post('auth/login', basicSignInUser);
            const newToken = res.data.access_token;
            setAuthToken(newToken);
            setToken(newToken);

            if (rememberMe) {
                localStorage.setItem('token', newToken);
                localStorage.setItem('refreshToken', res.data.refresh_token);
            } else {
                sessionStorage.setItem('token', newToken);
                sessionStorage.setItem('refreshToken', res.data.refresh_token);
            }
            setIsLoggedIn(true);
            router.back();
        } catch (error) {
            console.error('Error occurred while logging in: ', error);
            toast.error(error.response?.data || 'An error occurred');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
        setAuthToken(null);
        setToken(null);
        setIsLoggedIn(false);
        router.push('/');
        router.reload();
    };

    const contextValue = useMemo(
        () => ({
            login,
            logout,
            isLoggedIn,
            setIsLoggedIn,
            token,
            setToken,
        }),
        [isLoggedIn, token]
    );

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
