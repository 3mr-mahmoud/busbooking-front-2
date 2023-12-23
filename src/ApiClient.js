import axios from 'axios';
import { toast } from 'react-toastify';
import React from 'react';
const instance = axios.create({
    baseURL: "http://localhost/busbooking/public/api", // Replace with your API base URL
    timeout: 5000, // Set a timeout for requests
});

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const ErrorsComponent = (props) => {
    return (
        <div>
            {props.errors.map((error, index) => (
                <div key={index}>{error}</div>
            ))}
        </div>
    );
}

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 422) {
            if (typeof error.response.data.errors === 'object') {
                let errors = Object.values(error.response.data.errors);
                toast.error(<ErrorsComponent errors={errors} />);
            }
        }
        if (error.response.data && typeof error.response.data.errors === 'string') {
            toast.error(error.response.data.errors);
        }
        return Promise.reject(error);
    });

// Add any additional configurations you need, such as headers, interceptors, etc.

export default instance;