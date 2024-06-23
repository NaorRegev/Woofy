import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './global.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "./provider/UserProvider";
import AuthProvider from "./provider/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <AuthProvider>
                        <UserProvider>
                            <App />
                            <ToastContainer />
                        </UserProvider>
                    </AuthProvider>
                </Suspense>
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>
);
