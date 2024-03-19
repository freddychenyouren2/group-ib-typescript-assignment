import React, { useState } from "react";
import { useSettings } from "./SettingsContext";
import './SettingsPage.css';

const SettingsPage: React.FC = () => {
    const { 
        notificationCount, 
        setNotificationCount,
        notificationPosition,
        setNotificationPosition,
        notificationDisappearTime,
        setNotificationDisappearTime
    } = useSettings();

    const handleNotificationCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotificationCount(parseInt(event.target.value)); //value is string so have to parse int
    }

    const handleNotificationPositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotificationPosition(parseInt(event.target.value)); //value is string so have to parse int
    }

    const handleNotificationDissapearTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotificationDisappearTime(parseInt(event.target.value)); //value is string so have to parse int
    }
    return(
        <div className="settings-container">
            <div className="settings-box">
                <div className="label">Notification count</div>
                <input type="number" value={notificationCount} onChange={handleNotificationCountChange}/>
            </div>
            <div className="settings-box">
                <div className="label">Notification position</div>
                <div className="radio-buttons">
                    <label>
                        <input 
                            type="radio" 
                            name="position" 
                            value='1' 
                            checked={notificationPosition === 1} 
                            onChange={handleNotificationPositionChange}
                        /> 
                        Position 1
                    </label>
                    <label>
                        <input 
                            type="radio"
                            name="position" 
                            value='2' 
                            checked={notificationPosition === 2} 
                            onChange={handleNotificationPositionChange}
                        /> 
                        Position 2
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="position" 
                            value='3' 
                            checked={notificationPosition === 3} 
                            onChange={handleNotificationPositionChange}
                        /> 
                        Position 3
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="position" 
                            value='4' 
                            checked={notificationPosition === 4} 
                            onChange={handleNotificationPositionChange}
                        /> 
                        Position 4
                    </label>

                </div>
            </div>
            <div className="settings-box">
                <div className="label">Notification disappear time</div>
                <input 
                    type="number"
                    value={notificationDisappearTime}
                    onChange={handleNotificationDissapearTimeChange} 
                />
            </div>
        </div>
    )
}

export default SettingsPage