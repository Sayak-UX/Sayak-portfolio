import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import './ChatButton.css';

const ChatButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className={`chat-button-container ${isVisible ? 'visible' : ''}`}>
            <a href="mailto:sayak.uxartisty@gmail.com" className="chat-button" aria-label="Chat with me">
                <MessageCircle size={24} color="white" />
            </a>
        </div>
    );
};

export default ChatButton;
