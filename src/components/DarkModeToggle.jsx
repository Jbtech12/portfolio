import React, { useEffect, useState } from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check local storage for preference
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setIsDark(savedMode);
        if (savedMode) {
            document.body.classList.add('dark-mode');
        }
    }, []);

    const toggleMode = () => {
        const newMode = !isDark;
        setIsDark(newMode);
        localStorage.setItem('darkMode', newMode);
        
        if (newMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    return (
        <button 
            className={`dark-mode-toggle ${isDark ? 'dark' : 'light'}`} 
            onClick={toggleMode}
            aria-label="Toggle Dark Mode"
            title="Toggle Dark Mode"
        >
            <div className="toggle-thumb">
                {isDark ? '🌙' : '☀️'}
            </div>
        </button>
    );
};

export default DarkModeToggle;
