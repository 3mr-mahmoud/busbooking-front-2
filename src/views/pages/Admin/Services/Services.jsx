import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    CCard, CCardBody, CCardHeader, CTable, CTableHeaderCell,
    CTableRow,
    CTableHead,
    CTableBody,
    CTableDataCell, CModal, CModalBody, CModalHeader, CModalTitle, CButton, CFormInput, CFormTextarea,CFormSelect
} from '@coreui/react';
import ApiClient from 'src/ApiClient';
function services() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [services, setServices] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [name, setName] = useState('');
    
    const getTableElements = () => {
        ApiClient.get('admin/services').then((repsonse) => {
            if (repsonse.data.success) {
                setServices(repsonse.data.data.services);
            }
        });
    }

    useEffect(() => {
        getTableElements();
    }, []);


    const resetStates = () => {
        setName(""); 
        setCurrentIndex(-1);
    }


    const editElement = (index) => {
        setCurrentIndex(index);
        ApiClient.get('admin/services/' + services[index].id).then((repsonse) => {
            if (repsonse.data.success) {
                let service = repsonse.data.data.service;
                setName(service.name); 
                setModalIsOpen(true);
            }
        });
    }


    const deleteElement = (index) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // If the user confirms, proceed with deletion
        if (isConfirmed) {
            ApiClient.delete('admin/services/' + services[index].id).then((response) => {
                if (response.data.success) {
                    const updated = [...services];
                    updated.splice(index, 1);
                    setServices(updated);
                    toast.success("deleted succesfully");
                }
            }).catch(() => { });
        }
    }

    const addElement = () => {
        resetStates();
        setModalIsOpen(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // updating
        if (currentIndex != -1) {
            ApiClient.patch('admin/services/' + services[currentIndex].id, {
                'name': name ,
            }).then((repsonse) => {
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
            ApiClient.post('admin/services', {
                'name': name ,
                
            }).then((repsonse) => {
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
            Services
            </CCardHeader>
            <CCardBody>
                <CButton color="primary" onClick={() => addElement()}>Add Services</CButton>
                <CModal visible={modalIsOpen} onClose={() => { setModalIsOpen(false); }} backdrop="static">
                    <CModalHeader closeButton>
                        <CModalTitle>Services</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Name:</label>
                                <CFormInput value={name} onChange={e => setName(e.target.value)} required />
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
                      
                            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            services.map((services, index) => (
                                <CTableRow key={services.id}>
                                    <CTableDataCell>{services.id}</CTableDataCell>
                                    <CTableDataCell>{services.name}</CTableDataCell>
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

export default services;
