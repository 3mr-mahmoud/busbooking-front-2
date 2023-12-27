import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-star-with-type'

import {
    CCard, CCardBody, CCardHeader, CTable, CTableHeaderCell,
    CTableRow,
    CTableHead,
    CTableBody,
    CTableDataCell, CModal, CModalBody, CModalHeader, CModalTitle, CButton, CFormInput, CFormTextarea, CFormCheck
} from '@coreui/react';
import ApiClient from 'src/ApiClient';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';



function Tickets() {
    const [reviews, setReviews] = useState([]);
    const { tripId } = useParams();

    const getTableElements = () => {
        ApiClient.get('admin/trips/' + tripId + '/reviews').then((repsonse) => {
            if (repsonse.data.success) {
                setReviews(repsonse.data.data.reviews);
            }
        });
    }

    useEffect(() => {
        getTableElements();
    }, []);

    return (
        <CCard>
            <CCardHeader>
                Reviews Trip {tripId}
            </CCardHeader>
            <CCardBody>
                <Link className='btn btn-primary' to="/admin/trips">Back</Link>
                <CTable striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">Customer ID</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Trip ID</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Seen at</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Rate</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            reviews.map((review, index) => (
                                <CTableRow key={review.customer_id + '-' + review.trip_id}>
                                    <CTableDataCell>{review.customer_id}</CTableDataCell>
                                    <CTableDataCell>{review.customer_name}</CTableDataCell>
                                    <CTableDataCell>{review.trip_id}</CTableDataCell>
                                    <CTableDataCell>{review.seen_at}</CTableDataCell>
                                    <CTableDataCell><ReactStars value={review.stars} activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC",]} /></CTableDataCell>
                                </CTableRow>
                            ))
                        }

                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    );
}

export default Tickets;
