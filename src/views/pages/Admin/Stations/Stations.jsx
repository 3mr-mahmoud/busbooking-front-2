import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    CCard, CCardBody, CCardHeader, CTable, CTableHeaderCell,
    CTableRow,
    CTableHead,
    CTableBody,
    CTableDataCell, CModal, CModalBody, CModalHeader, CModalTitle, CButton, CFormInput, CFormTextarea
} from '@coreui/react';
import ApiClient from 'src/ApiClient';
function Stations() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [stations, setStations] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const getTableElements = () => {
        ApiClient.get('admin/stations').then((repsonse) => {
            if (repsonse.data.success) {
                setStations(repsonse.data.data.stations);
            }
        });
    }

    useEffect(() => {
        getTableElements();
    }, []);



    const editElement = (index) => {
        setCurrentIndex(index);
        ApiClient.get('admin/stations/' + stations[index].id).then((repsonse) => {
            if (repsonse.data.success) {
                let station = repsonse.data.data.station;
                setName(station.name);
                setDescription(station.description);
                setPhone(station.phone);
                setModalIsOpen(true);
            }
        });
    }


    const deleteElement = (index) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // If the user confirms, proceed with deletion
        if (isConfirmed) {
            ApiClient.delete('admin/stations/' + stations[index].id).then((response) => {
                if (response.data.success) {
                    const updated = [...stations];
                    updated.splice(index, 1);
                    setStations(updated);
                    toast.success("deleted succesfully");
                }
            }).catch(() => { });
        }
    }

    const addElement = () => {
        setName("");
        setDescription("");
        setPhone("");
        setCurrentIndex(-1);
        setModalIsOpen(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // updating
        if (currentIndex != -1) {
            ApiClient.patch('admin/stations/' + stations[currentIndex].id, {
                'name': name,
                'description': description,
                'phone': phone,
            }).then((repsonse) => {
                if (repsonse.data.success) {
                    // refresh table
                    getTableElements();
                }
                toast.success("edited succesfully");
                setDescription('');
                setName('');
                setPhone('');
                setCurrentIndex(-1);
                setModalIsOpen(false);
            }).catch(() => { })
        } else {
            //creating
            ApiClient.post('admin/stations', {
                'name': name,
                'description': description,
                'phone': phone,
            }).then((repsonse) => {
                if (repsonse.data.success) {
                    setStations([...stations, repsonse.data.data.station]);
                }
                toast.success("added succesfully");
                setDescription('');
                setName('');
                setPhone('');
                setCurrentIndex(-1);
                setModalIsOpen(false);
            }).catch(() => { });
        }

    };

    return (
        <CCard>

            <CCardHeader>
                Stations
            </CCardHeader>
            <CCardBody>
                <CButton color="primary" onClick={() => addElement()}>Add Station</CButton>
                <CModal visible={modalIsOpen} onClose={() => { setModalIsOpen(false); }}>
                    <CModalHeader closeButton>
                        <CModalTitle>Add Station</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Name:</label>
                                <CFormInput value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label>Phone:</label>
                                <CFormInput value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <label>Description:</label>
                                <CFormTextarea value={description} onChange={e => setDescription(e.target.value)} />
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
                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            stations.map((station, index) => (
                                <CTableRow key={station.id}>
                                    <CTableDataCell>{station.id}</CTableDataCell>
                                    <CTableDataCell>{station.name}</CTableDataCell>
                                    <CTableDataCell>{station.description}</CTableDataCell>
                                    <CTableDataCell>{station.phone}</CTableDataCell>
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
        </CCard>
    );
}

export default Stations;
