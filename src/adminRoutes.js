import React from 'react'

const AdminHome = React.lazy(() => import('./views/pages/Admin/AdminHome'))
const Stations = React.lazy(() => import('./views/pages/Admin/Stations/Stations'))
const Admins = React.lazy(() => import('./views/pages/Admin/Admins/Admins'))


const routes = [
    { path: '/dashboard', exact: true, name: 'Admin Dashboard', element: AdminHome },
    { path: '/stations', name: 'Stations', element: Stations, exact: true },
    { path: '/admins', name: 'Admins', element: Admins, exact: true },
]
export default routes
