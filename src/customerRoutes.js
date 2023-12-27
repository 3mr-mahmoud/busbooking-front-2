import React from 'react'

const CustomerHome = React.lazy(() => import('./views/pages/Customer/CustomerHome'))
const CustomerProfile = React.lazy(() => import('./views/pages/Customer/CustomerProfile'))
const showTrip = React.lazy(() => import('./views/pages/Customer/Trips/ShowTrip'))
const myTrips = React.lazy(() => import('./views/pages/Customer/Trips/MyTrips'))


const routes = [
    { path: '/', exact: true, name: 'Customer Home', element: CustomerHome },
    { path: '/profile', name: 'Customer Profile', element: CustomerProfile, exact: true },
    { path: '/my-trips', name: 'Customer Profile', element: myTrips, exact: true },
    { path: '/trips/:tripId', name: 'Customer Profile', element: showTrip, exact: true },

]
export default routes
