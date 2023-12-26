// ProtectedRoute.js
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children, guard }) => {
    const { guard: authenticatedGuard, authenticated } = useAuth()
    return authenticated && guard === authenticatedGuard ? children : <Navigate to={"/" + guard + "/login"} />
};

export default ProtectedRoute;