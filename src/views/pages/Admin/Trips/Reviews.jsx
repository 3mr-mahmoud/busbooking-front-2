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



function Reviews() {
    const [stars, setStars] = useState(0);
    const [comment, setComment] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [reviewModalVisible, setReviewModalVisible] = useState(false);

    const [reviews, setReviews] = useState([]);
    const { tripId } = useParams();

    const getTableElements = () => {
        ApiClient.get('admin/trips/' + tripId + '/reviews').then((repsonse) => {
            if (repsonse.data.success) {
                setReviews(repsonse.data.data.reviews);
            }
        });
    }

    const showReviewModal = (customerId) => {
        ApiClient.get('admin/trips/' + tripId + '/reviews/' + customerId).then((repsonse) => {
            if (repsonse.data.success) {
                let review = repsonse.data.data.review;
                setCustomerName(review.customer_name);
                setComment(review.comment);
                setStars(review.stars);
                setReviewModalVisible(true);
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
                            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
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
                                    <CTableDataCell>
                                        <CButton onClick={(e) => showReviewModal(review.customer_id)} className="btn me-2 btn-warning">
                                            Show
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))
                        }

                    </CTableBody>
                </CTable>
            </CCardBody>

            <CModal visible={reviewModalVisible} onClose={() => { setReviewModalVisible(false); }} backdrop="static">
                <CModalHeader closeButton>
                    <CModalTitle>Customer Review {customerName}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className='d-flex gap-3 flex-column'>
                        <div>
                            <h4>Stars</h4>
                            <ReactStars value={stars} size={30} activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC",]} />
                        </div>
                        <div>
                            <h4>Comment</h4>
                            <p>{comment}</p>
                        </div>
                    </div>
                </CModalBody>
            </CModal>

        </CCard>
    );
}

export default Reviews;
