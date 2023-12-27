import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavLink,
  CNavItem,
  CBadge,
} from '@coreui/react'

import { AppHeaderDropdown } from './header/index'
import logoLargeInvert from 'src/assets/brand/logo_large_invert.png'
import { useAuth } from 'src/contexts/AuthContext'

const AppHeader = () => {
  const { user } = useAuth();
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <img src={logoLargeInvert} alt="Bus Booking logo" height={48} />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/driver" component={NavLink}>
              Home
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="ms-3">
          <CNavItem>
            Salary : <CBadge color="success" shape="rounded-pill">{user.salary}</CBadge>
          </CNavItem>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
