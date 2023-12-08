import React from 'react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import {
    CTable,
    CTableHeaderCell,
    CTableRow,
    CTableHead,
    CTableBody,
    CTableDataCell
    
  } from '@coreui/react'

const ViewStations = () => 
{
    return (
        <>
    <h1>Stations</h1>

        <CTable borderless stripedColumns>
  <CTableHead>
    <CTableRow>
      <CTableHeaderCell scope="col">ID</CTableHeaderCell>
      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
      <CTableHeaderCell scope="col">Number of trips</CTableHeaderCell>
      <CTableHeaderCell scope="col">Description</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody>
    <CTableRow active>
      <CTableHeaderCell scope="row">1</CTableHeaderCell>
      <CTableDataCell>test</CTableDataCell>
      <CTableDataCell>test</CTableDataCell>
      <CTableDataCell>test</CTableDataCell>
    </CTableRow>
    
  </CTableBody>
</CTable>
</>
      )
}

export default ViewStations