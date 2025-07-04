import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://99digicom.com";
    if (!import.meta.env.VITE_BACKEND_URL) {
        console.warn("⚠️ Warning: VITE_BACKEND_URL is not defined in .env. Falling back to https://99digicom.com");
    }

    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`);
            if (data.success) {
                setUserData(data.userData);
            }
            // Don't show error toast for failed user data fetch
        } catch (error) {
            // Silently handle user data fetch errors
            console.log("Failed to fetch user data");
            setUserData(null);
        }
    };

    const getAuthStatus = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
            if (data.success) {
                setIsLogin(true);
                getUserData();
            } else {
                // Silently handle unsuccessful auth
                setIsLogin(false);
                setUserData(null);
            }
        } catch (error) {
            // Silently handle auth check errors
            console.log("Auth check failed");
            setIsLogin(false);
            setUserData(null);
        }
    };

    useEffect(() => {
        getAuthStatus();
    }, []);

    const value = {
        backendUrl,
        isLogin,
        setIsLogin,
        userData,
        setUserData,
        getUserData,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// ✅ Custom hook to consume context
export const useAppContext = () => useContext(AppContext);
