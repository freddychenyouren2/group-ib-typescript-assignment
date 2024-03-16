import React , { useState, useEffect } from "react";
import { Notification } from "../types";
import NotificationBox from "./NotificationBox/NotificationBox";
import './MainPage.css'


const MainPage: React.FC = () => {
    // Accept the Notification objects from server. There is a variable state change. Use useState
    // We use an array to store the incoming Notifications. 
    // We only display x number of notifications as specified by the limit.
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [maxNotifications, setMaxNotifications] = useState<number>(4); //Default value
    const [notificationPosition, setNotificationPosition] = useState<number>(4); //Default position: Top Right
    const [notificationDisappearTime, setNotificationDisappearTime] = useState<number>(60000); // Default timeout in milliseconds

    // We need our client side to react when there is an incoming notification from the server side.
    useEffect(() => {

        const eventSource = new EventSource('http://localhost:9000/events') // As specified

        eventSource.onmessage = (notification) => {
            const notificationData = JSON.parse(notification.data);
            if (notificationPosition == 3 || notificationPosition == 4) {
                // Append at bottom. 
                setNotifications((previousNotifications) => {
                    if (previousNotifications.length >= maxNotifications) {
                        previousNotifications.shift()
                        previousNotifications.push(notificationData)
                    }
                    return [...previousNotifications.slice(0, maxNotifications - 1), notificationData]
                }) // append. Check for constraints
            } else {
                setNotifications((previousNotifications) => [notificationData, ...previousNotifications.slice(0, maxNotifications - 1)]) // append. Check for constraints
            }
            setTimeout(() => {
                setNotifications((previousNotifications) => previousNotifications.filter((n) => n !== notificationData));
              }, notificationDisappearTime);
        }

        return () => {
            eventSource.close()
        };
    }, [maxNotifications])

    const handleCloseNotification = (index: number) => {
        setNotifications((previousNotifications) => previousNotifications.filter((_, i) => i !== index))
        // Filter out the notification whose X button has been clicked
    }

    return(
        <div className={`notification-container position-${notificationPosition}`}>
            {notifications.map((notification, index) => (
                <>
                <div
                    key={index}
                    className={`notification-box position-${notificationPosition}`}
                >
                    <NotificationBox
                        notification={notification}
                        onClose={() => { handleCloseNotification(index); } } />
                </div>
                
                {/* <div>
                        <NotificationBox
                            key={index}
                            notification={notification}
                            onClose={() => { handleCloseNotification(index); } } />
                </div> */}
                </>
            ))}
      </div>
    )
}

export default MainPage