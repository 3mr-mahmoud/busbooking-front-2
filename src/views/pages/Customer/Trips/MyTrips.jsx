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

const MyTrips = () => {
    const [trips, setTrips] = useState([]);
    const [stars, setStars] = useState(0);
    const [comment, setComment] = useState("");
    const [selectedTrip, setSelectedTrip] = useState(-1);
    const [reviewModalVisible, setReviewModalVisible] = useState(false);
    useEffect(() => {
        ApiClient.get('customer/trips/my-trips').then((repsonse) => {
            if (repsonse.data.success) {
                setTrips(repsonse.data.data.trips);
            }
        });
    }, []);

    const showReviewModal = (tripId) => {
        setSelectedTrip(tripId);
        ApiClient.get('customer/trips/' + tripId + '/review').then((response) => {
            if (response.data.data.review) {
                setStars(response.data.data.review.stars);
                setComment(response.data.data.review.comment);
            } else {
                setStars(0);
                setComment("");
            }
            setReviewModalVisible(true);
        })

    }

    const reviewTrip = (e) => {
        e.preventDefault();
        ApiClient.post('customer/trips/' + selectedTrip + '/review', {
            'stars': stars,
            'comment': comment,
        }).then((repsonse) => {
            if (repsonse.data.success) {
                toast.success("We Have Received your Feedback");
                setReviewModalVisible(false);
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
                                                <CTableHeaderCell>Route Name</CTableHeaderCell>
                                                <CTableHeaderCell>Price</CTableHeaderCell>
                                                <CTableHeaderCell>Bus Plate Number</CTableHeaderCell>
                                                <CTableHeaderCell>Your Seat Number</CTableHeaderCell>
                                                <CTableHeaderCell>Golden Seat Number</CTableHeaderCell>
                                                <CTableHeaderCell>Actions</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            {trips.map((trip) => !trip.arrival_time ? (
                                                <CTableRow key={trip.id + '-' + trip.seat_number}>
                                                    <CTableDataCell>{trip.id}</CTableDataCell>
                                                    <CTableDataCell>{trip.departure_time}</CTableDataCell>
                                                    <CTableDataCell>{trip.route_name}</CTableDataCell>
                                                    <CTableDataCell>{trip.price}</CTableDataCell>
                                                    <CTableDataCell>{trip.plate_number}</CTableDataCell>
                                                    <CTableDataCell>{trip.seat_number}</CTableDataCell>
                                                    <CTableDataCell>
                                                        <h4>
                                                            <CBadge color='warning'>
                                                                {trip.golden_seat}
                                                            </CBadge>
                                                        </h4>
                                                    </CTableDataCell>
                                                    <CTableDataCell>
                                                        <Link to={"/customer/trips/" + trip.id} className="btn btn-primary">
                                                            Show
                                                        </Link>
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
                                                <CTableHeaderCell>Actual Departure Time</CTableHeaderCell>
                                                <CTableHeaderCell>Arrival Time</CTableHeaderCell>
                                                <CTableHeaderCell>Route Name</CTableHeaderCell>
                                                <CTableHeaderCell>Price</CTableHeaderCell>
                                                <CTableHeaderCell>Bus Plate Number</CTableHeaderCell>
                                                <CTableHeaderCell>Your Seat Number</CTableHeaderCell>
                                                <CTableHeaderCell>Golden Seat Number</CTableHeaderCell>
                                                <CTableHeaderCell>Actions</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            {trips.map((trip) => trip.arrival_time ? (
                                                <CTableRow key={trip.id + '-' + trip.seat_number}>
                                                    <CTableDataCell>{trip.id}</CTableDataCell>
                                                    <CTableDataCell>{trip.actual_departure_time}</CTableDataCell>
                                                    <CTableDataCell>{trip.arrival_time}</CTableDataCell>
                                                    <CTableDataCell>{trip.route_name}</CTableDataCell>
                                                    <CTableDataCell>{trip.price}</CTableDataCell>
                                                    <CTableDataCell>{trip.plate_number}</CTableDataCell>
                                                    <CTableDataCell>{trip.seat_number}</CTableDataCell>
                                                    <CTableDataCell>
                                                        <h4>
                                                            <CBadge color='warning'>
                                                                {trip.golden_seat}
                                                            </CBadge>
                                                        </h4>
                                                    </CTableDataCell>
                                                    <CTableDataCell>
                                                        <CButton onClick={(e) => showReviewModal(trip.id)} className="btn me-2 btn-warning">
                                                            Review
                                                        </CButton>
                                                        <Link to={"/customer/trips/" + trip.id} className="btn btn-primary">
                                                            Show
                                                        </Link>
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
            </CRow>


            <CModal visible={reviewModalVisible} onClose={() => { setReviewModalVisible(false); }} backdrop="static">
                <CModalHeader closeButton>
                    <CModalTitle>Review Trip {selectedTrip}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <form onSubmit={reviewTrip}>


                        <div className='form-group'>
                            <label>Stars:</label>
                            <ReactStars value={stars} size={30} activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC",]} isEdit={true} onChange={(nextValue) => setStars(nextValue)} />
                        </div>

                        <div className='form-group'>
                            <label>Comment:</label>
                            <CFormTextarea value={comment} onChange={e => setComment(e.target.value)} />
                        </div>

                        <div className='d-flex justify-content-center mt-4'>
                            <CButton color="warning" size='lg' type="submit">Review</CButton>
                        </div>
                    </form>
                </CModalBody>
            </CModal>

        </CContainer>
    )
}

export default MyTrips