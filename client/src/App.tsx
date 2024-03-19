import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./components/MainPage";
import SettingsPage from "./components/SettingsPage/SettingsPage";
import NavigationBar from "./components/NavigationBar";
import './App.css'
import { SettingsProvider } from "./components/SettingsPage/SettingsContext";

const App: React.FC = () => {
    return (
        <SettingsProvider>
            <Router>
                <div className="app">
                    <header>
                        <h1>Group-IB</h1>
                        <NavigationBar />
                    </header>
                    <main>
                        <div className="container">
                            
                            <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/SettingsPage" element={<SettingsPage/>} />
                            </Routes>
                            
                        </div>
                    </main>
                </div>
            </Router>
        </SettingsProvider>
        
        
      );
};

export default App;
