import { createContext, useEffect, useState, useContext } from "react";
import axiosInstance, { getEnvironmentInfo, testApiConnection } from '../config/api.config';
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const envInfo = getEnvironmentInfo();
    const backendUrl = envInfo.config.baseUrl;
    
    // Enhanced debugging for API configuration
    if (envInfo.isDevelopment) {
        console.log("🔧 API Context Info:", {
            backendUrl,
            environment: envInfo.environment,
            isProduction: envInfo.isProduction,
            hasViteApiBaseUrl: !!import.meta.env.VITE_API_BASE_URL
        });
    }
    
    if (!import.meta.env.VITE_API_BASE_URL) {
        console.warn("⚠️ Warning: VITE_API_BASE_URL is not defined in .env. Using auto-detected configuration:", backendUrl);
    }

    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
        try {
            const { data } = await axiosInstance.get('/api/user/data');
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
            const { data } = await axiosInstance.get('/api/auth/is-auth');
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

    // Removed automatic auth check on mount to prevent conflicts with AuthContext
    // useEffect(() => {
    //     getAuthStatus();
    // }, []);

    const value = {
        backendUrl,
        isLogin,
        setIsLogin,
        userData,
        setUserData,
        getUserData,
        testApiConnection,
        getEnvironmentInfo: () => envInfo,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// ✅ Custom hook to consume context
export const useAppContext = () => useContext(AppContext);
