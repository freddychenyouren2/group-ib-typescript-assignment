import React from "react";
import { Link } from "react-router-dom";
import './NavigationBar.css';

const NavigationBar: React.FC = () => {
    return (
        <div className="nav-container">
            <nav className="nav-bar">
                <ul className="nav-links">
                    <h1 className="notification">Notification task</h1>
                    <li>
                        <Link to="/">Main</Link>
                    </li>
                    <li>
                        <Link to="/SettingsPage">Settings</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavigationBar