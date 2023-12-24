import React from 'react'

const AdminHome = React.lazy(() => import('./views/pages/Admin/AdminHome'))
const Stations = React.lazy(() => import('./views/pages/Admin/Stations/Stations'))
const Admins = React.lazy(() => import('./views/pages/Admin/Admins/Admins'))
const Drivers = React.lazy(() => import('./views/pages/Admin/Drivers/Drivers'))
const Customers = React.lazy(() => import('./views/pages/Admin/Customer/Customers'))

const Trips = React.lazy(() => import('./views/pages/Admin/Trips/Trips'))
const Buses = React.lazy(() => import('./views/pages/Admin/buses/buses'))
const Services = React.lazy(() => import('./views/pages/Admin/Services/Services'))


const routes = [
    { path: '/dashboard', exact: true, name: 'Admin Dashboard', element: AdminHome },
    { path: '/stations', name: 'Stations', element: Stations, exact: true },
    { path: '/admins', name: 'Admins', element: Admins, exact: true },
    { path: '/drivers', name: 'Drivers', element: Drivers, exact: true },
    { path: '/customers', name: 'Drivers', element: Customers, exact: true },
    { path: '/trips', name: 'Trips', element: Trips, exact: true },
    { path: '/buses', name: 'bases', element: Buses, exact: true },
    { path: '/services', name: 'Services', element: Services, exact: true },

]
export default routes
