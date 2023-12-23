import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHeaderCell,
  CTableRow,
  CTableHead,
  CTableBody,
  CTableDataCell

} from '@coreui/react'

const ViewStations = () => {
  const [stations, setStations] = useState([
    {
      id: 1,
      name: 'test',
      number_of_trips: 5,
    },
    {
      id: 2,
      name: 'test2',
      number_of_trips: 5,
    },
  ]);

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Stations
        </CCardHeader>
        <CCardBody>

          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Number of trips</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {
                stations.map((station) => (
                  <CTableRow>
                    <CTableDataCell>{station.id}</CTableDataCell>
                    <CTableDataCell>{station.name}</CTableDataCell>
                    <CTableDataCell>{station.number_of_trips}</CTableDataCell>
                  </CTableRow>
                ))
              }

            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ViewStations