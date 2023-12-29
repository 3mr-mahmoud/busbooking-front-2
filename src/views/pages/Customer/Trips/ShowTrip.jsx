import React, { useEffect, useState } from 'react'
import ApiClient from 'src/ApiClient'
import './ShowTrip.css';
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CContainer,
    CCardHeader,
    CBadge,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalTitle,
    CTooltip,
    CFormSelect
} from '@coreui/react'

import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from 'src/contexts/AuthContext';
import { toast } from 'react-toastify';

const ShowTrip = () => {
    const { refreshData } = useAuth();
    const [buyTicketModalVisible, setBuyTicketModalVisible] = useState(false);
    const [trip, setTrip] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const { tripId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        ApiClient.get('customer/trips/' + tripId).then((repsonse) => {
            if (repsonse.data.success) {
                setTrip(repsonse.data.data.trip);
            }
        });
    }, []);

    const selectSeat = (seat) => {
        setSelectedSeat(seat);
    }
    const buyTicket = (e) => {
        e.preventDefault();

        ApiClient.post('customer/trips/' + tripId + '/ticket', {
            'seat_number': selectedSeat,
            'payment_method': selectedPaymentMethod,
        }).then((repsonse) => {
            console.log(repsonse);
            if (repsonse.data.success) {
                refreshData();
                toast.success("You have just bought ticket on trip " + tripId);
                navigate('/customer/my-trips');
            }
        }).catch(() => { })
    }




    return (
        <CContainer>

            <CRow>
                <CCol md={9}>

                    <CCard>
                        <CCardHeader>
                            Trip Details
                        </CCardHeader>
                        {trip && <CCardBody className='d-flex justify-content-center flex-column gap-3'>
                            <h3 className='text-center'>
                                {trip.route_name}
                            </h3>

                            {trip.actual_departure_time &&
                                <h6 className="bg-danger text-center align-self-center p-3 text-white rounded"> Trip Started @ {trip.actual_departure_time}</h6>}
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
                                <h4><CBadge color='warning' className='align-self-center'>{trip.price} EGP</CBadge></h4>
                            </div>

                            <div className='d-flex justify-content-between'>
                                <h6> Bus Plate Number </h6>
                                <h4><CBadge color='warning' className='align-self-center'>{trip.plate_number}</CBadge></h4>
                            </div>

                            <div className='d-flex justify-content-between'>
                                <h6> Bus Category </h6>
                                <h4><CBadge color='success' className='align-self-center'>{trip.bus_category_name}</CBadge></h4>
                            </div>

                            <div className='d-flex justify-content-between'>
                                <h6> Seats </h6>
                                <h4><CBadge color='danger' className='align-self-center'>{trip.seats.length}</CBadge></h4>
                            </div>
                            {!trip.actual_departure_time && <CButton color='success' className='text-white' onClick={() => { setBuyTicketModalVisible(true); }}>Buy Ticket</CButton>}
                        </CCardBody>}
                    </CCard>

                </CCol>
                <CCol md={3}>
                    <CCard>
                        <CCardHeader>
                            Stations
                        </CCardHeader>
                        {trip && <CCardBody>
                            <CRow>
                                {trip.route_stations.map((station) => (
                                    <div key={station.id} className='mb-4'>
                                        <span className='mx-2 station-number text-white bg-success rounded-circle'>{station['order']}</span>
                                        {station.name}
                                    </div>
                                ))}
                            </CRow>
                        </CCardBody>}
                    </CCard>

                    <CCard className='mt-3'>
                        <CCardHeader>
                            {trip && trip.bus_category_name} Services
                        </CCardHeader>
                        {trip && <CCardBody>
                            <div className='d-flex'>
                                {trip.category_services.map((service) => (
                                    <h4 key={service.id}>
                                        <CBadge color='success' className='mb-2 me-2'>
                                            {service.name}
                                        </CBadge>
                                    </h4>
                                ))}
                            </div>
                        </CCardBody>}
                    </CCard>
                </CCol>
            </CRow>

            <CModal visible={buyTicketModalVisible} onClose={() => { setBuyTicketModalVisible(false); }} backdrop="static">
                <CModalHeader closeButton>
                    <CModalTitle>Buy Ticket</CModalTitle>
                </CModalHeader>
                {trip && <CModalBody>
                    <form onSubmit={buyTicket}>
                        <div className='form-group'>
                            <label>Payment Method:</label>
                            <CFormSelect
                                value={selectedPaymentMethod}
                                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                required
                            >
                                <option value="">-- SELECT -- </option>
                                <option value="cash">Cash</option>
                                <option value="visa">Visa</option>
                            </CFormSelect>
                        </div>

                        <div className='position-relative seats-container d-flex flex-column' >
                            <h3>Seats</h3>
                            {trip.seats.map((seatRow, index) => (
                                index % 4 === 0 && (
                                    <CRow className='seat-row' key={index}>
                                        {trip.seats.slice(index, index + 4).map((seat, ind) => (
                                            <CCol className={`seat-box col-3 ${seat.available ? '' : 'disabled'} ${seat.seat_number == selectedSeat ? 'selected' : ''}`} onClick={() => selectSeat(seat.seat_number)} key={seat.seat_number}>
                                                {seat.note != null ? (<CTooltip content={seat.note}>
                                                    <span>{seat.seat_number}</span>
                                                </CTooltip>) : (seat.seat_number)}
                                            </CCol>
                                        ))}
                                    </CRow>
                                )
                            ))}
                        </div>
                        <div className='d-flex justify-content-center mt-4'>
                            <CButton color="success" size='lg' type="submit">Buy</CButton>
                        </div>
                    </form>
                </CModalBody>}
            </CModal>
        </CContainer>
    )
}

export default ShowTrip