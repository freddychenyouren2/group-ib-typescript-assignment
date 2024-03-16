import React from "react";
import './SettingsPage.css';

const SettingsPage: React.FC = () => {
    return(
        <div className="settings-container">
            <div className="settings-box">
                <div className="label">Notification pount</div>
                <input type="number" />
            </div>
            <div className="settings-box">
                <div className="label">Notification position</div>
                <div className="radio-buttons">
                    <label>
                        <input type="radio" name="position" value='1' /> Position 1
                    </label>
                    <label>
                        <input type="radio" name="position" value='2' /> Position 2
                    </label>
                    <label>
                        <input type="radio" name="position" value='3' /> Position 3
                    </label>
                    <label>
                        <input type="radio" name="position" value='4' /> Position 4
                    </label>

                </div>
            </div>
            <div className="settings-box">
                <div className="label">Notification disappear time</div>
                <input type="number" />
            </div>
        </div>
    )
}

export default SettingsPage