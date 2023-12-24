import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilLocationPin,
    cilSpeedometer,
    cilUser,
    cilFingerprint,
    cilCreditCard,
    cilAirplaneMode,

    cilPeople

} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'


const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/admin/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Stations',
        to: '/admin/stations',
        icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Admin',
        to: '/admin/admins',
        icon: <CIcon icon={cilFingerprint} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Drivers',
        to: '/admin/drivers',
        icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,


    },
    {
        component: CNavItem,
        name: 'Trips',
        to: '/admin/trips',
        icon: <CIcon icon={cilAirplaneMode} customClassName="nav-icon" />,


    },
    {
        component: CNavItem,
        name: 'Customers',
        to: '/admin/customers',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,


    }
]

export default _nav
