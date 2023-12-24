import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './buses.css';
import {
    CCard, CCardBody, CCardHeader, CTable, CTableHeaderCell,
    CTableRow,
    CTableHead,
    CTableBody,
    CTableDataCell, CModal, CModalBody, CModalHeader, CModalTitle, CButton, CFormInput, CFormTextarea, CFormSelect, CRow, CCol, CContainer, CTooltip
} from '@coreui/react';
import ApiClient from 'src/ApiClient';

function buses() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [seatModalIsOpen, setSeatModalIsOpen] = useState(false);
    const [buses, setbuses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [currentSeat, setCurrentSeat] = useState(-1);
    const [seatsArr, setSeatsArr] = useState([]);
    const [note, setNote] = useState("");
    const [platenumber, setPlatenumber] = useState('');
    const [model, setModel] = useState('');
    const [capacity, setCapacity] = useState('');
    const [seats, setSeats] = useState('');
    const [busCategories, setBusCategories] = useState([]);
    const [busCategoryId, setBusCategoryId] = useState(0);



    const getTableElements = () => {
        ApiClient.get('admin/buses').then((repsonse) => {
            if (repsonse.data.success) {
                setbuses(repsonse.data.data.buses);
            }
        });
    }

    const getInitialData = () => {
        getTableElements()

        ApiClient.get('admin/bus-categories').then((repsonse) => {
            if (repsonse.data.success) {
                setBusCategories(repsonse.data.data.bus_categories);
            }
        });

    }

    useEffect(() => {
        getInitialData();
    }, []);


    const resetStates = () => {
        setModel("");
        setPlatenumber("");
        setCapacity("");
        setSeats("");
        setCurrentIndex(-1);
        setBusCategoryId(null);
    }


    const editElement = (index) => {
        setCurrentIndex(index);
        ApiClient.get('admin/buses/' + buses[index].id).then((repsonse) => {
            if (repsonse.data.success) {
                let bus = repsonse.data.data.bus;
                setPlatenumber(bus.plate_number);
                setCapacity(bus.capacity);
                setModel(bus.model);
                setSeats(bus.seats.length);
                setSeatsArr(bus.seats);
                setBusCategoryId(bus.bus_category_id);
                setModalIsOpen(true);
            }
        });
    }


    const deleteElement = (index) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // If the user confirms, proceed with deletion
        if (isConfirmed) {
            ApiClient.delete('admin/buses/' + buses[index].id).then((response) => {
                if (response.data.success) {
                    const updated = [...buses];
                    updated.splice(index, 1);
                    setbuses(updated);
                    toast.success("deleted succesfully");
                }
            }).catch(() => { });
        }
    }

    const addElement = () => {
        resetStates();
        setModalIsOpen(true);
    }

    const editSeat = (seatIndex) => {
        setNote(seatsArr[seatIndex].note);
        setCurrentSeat(seatIndex);
        setSeatModalIsOpen(true);
    }


    const handleSeatUpdate = (e) => {
        e.preventDefault();
        let data = {
            'note': note,
        };
        // updating
        if (currentIndex != -1 && currentSeat != -1) {
            ApiClient.patch('admin/buses/' + buses[currentIndex].id + '/seats/' + seatsArr[currentSeat].seat_number, data).then((repsonse) => {
                if (repsonse.data.success) {
                    let updated = [...seatsArr];
                    updated[currentSeat] = repsonse.data.data.seat;
                    setSeatsArr(updated);
                }
                toast.success("edited succesfully");
                setNote("");
                setCurrentSeat(-1);
                setSeatModalIsOpen(false);
            }).catch(() => { })
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            'plate_number': platenumber,
            'capacity': capacity,
            'model': model,
            'seats': seats,
            'bus_category_id': busCategoryId,
        };
        // updating
        if (currentIndex != -1) {
            ApiClient.patch('admin/buses/' + buses[currentIndex].id, data).then((repsonse) => {
                if (repsonse.data.success) {
                    // refresh table
                    getTableElements();
                }
                toast.success("edited succesfully");
                resetStates();
                setModalIsOpen(false);
            }).catch(() => { })
        } else {
            //creating
            ApiClient.post('admin/buses', data).then((repsonse) => {
                if (repsonse.data.success) {
                    getTableElements();
                }
                toast.success("added succesfully");
                resetStates();
                setModalIsOpen(false);
            }).catch(() => { });
        }

    };

    return (
        <CCard>

            <CCardHeader>
                Buses
            </CCardHeader>
            <CCardBody>
                <CButton color="primary" onClick={() => addElement()}>Add Bus</CButton>
                <CModal className='overflow-hidden' visible={modalIsOpen} onClose={() => { setModalIsOpen(false); }} backdrop="static">
                    <CModalHeader closeButton>
                        <CModalTitle>Bus</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Plate Number:</label>
                                <CFormInput value={platenumber} onChange={e => setPlatenumber(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label>Model:</label>
                                <CFormInput value={model} onChange={e => setModel(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <label>capacity:</label>
                                <CFormInput value={capacity} onChange={e => setCapacity(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <label>Seats:</label>
                                <CFormInput value={seats} onChange={e => setSeats(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <label>Bus Category:</label>
                                <CFormSelect
                                    value={busCategoryId}
                                    onChange={(e) => setBusCategoryId(e.target.value)}
                                    required
                                >
                                    <option value="">-- SELECT -- </option>
                                    {busCategories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </div>

                            {currentIndex !== -1 && <div className='position-relative seats-container d-flex flex-column' >
                                <h3>Seats</h3>
                                {seatsArr.map((seatRow, index) => (
                                    index % 4 === 0 && (
                                        <CRow className='seat-row' key={index}>
                                            {seatsArr.slice(index, index + 4).map((seat, ind) => (
                                                <CCol className='seat-box col-3' onClick={() => editSeat(index + ind)} key={seat.id}>
                                                    {seat.note != null ? (<CTooltip content={seat.note}>
                                                        <span>{seat.seat_number}</span>
                                                    </CTooltip>) : (seat.seat_number)}
                                                </CCol>
                                            ))}
                                        </CRow>
                                    )
                                ))}
                            </div>}

                            <div className='d-flex justify-content-center mt-4'>
                                <CButton color="primary" size='lg' type="submit">Save</CButton>
                            </div>
                        </form>
                    </CModalBody>
                </CModal>

                <CModal visible={seatModalIsOpen} onClose={() => { setSeatModalIsOpen(false); }} backdrop="static">
                    <CModalHeader closeButton>
                        <CModalTitle>Seats number {currentSeat != -1 && seatsArr[currentSeat].seat_number}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <form onSubmit={handleSeatUpdate}>


                            <div className='form-group'>
                                <label>Note:</label>
                                <CFormTextarea value={note} onChange={e => setNote(e.target.value)} />
                            </div>

                            <div className='d-flex justify-content-center mt-4'>
                                <CButton color="primary" size='lg' type="submit">Save</CButton>
                            </div>
                        </form>
                    </CModalBody>
                </CModal>

                <CTable striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Plate Number</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Model</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Capacity</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number Of Seats</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            buses.map((buses, index) => (
                                <CTableRow key={buses.id}>
                                    <CTableDataCell>{buses.id}</CTableDataCell>
                                    <CTableDataCell>{buses.plate_number}</CTableDataCell>
                                    <CTableDataCell>{buses.model}</CTableDataCell>
                                    <CTableDataCell>{buses.capacity}</CTableDataCell>
                                    <CTableDataCell>{buses.seats}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton color="success" className='mx-2' onClick={() => editElement(index)}>Edit</CButton>
                                        <CButton color="danger" className='mx-2' onClick={() => deleteElement(index)}>Delete</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))
                        }

                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard >
    );
}

export default buses;
