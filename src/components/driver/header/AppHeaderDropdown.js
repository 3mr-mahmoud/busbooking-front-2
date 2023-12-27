import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {

  cilLockLocked,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { useAuth } from 'src/contexts/AuthContext'
import { Link } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const { user, logout } = useAuth();
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        Hello, {user.name}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">


        <Link to="/driver/profile" className='dropdown-item'>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </Link>
        <CDropdownItem type='button' onClick={() => logout()}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
