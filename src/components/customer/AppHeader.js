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
import CIcon from '@coreui/icons-react'

import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { useAuth } from 'src/contexts/AuthContext'

const AppHeader = () => {
  const { user } = useAuth();
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/customer" component={NavLink}>
              Home
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink to="/customer/my-trips" component={NavLink}>
              My trips
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="ms-3">
          <CNavItem>
            Balance : <CBadge color="success" shape="rounded-pill">{user.wallet_balance}</CBadge>
          </CNavItem>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
