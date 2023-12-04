import React, { createContext, useContext, useState } from 'react';
import ApiClient from '../ApiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [authenticated, setAuthenticated] = useState(false);
    const [guard, setGuard] = useState(localStorage.getItem('guard') || null);
    const login = async (credentials, guard) => {
        try {
            const response = await ApiClient.post('/' + guard + '/login', credentials);
            const { token, user: userData } = response.data;

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token);

            setUser(userData);
            ApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setAuthenticated(true);
            localStorage.setItem('guard', guard);
            setGuard(guard);
        } catch (error) {
            console.error('Login failed:', error);

        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('guard');
        delete ApiClient.defaults.headers.common['Authorization'];
        setUser(null);
        setAuthenticated(false);
        setGuard("");
    };

    return (
        <AuthContext.Provider value={{ guard, authenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};