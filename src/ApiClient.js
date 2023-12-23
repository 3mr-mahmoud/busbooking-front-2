import axios from 'axios';

const instance = axios.create({

    baseURL: "http://localhost/busbooking/public/api", // Replace with your API base URL
    timeout: 5000, // Set a timeout for requests
});

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// Add any additional configurations you need, such as headers, interceptors, etc.

export default instance;