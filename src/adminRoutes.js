import React from 'react'

const AdminHome = React.lazy(() => import('./views/pages/Admin/AdminHome'))
const ViewStations = React.lazy(() => import('./views/pages/Admin/Stations/ViewStation'))
const AddStation = React.lazy(() => import('./views/pages/Admin/Stations/AddStation'))

const routes = [
    { path: '/dashboard', exact: true, name: 'Admin Dashboard', element: AdminHome },
    { path: '/stations', name: 'Stations', element: ViewStations, exact: true },
    { path: '/stations/create', name: 'Create Station', element: AddStation },
]

export default routes
