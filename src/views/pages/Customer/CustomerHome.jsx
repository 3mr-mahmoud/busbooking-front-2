import React, { useEffect, useRef, useState } from 'react'
import ApiClient from 'src/ApiClient'
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
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
    CTableDataCell,
    CBadge,
    CFormSelect,
    CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilCash, cilShortText, cilDollar, cilMoney } from '@coreui/icons'
import { Link } from 'react-router-dom'
import moment from 'moment';

const CustomerHome = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [availableTrips, setAvailableTrips] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);

    const getTrips = () => {

        const formattedFrom = moment(from).isValid() ? moment(from).format("YYYY-MM-DD") : null;
        const formattedTo = moment(to).isValid() ? moment(to).format("YYYY-MM-DD") : null;
        ApiClient.get('customer/trips/available', {
            params: {
                'from': formattedFrom,
                'to': formattedTo,
                'route_id': selectedRoute,
            }
        }).then((repsonse) => {
            if (repsonse.data.success) {
                setAvailableTrips(repsonse.data.data.trips);
            }
        });
    }

    useEffect(() => {
        ApiClient.get('customer/routes').then((repsonse) => {
            if (repsonse.data.success) {
                setRoutes(repsonse.data.data.routes);
            }
        });
        getTrips();
    }, []);

    useEffect(() => {
        getTrips();
    }, [from, to, selectedRoute]);



    return (
        <CContainer>

            <CRow>
                <CCol md={9}>
                    <CRow>
                        {availableTrips.map((trip) => (
                            <CCol md="4" key={trip.id}>
                                <CCard>
                                    <CCardBody className='d-flex justify-content-center flex-column gap-3'>
                                        <h3 className='text-center'>{trip.route_name}</h3>
                                        <div className='d-flex justify-content-between'>
                                            <h6> Departure Time </h6>
                                            <span>{trip.departure_time}</span>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <h6> Expected Duration </h6>
                                            <span>{Math.ceil(trip.expected_duration)} mins</span>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <h6> Price </h6>
                                            <CBadge color='warning'>{trip.price} EGP</CBadge>
                                        </div>

                                        <div className='d-flex justify-content-between'>
                                            <h6> Bus Plate Number </h6>
                                            <CBadge color='warning'>{trip.plate_number}</CBadge>
                                        </div>

                                        <div className='d-flex justify-content-between'>
                                            <h6> Bus Category </h6>
                                            <CBadge color='success'>{trip.bus_category_name}</CBadge>
                                        </div>

                                        <div className='d-flex justify-content-between'>
                                            <h6> Available Seats </h6>
                                            <CBadge color='danger'>{trip.available_seats}</CBadge>
                                        </div>
                                        <Link to={"/customer/trips/" + trip.id} className="btn btn-warning text-white">
                                            Explore
                                        </Link>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        ))}


                    </CRow>

                </CCol>
                <CCol md={3}>
                    <CCard>
                        <CCardHeader>
                            Filters
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <div className='form-group'>
                                    <label>Route:</label>
                                    <CFormSelect
                                        value={selectedRoute}
                                        onChange={(e) => setSelectedRoute(e.target.value)}
                                        required
                                    >
                                        <option value="">-- SELECT -- </option>
                                        {routes.map((route) => (
                                            <option key={route.id} value={route.id}>
                                                {route.name}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                </div>

                                <div className='form-group'>
                                    <label>From :</label>
                                    <Datetime
                                        value={from}
                                        dateFormat="YYYY-MM-DD"
                                        onChange={(date) => setFrom(date)}
                                        timeFormat={false}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>To :</label>
                                    <Datetime
                                        value={to}
                                        dateFormat="YYYY-MM-DD"
                                        onChange={(date) => setTo(date)}
                                        timeFormat={false}
                                    />
                                </div>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default CustomerHome