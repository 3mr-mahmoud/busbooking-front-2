import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    CCard, CCardBody, CCardHeader, CTable, CTableHeaderCell,
    CTableRow,
    CTableHead,
    CTableBody,
    CTableDataCell, CModal, CModalBody, CModalHeader, CModalTitle, CButton, CFormInput, CFormTextarea,CFormCheck
} from '@coreui/react';
import ApiClient from 'src/ApiClient';
function Drivers() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [salary, setSalary] = useState('');
    const [nationalID, setNationalID] = useState('');
    const [license, setLicense] = useState('');
    const [city,setCity] = useState('');




    const getTableElements = () => {
        ApiClient.get('admin/drivers').then((repsonse) => {
            if (repsonse.data.success) {
                console.log(repsonse);
                setDrivers(repsonse.data.data.drivers);
            }
        });
    }

    useEffect(() => {
        getTableElements();
    }, []);



    const editElement = (index) => {
        setCurrentIndex(index);
        ApiClient.get('admin/drivers/' + drivers[index].id).then((repsonse) => {
            if (repsonse.data.success) {
                let driver = repsonse.data.data.driver;
                setName(driver.name);
                setEmail(driver.email);
                setPhone(driver.phone);
                setPassword(driver.password)
                setCity(driver.city);
                setLicense(driver.license);
                setNationalID(driver.nationalID);
                setSalary(driver.salary);
                setModalIsOpen(true);
            }
        });
    }


    const deleteElement = (index) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // If the user confirms, proceed with deletion
        if (isConfirmed) {
            ApiClient.delete('admin/drivers/' + drivers[index].id).then((response) => {
                if (response.data.success) {
                    const updated = [...drivers];
                    updated.splice(index, 1);
                    setDrivers(updated);
                    toast.success("deleted succesfully");
                }
            });
        }
    }

    const addElement = () => {
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setSalary("");
        setNationalID("");
        setLicense("");
        setCity("");
        setCurrentIndex(-1);
        setModalIsOpen(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // updating
        if (currentIndex != -1) {
            ApiClient.patch('admin/drivers/' + drivers[currentIndex].id, {
                'name': name,
                'email': email,
                'phone': phone,
                'salary': salary,
                'national_id':nationalID,
                'license_number':license,
                'city':city,
                'password':password
            }).then((repsonse) => {
                if (repsonse.data.success) {
                    // refresh table
                    getTableElements();
                }
                toast.success("edited succesfully");
                setName("");
                setEmail("");
                setPhone("");
                setPassword("");
                setSalary("");
                setNationalID("");
                setLicense("");
                setCity("");
                setCurrentIndex(-1);
                setModalIsOpen(false);
            }).catch((error) => {
                console.log(error);
                if (typeof error.response.data.errors === 'object') {
                    let errors = Object.values(error.response.data.errors).join("\n");
                    toast.error(errors);
                } else {
                    toast.error(error.response.data.errors);
                }
            })
        } else {
            //creating
            ApiClient.post('admin/drivers', {
                'name': name,
                'email': email,
                'phone': phone,
                'salary': salary,
                'national_id':nationalID,
                'license_number':license,
                'city':city,
                'password':password
            }).then((repsonse) => {
                if (repsonse.data.success) {
                    getTableElements();
                }
                toast.success("added succesfully");
                setName("");
                setEmail("");
                setPhone("");
                setPassword("");
                setSalary("");
                setNationalID("");
                setLicense("");
                setCity("");
                setCurrentIndex(-1);
                setModalIsOpen(false);
            }).catch((error) => {
                if (typeof error.response.data.errors === 'object') {
                    let errors = Object.values(error.response.data.errors).join("\n");
                    toast.error(errors);
                } else {
                    toast.error(error.response.data.errors);
                }
            });
        }

    };

    return (
        <CCard>

            <CCardHeader>
                Drivers
            </CCardHeader>
            <CCardBody>
                <CButton color="primary" onClick={() => addElement()}>Add Driver</CButton>
                <CModal visible={modalIsOpen} onClose={() => { setModalIsOpen(false); }}>
                    <CModalHeader closeButton>
                        <CModalTitle>Add Driver</CModalTitle>
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
                            <label>Salary:</label>
                                <CFormInput  value={salary} onChange={e => setSalary(e.target.value)} />
                            </div>

                            <div className='form-group'>
                            <label>National-ID:</label>
                                <CFormInput  value={nationalID} onChange={e => setNationalID(e.target.value)} />
                            </div>

                            <div className='form-group'>
                            <label>Licnense Number:</label>
                                <CFormInput  value={license} onChange={e => setLicense(e.target.value)} />
                            </div>

                            <div className='form-group'>
                            <label>City:</label>
                                <CFormInput  value={city} onChange={e => setCity(e.target.value)} />
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
                            <CTableHeaderCell scope="col">Salary</CTableHeaderCell>
                            <CTableHeaderCell scope="col">National-ID</CTableHeaderCell>
                            <CTableHeaderCell scope="col">City</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            drivers.map((driver, index) => (
                                <CTableRow key={driver.id}>
                                    <CTableDataCell>{driver.id}</CTableDataCell>
                                    <CTableDataCell>{driver.name}</CTableDataCell>
                                    <CTableDataCell>{driver.email}</CTableDataCell>
                                    <CTableDataCell>{driver.phone}</CTableDataCell>
                                    <CTableDataCell>{driver.salary}</CTableDataCell>
                                    <CTableDataCell>{driver.national_id}</CTableDataCell>
                                    <CTableDataCell>{driver.city}</CTableDataCell>

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

export default Drivers;
