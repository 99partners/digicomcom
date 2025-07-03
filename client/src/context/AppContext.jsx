import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";
    if (!import.meta.env.VITE_BACKEND_URL) {
        console.warn("⚠️ Warning: VITE_BACKEND_URL is not defined in .env. Falling back to http://localhost:5050");
    }

    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`);
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const getAuthStatus = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
            if (data.success) {
                setIsLogin(true);
                getUserData();
            }
        } catch (error) {
            // Don't show error toast when checking auth status
            console.log("Not authenticated");
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
