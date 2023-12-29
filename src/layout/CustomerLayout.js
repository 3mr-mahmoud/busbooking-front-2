import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContent, AppFooter, AppHeader } from '../components/customer/index'
import { useAuth } from 'src/contexts/AuthContext';

const DefaultLayout = () => {
    const { refreshData } = useAuth();

    useEffect(() => {
        refreshData();
    }, []);
    return (
        <div>
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <AppContent />
                    <ToastContainer />
                </div>
                <AppFooter />
            </div>
        </div>
    )
}

export default DefaultLayout
