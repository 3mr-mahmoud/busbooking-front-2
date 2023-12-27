import React from 'react'

const DriverHome = React.lazy(() => import('./views/pages/Driver/DriverHome'))
const DriverProfile = React.lazy(() => import('./views/pages/Driver/DriverProfile'))


const routes = [
    { path: '/', exact: true, name: 'Driver Home', element: DriverHome },
    { path: '/profile', name: 'Driver Profile', element: DriverProfile, exact: true }
]
export default routes
