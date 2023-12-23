import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/admin/index'

const DefaultLayout = () => {
    return (
        <div>
            <AppSidebar />
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
