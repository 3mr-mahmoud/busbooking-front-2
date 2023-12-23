import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilLocationPin,
    cilSpeedometer,
    cilUser,
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
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    }
]

export default _nav
