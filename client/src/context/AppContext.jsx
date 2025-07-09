import { createContext, useState, useContext } from "react";
import { mockData, simulateApiCall } from '../config/mockData';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
        try {
            const { data } = await simulateApiCall({ userData: mockData.auth.user });
            if (data.success) {
                setUserData(data.userData);
            }
        } catch (error) {
            console.log("Failed to fetch user data");
            setUserData(null);
        }
    };

    const getAuthStatus = async () => {
        try {
            const { data } = await simulateApiCall({ success: true });
            if (data.success) {
                setIsLogin(true);
                getUserData();
            } else {
                setIsLogin(false);
                setUserData(null);
            }
        } catch (error) {
            console.log("Auth check failed");
            setIsLogin(false);
            setUserData(null);
        }
    };

    const value = {
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

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};
