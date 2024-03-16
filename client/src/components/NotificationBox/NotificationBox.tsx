import React from 'react';
import { Notification } from '../../types';
import './NotificationBox.css'

interface NotificationBoxProps {
    notification: Notification;
    onClose: () => void; // Function to handle closing the notification box
}

// Each box of notification
const NotificationBox: React.FC<NotificationBoxProps> = ({ notification, onClose }) => {
    return (
        <div className="notification-box">
            <div className="notification-content">
                <div className="msg-id">Notification ID: {notification.msg_id}</div>
                <br></br>
                <div className="time">Notification Time: {notification.time}</div>
                <div className="msg">Message: {notification.msg}</div>
            </div>
            <button className="close-button" onClick={onClose}>X</button>
        </div>
    )
}

export default NotificationBox;