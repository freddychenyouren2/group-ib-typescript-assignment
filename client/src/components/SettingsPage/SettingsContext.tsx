import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface SettingsContextType {
    notificationCount: number;
    setNotificationCount: Dispatch<SetStateAction<number>>;
    notificationPosition: number;
    setNotificationPosition: Dispatch<SetStateAction<number>>;
    notificationDisappearTime: number;
    setNotificationDisappearTime: Dispatch<SetStateAction<number>>;
}

interface SettingsProviderProps {
    children: ReactNode;
}
const defaultSettings: SettingsContextType = {
    notificationCount: 4,
    setNotificationCount: () => {},
    notificationPosition: 2,
    setNotificationPosition: () => {},
    notificationDisappearTime: 5000,
    setNotificationDisappearTime: () => {}
};

const SettingsContext = createContext<SettingsContextType>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const [notificationCount, setNotificationCount] = useState<number>(defaultSettings.notificationCount);
    const [notificationPosition, setNotificationPosition] = useState<number>(defaultSettings.notificationPosition);
    const [notificationDisappearTime, setNotificationDisappearTime] = useState<number>(defaultSettings.notificationDisappearTime);

    return (
        <SettingsContext.Provider value={{ 
            notificationCount, 
            setNotificationCount, 
            notificationPosition, 
            setNotificationPosition, 
            notificationDisappearTime, 
            setNotificationDisappearTime 
        }}>
            {children}
        </SettingsContext.Provider>
    );
};
