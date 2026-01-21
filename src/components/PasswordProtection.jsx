import React, { useState, useEffect } from 'react';
import './PasswordProtection.css';

const PasswordProtection = ({ children, requiredPassword, projectId }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const auth = sessionStorage.getItem(`project_auth_${projectId}`);
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, [projectId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === requiredPassword) {
            setIsAuthenticated(true);
            sessionStorage.setItem(`project_auth_${projectId}`, 'true');
            setError('');
        } else {
            setError('Incorrect password. Please try again.');
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="password-protection-container">
            <div className="password-card">
                <h2>Protected Content</h2>
                <p>Please enter the password to view this project.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="password-input"
                    />
                    <button type="submit" className="password-submit">
                        Access Project
                    </button>
                </form>
                {error && <p className="password-error">{error}</p>}
                <a href="/" className="password-back-link">← Back to Home</a>
            </div>
        </div>
    );
};

export default PasswordProtection;
