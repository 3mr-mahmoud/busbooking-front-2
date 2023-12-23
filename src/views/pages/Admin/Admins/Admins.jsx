import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    CCard, CCardBody, CCardHeader, CTable, CTableHeaderCell,
    CTableRow,
    CTableHead,
    CTableBody,
    CTableDataCell, CModal, CModalBody, CModalHeader, CModalTitle, CButton, CFormInput, CFormTextarea, CFormCheck
} from '@coreui/react';
import ApiClient from 'src/ApiClient';
function Admins() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [superAd, setSuper] = useState('');


    const getTableElements = () => {
        ApiClient.get('admin/admins').then((repsonse) => {
            if (repsonse.data.success) {
                console.log(repsonse);
                setAdmins(repsonse.data.data.admins);
            }
        });
    }

    useEffect(() => {
        getTableElements();
    }, []);


    const resetStates = () => {
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setCurrentIndex(-1);
    }

    const editElement = (index) => {
        setCurrentIndex(index);
        ApiClient.get('admin/admins/' + admins[index].id).then((repsonse) => {
            if (repsonse.data.success) {
                let admin = repsonse.data.data.admin;
                setName(admin.name);
                setEmail(admin.email);
                setPhone(admin.phone);
                setSuper(admin.superAd)
                setPassword("");
                setModalIsOpen(true);
            }
        });
    }


    const deleteElement = (index) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // If the user confirms, proceed with deletion
        if (isConfirmed) {
            ApiClient.delete('admin/admins/' + admins[index].id).then((response) => {
                if (response.data.success) {
                    const updated = [...admins];
                    updated.splice(index, 1);
                    setAdmins(updated);
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
            ApiClient.patch('admin/admins/' + admins[currentIndex].id, {
                'name': name,
                'email': email,
                'phone': phone,
                'superadmin': superAd
                'password': password
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
            ApiClient.post('admin/admins', {
                'name': name,
                'email': email,
                'phone': phone,
                'password': password,
                'superadmin': superAd
            }).then((repsonse) => {
                if (repsonse.data.success) {
                    getTableElements();
                }
                toast.success("added succesfully");
                resetStates();
                setModalIsOpen(false);
            }).catch(() => { })
        }

    };

    return (
        <CCard>

            <CCardHeader>
                Admins
            </CCardHeader>
            <CCardBody>
                <CButton color="primary" onClick={() => addElement()}>Add Admin</CButton>
                <CModal visible={modalIsOpen} onClose={() => { setModalIsOpen(false); }} backdrop="static">
                    <CModalHeader closeButton>
                        <CModalTitle>Admin</CModalTitle>
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
                                <label>Email:</label>
                                <CFormInput value={email} onChange={e => setEmail(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <label>Password:</label>
                                <CFormInput type='password' value={password} onChange={e => setPassword(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <CFormCheck id="flexCheckDefault" value={superAd} onChange={e => setSuper(e.target.checked)} style={{ marginTop: '7px' }} label="Super Admin" />
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
                            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            admins.map((admin, index) => (
                                <CTableRow key={admin.id}>
                                    <CTableDataCell>{admin.id}</CTableDataCell>
                                    <CTableDataCell>{admin.name}</CTableDataCell>
                                    <CTableDataCell>{admin.email}</CTableDataCell>
                                    <CTableDataCell>{admin.phone}</CTableDataCell>
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

export default Admins;
