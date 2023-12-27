import React, { useState, useEffect } from 'react';

import {
    CCard, CCardBody, CCardHeader, CTable, CTableHeaderCell,
    CTableRow,
    CTableHead,
    CTableBody,
    CTableDataCell, CModal, CModalBody, CModalHeader, CModalTitle, CButton, CFormInput, CFormTextarea, CFormCheck, CBadge, CFormSelect, CRow, CCol, CTooltip
} from '@coreui/react';
import ApiClient from 'src/ApiClient';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './Tickets.css';
import { toast } from 'react-toastify';



function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [ticketModalVisible, setTicketModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [selectedSeat, setSelectedSeat] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [trip, setTrip] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const { tripId } = useParams();

    const getTableElements = () => {
        ApiClient.get('admin/trips/' + tripId + '/tickets').then((repsonse) => {
            if (repsonse.data.success) {
                setTickets(repsonse.data.data.tickets);
            }
        });
    }

    const selectSeat = (seat) => {
        setSelectedSeat(seat);
    }

    const resetStates = () => {
        setSelectedSeat("");
        setCurrentIndex(-1);
        setSelectedPaymentMethod("");
        setSelectedCustomer(null);
    }

    const addElement = () => {
        resetStates();
        setTicketModalVisible(true);
    }

    const getTrip = () => {
        ApiClient.get('admin/trips/' + tripId).then((repsonse) => {
            if (repsonse.data.success) {
                setTrip(repsonse.data.data.trip);
            }
        });
    }

    useEffect(() => {
        getTableElements();

        ApiClient.get('admin/customers').then((repsonse) => {
            if (repsonse.data.success) {
                setCustomers(repsonse.data.data.customers);
            }
        });

        getTrip();

    }, []);

    const editElement = (index) => {
        setCurrentIndex(index);
        ApiClient.get('admin/trips/' + tripId + '/tickets/' + tickets[index].ticket_number).then((repsonse) => {
            if (repsonse.data.success) {
                let ticket = repsonse.data.data.ticket;
                setSelectedSeat(ticket.seat_number);
                setSelectedPaymentMethod(ticket.payment_method);
                setSelectedCustomer(ticket.customer_id);
                setTicketModalVisible(true);
            }
        });
    }

    const deleteElement = (index) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // If the user confirms, proceed with deletion
        if (isConfirmed) {
            ApiClient.delete('admin/trips/' + tripId + '/tickets/' + tickets[index].ticket_number).then((response) => {
                if (response.data.success) {
                    const updated = [...tickets];
                    updated.splice(index, 1);
                    setTickets(updated);
                    toast.success("deleted succesfully");
                }
            }).catch(() => { });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            'trip_id': tripId,
            'seat_number': selectedSeat,
            'customer_id': selectedCustomer,
            'payment_method': selectedPaymentMethod,
        };
        // updating
        if (currentIndex != -1) {
            ApiClient.patch('admin/trips/' + tripId + '/tickets/' + tickets[currentIndex].ticket_number, data).then((repsonse) => {
                if (repsonse.data.success) {
                    // refresh table
                    getTableElements();
                    getTrip();
                }
                toast.success("edited succesfully");
                resetStates();
                setTicketModalVisible(false);
            }).catch(() => { })
        } else {
            //creating
            ApiClient.post('admin/tickets', data).then((repsonse) => {
                if (repsonse.data.success) {
                    getTableElements();
                    getTrip();
                }
                toast.success("added succesfully");
                resetStates();
                setTicketModalVisible(false);
            }).catch(() => { })
        }

    };


    return (
        <CCard>
            <CCardHeader>
                Tickets Trip {tripId}
            </CCardHeader>
            <CCardBody>
                <div className='d-flex justify-content-between'>
                    <Link className='btn btn-primary' to="/admin/trips">Back</Link>

                    <CButton color="success" className='text-white' onClick={() => addElement()}>Add Ticket</CButton>
                </div>

                <CModal visible={ticketModalVisible} onClose={() => { setTicketModalVisible(false); }} backdrop="static">
                    <CModalHeader closeButton>
                        <CModalTitle>Ticket</CModalTitle>
                    </CModalHeader>
                    {trip && <CModalBody>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Customer:</label>
                                <CFormSelect
                                    value={selectedCustomer}
                                    onChange={(e) => setSelectedCustomer(e.target.value)}
                                    required
                                >
                                    <option value="">-- SELECT -- </option>
                                    {customers.map((customer) => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </div>

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
                                                <CCol className={`seat-box col-3 ${seat.available || (currentIndex != -1 && seat.seat_number == tickets[currentIndex].seat_number) ? '' : 'disabled'} ${seat.seat_number == selectedSeat ? 'selected' : ''}`} onClick={() => selectSeat(seat.seat_number)} key={seat.seat_number}>
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
                                <CButton color="success" size='lg' type="submit">Save</CButton>
                            </div>
                        </form>
                    </CModalBody>}
                </CModal>
                <CTable striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">Ticket Number</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Customer Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Payment Method</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Seat Number</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            tickets.map((ticket, index) => (
                                <CTableRow key={ticket.trip_id + '-' + ticket.ticket_number}>
                                    <CTableDataCell>{ticket.ticket_number}</CTableDataCell>
                                    <CTableDataCell>{ticket.customer_name}</CTableDataCell>
                                    <CTableDataCell>{ticket.payment_method}</CTableDataCell>
                                    <CTableDataCell>
                                        <CBadge color={ticket.is_golden ? 'warning' : 'primary  '} >{ticket.seat_number}</CBadge>

                                    </CTableDataCell>
                                    <CTableDataCell>{ticket.created_at}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton color="success" size='sm' className='mx-2 text-white' onClick={() => editElement(index)}>Edit</CButton>
                                        <CButton color="danger" size='sm' className='mx-2 text-white' onClick={() => deleteElement(index)}>Delete</CButton>
                                    </CTableDataCell>
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
