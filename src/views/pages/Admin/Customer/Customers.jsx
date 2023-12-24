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
function Customers() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const [balance, setBalance] = useState("");




    const getTableElements = () => {
        ApiClient.get('admin/customers').then((repsonse) => {
            if (repsonse.data.success) {
                console.log(repsonse);
                setCustomers(repsonse.data.data.customers);
            }
        });
    }

    useEffect(() => {
        getTableElements();
    }, []);

    const resetStates = () => {
        setBalance("");
        setCurrentIndex(-1);
    }


    const editElement = (index) => {
        setCurrentIndex(index);
        ApiClient.get('admin/customers/' + customers[index].id).then((repsonse) => {
            if (repsonse.data.success) {
                let customer = repsonse.data.data.customer;
                setBalance(customer.balance)
                setModalIsOpen(true);
            }
        });
    }


    const deleteElement = (index) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // If the user confirms, proceed with deletion
        if (isConfirmed) {
            ApiClient.delete('admin/customers/' + customers[index].id).then((response) => {
                if (response.data.success) {
                    const updated = [...customers];
                    updated.splice(index, 1);
                    setCustomers(updated);
                    toast.success("deleted succesfully");
                }
            });
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // updating
        if (currentIndex != -1) {
            ApiClient.patch('admin/customers/' + customers[currentIndex].id, {
               'wallet_balance':balance
            }).then((repsonse) => {
                if (repsonse.data.success) {
                    // refresh table
                    getTableElements();
                }
                toast.success("edited succesfully");
                setBalance("");
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
        } 

    };

    return (
        <CCard>

            <CCardHeader>
                Customers
            </CCardHeader>
            <CCardBody>
                <CModal visible={modalIsOpen} onClose={() => { setModalIsOpen(false); }}>
                    <CModalHeader closeButton>
                    </CModalHeader>
                    <CModalBody>
                        <form onSubmit={handleSubmit}>
                            
                            
                            <div className='form-group'>
                            <label>Balance:</label>
                                <CFormInput  value={balance} onChange={e => setBalance(e.target.value)} />
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
                            <CTableHeaderCell scope="col">Wallet Balance</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            customers.map((customer, index) => (
                                <CTableRow key={customer.id}>
                                    <CTableDataCell>{customer.id}</CTableDataCell>
                                    <CTableDataCell>{customer.name}</CTableDataCell>
                                    <CTableDataCell>{customer.email}</CTableDataCell>
                                    <CTableDataCell>{customer.phone}</CTableDataCell>
                                    <CTableDataCell>{customer.wallet_balance}</CTableDataCell>

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

export default Customers;
