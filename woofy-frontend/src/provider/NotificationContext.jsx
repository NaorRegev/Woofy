import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from "../api/api";
import { useAuth } from "./AuthProvider";

// Create the context
const NotificationContext = createContext();

// Custom hook to use the Notification context
export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const { isLoggedIn, token } = useAuth();

    useEffect(() => {
        const fetchNotifications = async () => {
            if (token) {
                try {
                    const response = await api.get('/notifications');
                    setNotifications(response.data);
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            }
        };
        if (isLoggedIn && token) {
            fetchNotifications();
        }
    }, [token]);

    const addNotification = async (notification) => {
        try {
            const response = await api.post('/notifications', notification);
            setNotifications((prevNotifications) => [...prevNotifications, response.data]);
        } catch (error) {
            console.error('Error adding notification:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await api.put('/notifications/mark-all-as-read');
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) => ({
                    ...notification,
                    unRead: false,
                }))
            );
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };

    const markAsRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/mark-as-read`);
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification.id === id ? { ...notification, unRead: false } : notification
                )
            );
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, markAllAsRead, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};
