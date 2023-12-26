import React, { createContext, useContext, useState } from 'react';
import ApiClient from '../ApiClient';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("token") || false);
    const [guard, setGuard] = useState(localStorage.getItem('guard') || null);
    const login = async (credentials, guard) => {
        try {
            const response = await ApiClient.post('/' + guard + '/login', credentials);

            const { token, user: userData } = response.data.data;

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token);

            setUser(userData);
            ApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setAuthenticated(true);
            localStorage.setItem('guard', guard);
            setGuard(guard);
            return true;
        } catch (error) {
            return false;
        }
    };

    const refreshData = async () => {
        try {
            const response = await ApiClient.get('/' + guard + '/me');
            if (response) {
                const { user: userData } = response.data.data;

                localStorage.setItem('user', JSON.stringify(userData));

                setUser(userData);
            }
        } catch (error) {
            let loginPath = guard + '/login';
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('guard');
            setUser(null);
            setAuthenticated(false);
            setGuard("");
            navigate(loginPath);
        }
    }

    const logout = async () => {

        try {
            const response = await ApiClient.post('/' + guard + '/logout');
            if (response) {
                let loginPath = guard + '/login';
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('guard');
                delete ApiClient.defaults.headers.common['Authorization'];
                setUser(null);
                setAuthenticated(false);
                setGuard("");
                navigate(loginPath);
            }
        } catch (error) {

        }


    };

    return (
        <AuthContext.Provider value={{ guard, authenticated, user, login, logout, refreshData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};