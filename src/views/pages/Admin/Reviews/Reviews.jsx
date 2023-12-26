import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ReactStars from 'react-rating-star-with-type'

import {
    CCard, CCardBody, CCardHeader, CTable, CTableHeaderCell,
    CTableRow,
    CTableHead,
    CTableBody,
    CTableDataCell, CModal, CModalBody, CModalHeader, CModalTitle, CButton, CFormInput, CFormTextarea, CFormCheck
} from '@coreui/react';
import ApiClient from 'src/ApiClient';



function Reviews() {
    const [reviews, setReviews] = useState([]);
    const getTableElements = () => {
        ApiClient.get('admin/trips/3/reviews').then((repsonse) => {
            if (repsonse.data.success) {
                console.log(repsonse);
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
                Reviews
            </CCardHeader>
            <CCardBody>
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
                                <CTableRow key={review.id}>
                                    <CTableDataCell>{review.customer_id}</CTableDataCell>
                                    <CTableDataCell>{review.customer_name}</CTableDataCell>
                                    <CTableDataCell>{review.trip_id}</CTableDataCell>
                                    <CTableDataCell>{review.seen_at}</CTableDataCell>
                                    <CTableDataCell><ReactStars  value={review.stars} edit={true} activeColors={[ "red", "orange", "#FFCE00", "#9177FF","#8568FC",]} /></CTableDataCell>
                                </CTableRow>
                            ))
                        }

                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    );
}

export default Reviews;
