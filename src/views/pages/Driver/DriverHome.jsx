import React, { useEffect, useState } from 'react'
import ApiClient from 'src/ApiClient'
import ReactStars from 'react-rating-star-with-type'
import {
    CCard,
    CCardBody,
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
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CFormTextarea
} from '@coreui/react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const DriverHome = () => {
    const [trips, setTrips] = useState([]);

    const getTrips = () => {
        ApiClient.get('driver/trips/my-trips').then((repsonse) => {
            if (repsonse.data.success) {
                setTrips(repsonse.data.data.trips);
            }
        });
    }

    useEffect(() => {
        getTrips();
    }, []);



    const startTrip = (tripId) => {
        ApiClient.patch('driver/trips/' + tripId + '/departure-time').then((repsonse) => {
            if (repsonse.data.success) {
                toast.success("Trip Started Good Luck 😊");
                getTrips();
            }
        }).catch(() => { });
    }

    const endTrip = (tripId) => {
        ApiClient.patch('driver/trips/' + tripId + '/arrival-time').then((repsonse) => {
            if (repsonse.data.success) {
                toast.success("Trip Ended");
                getTrips();
            }
        }).catch(() => { });
    }

    return (
        <CContainer>
            <CRow>
                <CCol md={12}>
                    <CCard>
                        <CCardHeader>
                            Ongoing or Upcoming Trips
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <CTable bordered striped responsive>
                                        <CTableHead>
                                            <CTableRow>
                                                <CTableHeaderCell>Trip ID</CTableHeaderCell>
                                                <CTableHeaderCell>Departure Time</CTableHeaderCell>
                                                <CTableHeaderCell>Actual Departure Time</CTableHeaderCell>
                                                <CTableHeaderCell>Arrival Time</CTableHeaderCell>
                                                <CTableHeaderCell>Route Name</CTableHeaderCell>
                                                <CTableHeaderCell>Bus Plate Number</CTableHeaderCell>
                                                <CTableHeaderCell>Expected Duration</CTableHeaderCell>
                                                <CTableHeaderCell>Passengers</CTableHeaderCell>
                                                <CTableHeaderCell>Actions</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            {trips.map((trip) => !trip.arrival_time ? (
                                                <CTableRow key={trip.id + '-' + trip.seat_number}>
                                                    <CTableDataCell>{trip.id}</CTableDataCell>
                                                    <CTableDataCell>{trip.departure_time}</CTableDataCell>
                                                    <CTableDataCell>{trip.actual_departure_time}</CTableDataCell>
                                                    <CTableDataCell>{trip.arrival_time}</CTableDataCell>
                                                    <CTableDataCell>{trip.route_name}</CTableDataCell>
                                                    <CTableDataCell>{trip.plate_number}</CTableDataCell>
                                                    <CTableDataCell>{trip.expected_duration} mins</CTableDataCell>
                                                    <CTableDataCell>{trip.passengers}</CTableDataCell>
                                                    <CTableDataCell>
                                                        {!trip.actual_departure_time && <CButton onClick={() => startTrip(trip.id)} className="btn-sm me-2 btn-success">
                                                            Start Trip
                                                        </CButton>}
                                                        {trip.actual_departure_time && <CButton onClick={() => endTrip(trip.id)} className="btn-sm me-2 btn-danger">
                                                            End Trip
                                                        </CButton>}
                                                    </CTableDataCell>
                                                </CTableRow>
                                            ) : '')}
                                        </CTableBody>
                                    </CTable>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol className='mt-5' md={12}>
                    <CCard>
                        <CCardHeader>
                            Past
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <CTable bordered striped responsive>
                                        <CTableHead>
                                            <CTableRow>
                                                <CTableHeaderCell>Trip ID</CTableHeaderCell>
                                                <CTableHeaderCell>Departure Time</CTableHeaderCell>
                                                <CTableHeaderCell>Actual Departure Time</CTableHeaderCell>
                                                <CTableHeaderCell>Arrival Time</CTableHeaderCell>
                                                <CTableHeaderCell>Route Name</CTableHeaderCell>
                                                <CTableHeaderCell>Bus Plate Number</CTableHeaderCell>
                                                <CTableHeaderCell>Expected Duration</CTableHeaderCell>
                                                <CTableHeaderCell>Passengers</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            {trips.map((trip) => trip.arrival_time ? (
                                                <CTableRow key={trip.id + '-' + trip.seat_number}>
                                                    <CTableDataCell>{trip.id}</CTableDataCell>
                                                    <CTableDataCell>{trip.departure_time}</CTableDataCell>
                                                    <CTableDataCell>{trip.actual_departure_time}</CTableDataCell>
                                                    <CTableDataCell>{trip.arrival_time}</CTableDataCell>
                                                    <CTableDataCell>{trip.route_name}</CTableDataCell>
                                                    <CTableDataCell>{trip.plate_number}</CTableDataCell>
                                                    <CTableDataCell>{trip.expected_duration} mins</CTableDataCell>
                                                    <CTableDataCell>{trip.passengers}</CTableDataCell>

                                                </CTableRow>
                                            ) : '')}
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

export default DriverHome