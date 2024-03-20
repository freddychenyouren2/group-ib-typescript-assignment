import React , { useState, useEffect } from "react";
import { Notification, NotificationWithTimeout } from "../types";
import { useSettings } from "./SettingsPage/SettingsContext";
import NotificationBox from "./NotificationBox/NotificationBox";
import './MainPage.css'


const MainPage: React.FC = () => {
    // Accept the Notification objects from server. There is a variable state change. Use useState
    // We use an array to store the incoming Notifications. 
    // We only display x number of notifications as specified by the limit.
    
    const [notifications, setNotifications] = useState<NotificationWithTimeout[]>([]);
   const { notificationCount, notificationPosition, notificationDisappearTime } = useSettings();
    // We need our client side to react when there is an incoming notification from the server side.
    useEffect(() => {

        const eventSource = new EventSource('http://localhost:9000/events') // As specified
        // Broadcast channel to communicate across different tabs
        const broadcastChannel = new BroadcastChannel('notificationChannel');

        eventSource.onmessage = (notification) => {
            const notificationData = JSON.parse(notification.data) as Notification;
            const timeoutId = setTimeout(() => {
                setNotifications((previousNotifications) => previousNotifications.filter((n) => n.msg_id !== notificationData.msg_id));
            }, notificationDisappearTime);

            const notificationWithTimeOut: NotificationWithTimeout = { ...notificationData, timeoutId} 
            
            console.log("Timeout added to notification: ", notificationData)
            
            if (notificationPosition == 3 || notificationPosition == 4) {
                // Append at bottom. 
                setNotifications((previousNotifications) => {
                    if (previousNotifications.length >= notificationCount) {
                        previousNotifications.shift()
                        previousNotifications.push(notificationWithTimeOut)
                    }
                    return [notificationWithTimeOut, ...previousNotifications.slice(0, notificationCount - 1)]
                }) // append. Check for constraints
            } else {
                setNotifications((previousNotifications) => [...previousNotifications.slice(0, notificationCount - 1), notificationWithTimeOut])
            }
        }

        // Handle broadcast channel messages
        broadcastChannel.onmessage = (event) => {
            //Receive close messages from other tabs. Identify with message id
            const closedMessageId = event.data;
            setNotifications((previousNotifications) =>
            previousNotifications.filter((n) => n.msg_id !== closedMessageId)
            );
        };

        return () => {
            eventSource.close()
            broadcastChannel.close()
        };
    }, [notificationCount])

    const handleCloseNotification = (notification: NotificationWithTimeout, index: number) => {
        // Close the notification in al tabs. Use broadcast channel
        const broadcastChannel = new BroadcastChannel('notificationChannel');
        broadcastChannel.postMessage(notification.msg_id)
        // Filter out the notification whose X button has been clicked
        setNotifications((previousNotifications) => previousNotifications.filter((_, i) => i !== index))
    }

    const handleMouseEnter = (notificationWithTimeOut: NotificationWithTimeout) => {
        // Clear the existing timeout only for that notification
        clearTimeout(notificationWithTimeOut.timeoutId);
    };

    const handleMouseLeave = (notificationWithTimeOut: NotificationWithTimeout) => {
        //Set timeout for that notification again
        const timeoutId = setTimeout(() => {
            setNotifications((previousNotifications) => previousNotifications.filter((n) => n.msg_id !== notificationWithTimeOut.msg_id));
        }, notificationDisappearTime);
        setNotifications((currNotifications) =>
            currNotifications.map((n) => (n === notificationWithTimeOut ? { ...n, timeoutId } : n))
        );
    }

    return(
        <div className={`notification-container position-${notificationPosition}`}>
            {notifications.map((notification, index) => (
                <>
                <div
                    key={index}
                    className={`notification-box position-${notificationPosition}`}
                    onMouseEnter={() => handleMouseEnter(notification)}
                    onMouseLeave={() => handleMouseLeave(notification)}
                >
                    <NotificationBox
                        notification={notification}
                        onClose={() => { handleCloseNotification(notification, index); } }
                     />
                </div>
                </>
            ))}
      </div>
    )
}

export default MainPage