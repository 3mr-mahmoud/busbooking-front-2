import React from 'react'

const CustomerHome = React.lazy(() => import('./views/pages/Customer/CustomerHome'))
const CustomerProfile = React.lazy(() => import('./views/pages/Customer/CustomerProfile'))


const routes = [
    { path: '/', exact: true, name: 'Customer Home', element: CustomerHome },
    { path: '/profile', name: 'Customer Profile', element: CustomerProfile, exact: true },
    // { path: '/trips', name: 'Trips', element: Trips, exact: true },

]
export default routes
