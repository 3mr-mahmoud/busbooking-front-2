import React from 'react'
import { Link } from 'react-router-dom'
import './AdminHome.css'
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CButton,
  CListGroupItem,
  CListGroup,
  CCardLink,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Station from "./Station.jpg"
import Bus from "./Bus.jpg"

const AdminHome = () => {
  return (
    <>
      <div className="Cards">
        <CCard style={{ width: '18rem' }}>
          <CCardImage orientation="top" src={Station} />
          <CCardBody >
            <CCardTitle>Bus Station</CCardTitle>
            <CCardText>
              “Browse through the list of available bus stations, add a new station to our service, or remove an existing one.”    </CCardText>
          </CCardBody>

          <CCardBody className="d-flex justify-content-center">
            <CButton color="info" variant='outline'>View</CButton>
            <CButton color="success" variant='outline'>Add</CButton>
            <CButton color="danger" variant='outline'>Delete</CButton>

          </CCardBody>
        </CCard>

        <CCard style={{ width: '18rem' }}>
          <CCardImage orientation="top" src={Bus} />
          <CCardBody >
            <CCardTitle>Bus Categories</CCardTitle>
            <CCardText>
              “Navigate through our bus categories, add a new bus to the fleet, or remove an existing bus from the lineup.”    </CCardText>
          </CCardBody>

          <CCardBody className="d-flex justify-content-center">
            <CButton color="info" variant='outline'>View</CButton>
            <CButton color="success" variant='outline'>Add</CButton>
            <CButton color="danger" variant='outline'>Delete</CButton>

          </CCardBody>
        </CCard>






      </div>
    </>
  )
}

export default AdminHome