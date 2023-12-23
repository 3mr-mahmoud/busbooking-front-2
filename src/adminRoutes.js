import React from 'react'

const AdminHome = React.lazy(() => import('./views/pages/Admin/AdminHome'))
const Stations = React.lazy(() => import('./views/pages/Admin/Stations/Stations'))
const Admins = React.lazy(() => import('./views/pages/Admin/Admins/Admins'))
const Drivers = React.lazy(() => import('./views/pages/Admin/Drivers/Drivers'))
const Customers = React.lazy(() => import('./views/pages/Admin/Customer/Customers'))



const routes = [
    { path: '/dashboard', exact: true, name: 'Admin Dashboard', element: AdminHome },
    { path: '/stations', name: 'Stations', element: Stations, exact: true },
    { path: '/admins', name: 'Admins', element: Admins, exact: true },
    { path: '/drivers', name: 'Drivers', element: Drivers, exact: true },
    { path: '/customers', name: 'Drivers', element: Customers, exact: true },


]
export default routes
