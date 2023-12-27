import React from 'react'

const AdminHome = React.lazy(() => import('./views/pages/Admin/AdminHome'))
const Stations = React.lazy(() => import('./views/pages/Admin/Stations/Stations'))
const Admins = React.lazy(() => import('./views/pages/Admin/Admins/Admins'))
const AdminProfile = React.lazy(() => import('./views/pages/Admin/Admins/Profile'))
const Drivers = React.lazy(() => import('./views/pages/Admin/Drivers/Drivers'))
const Customers = React.lazy(() => import('./views/pages/Admin/Customer/Customers'))

const Trips = React.lazy(() => import('./views/pages/Admin/Trips/Trips'))
const Tickets = React.lazy(() => import('./views/pages/Admin/Trips/Tickets'))
const Buses = React.lazy(() => import('./views/pages/Admin/buses/buses'))
const Services = React.lazy(() => import('./views/pages/Admin/Services/Services'))

const Reviews = React.lazy(() => import('./views/pages/Admin/Trips/Reviews'))




const routes = [
    { path: '/dashboard', exact: true, name: 'Admin Dashboard', element: AdminHome },
    { path: '/stations', name: 'Stations', element: Stations, exact: true },
    { path: '/admins', name: 'Admins', element: Admins, exact: true },
    { path: '/profile', name: 'Admin Profile', element: AdminProfile, exact: true },
    { path: '/drivers', name: 'Drivers', element: Drivers, exact: true },
    { path: '/customers', name: 'Drivers', element: Customers, exact: true },
    { path: '/trips', name: 'Trips', element: Trips, exact: true },
    { path: '/trips/:tripId/reviews', name: 'Show Trip Reviews', element: Reviews, exact: true },
    { path: '/buses', name: 'bases', element: Buses, exact: true },
    { path: '/services', name: 'Services', element: Services, exact: true },

]
export default routes
