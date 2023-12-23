import React, { useEffect, useState } from 'react'
import ApiClient from 'src/ApiClient'
import './AdminHome.css'
import {
  CCard,
  CCardBody,
  CWidgetStatsF,
  CCol,
  CRow,
  CContainer,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChartPie, cilLockLocked, cilUser, cilCash, cilShortText, cilDollar, cilMoney } from '@coreui/icons'
import Station from "./Station.jpg"
import Bus from "./Bus.jpg"

const AdminHome = () => {
  const [avgTrips, setAvgTrips] = useState(null);
  const [ticketsCount, setTicketsCount] = useState(null);
  const [customersCount, setCustomersCount] = useState(null);
  const [sales, setSales] = useState(null);
  const [driversSalary, setDriversSalary] = useState(null);
  const [tripTickets, setTripTickets] = useState([]);
  const [routeTrips, setRouteTrips] = useState([]);
  useEffect(() => {
    ApiClient.get('admin/dashboard').then((repsonse) => {
      console.log(repsonse.data.data);
      if (repsonse.data.success) {
        setAvgTrips(repsonse.data.data.stats.average_trips_price);
        setTicketsCount(repsonse.data.data.stats.tickets_count);
        setCustomersCount(repsonse.data.data.stats.customers_count);
        setSales(repsonse.data.data.stats.sales);
        setDriversSalary(repsonse.data.data.stats.drivers_salary);
        setTripTickets(repsonse.data.data.trip_tickets);
        setRouteTrips(repsonse.data.data.route_trips);
      }
    });
  }, []);

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            icon={<CIcon icon={cilCash} height={24} />}
            title="Total Drivers Salary"
            value={driversSalary} />
        </CCol>
        <CCol>
          <CWidgetStatsF
            className="mb-3"
            color="success"
            icon={<CIcon icon={cilUser} height={24} />}
            title="Customers Count"
            value={customersCount} />
        </CCol>
        <CCol>
          <CWidgetStatsF
            className="mb-3"
            color="danger"
            icon={<CIcon icon={cilShortText} height={24} />}
            title="Tickets Sold"
            value={ticketsCount} />
        </CCol>

        <CCol>
          <CWidgetStatsF
            className="mb-3"
            color="warning"
            icon={<CIcon icon={cilDollar} height={24} />}
            title="Sales"
            value={sales} />
        </CCol>

        <CCol>
          <CWidgetStatsF
            className="mb-3"
            color="success"
            icon={<CIcon icon={cilMoney} height={24} />}
            title="Average Trips Price"
            value={avgTrips} />
        </CCol>
      </CRow>
      <CRow>
        <CCol md={6}>
          <CCard>
            <CCardHeader>
              Tickets sold per trip
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <CTable bordered striped responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Trip ID</CTableHeaderCell>
                        <CTableHeaderCell>Departure Time</CTableHeaderCell>
                        <CTableHeaderCell>Route Name</CTableHeaderCell>
                        <CTableHeaderCell>Tickets Count</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {tripTickets.map((trip) => (
                        <CTableRow key={trip.trip_id}>
                          <CTableDataCell>{trip.trip_id}</CTableDataCell>
                          <CTableDataCell>{trip.departure_time}</CTableDataCell>
                          <CTableDataCell>{trip.route_name}</CTableDataCell>
                          <CTableDataCell>{trip.tickets_count}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard>
            <CCardHeader>
              Route Assigned trips
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <CTable bordered striped responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Route Name</CTableHeaderCell>
                        <CTableHeaderCell>Trips Count</CTableHeaderCell>
                        <CTableHeaderCell>Stations Count</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {routeTrips.map((route) => (
                        <CTableRow key={route.route_name}>
                          <CTableDataCell>{route.route_name}</CTableDataCell>
                          <CTableDataCell>{route.trips_count}</CTableDataCell>
                          <CTableDataCell>{route.stations_count}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default AdminHome