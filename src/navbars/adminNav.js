import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilLocationPin,
    cilSpeedometer,
    cilUser,
    cilFingerprint,
    cilCreditCard,
    cilAirplaneMode,

    cilPeople,
    cilBusAlt,
    cilCog

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
        superadmin: 1,
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


    },
    {
        component: CNavItem,
        name: 'Buses',
        to: '/admin/buses',
        icon: <CIcon icon={cilBusAlt} customClassName="nav-icon" />,


    },
    {
        component: CNavItem,
        name: 'Services',
        to: '/admin/services',
        icon: <CIcon icon={cilCog} customClassName="nav-icon" />,


    }
]

export default _nav
