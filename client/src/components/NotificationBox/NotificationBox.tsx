import React from 'react';
import { Notification } from '../../types';
import './NotificationBox.css'

interface NotificationBoxProps {
    notification: Notification;
    onClose: () => void; // Function to handle closing the notification box
}

function getMonthName(month: number) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
}

function getSecondsVariant(seconds: number) {

    if (seconds < 10) {
        let paddedWithZero = '0'.concat(String(seconds))
        return paddedWithZero
    } else {
        return seconds
    }

}

// Each box of notification
const NotificationBox: React.FC<NotificationBoxProps> = ({ notification, onClose }) => {
    const date = new Date(parseInt(notification.time) * 1000)
    const formattedDate = `${date.getHours()}:${date.getMinutes()}:${getSecondsVariant(date.getSeconds())} ${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`
    return (
        <div className="notification-box">
            <div className="notification-content">
                <div className="msg-id">Notification ID: {notification.msg_id}</div>
                <br></br>
                <div className="time">Notification Time: {notification.time}</div>
                <div className="time">Notification Time: {formattedDate}</div>
                <div className="msg">Message: {notification.msg}</div>
            </div>
            <button className="close-button" onClick={onClose}>X</button>
        </div>
    )
}

export default NotificationBox;