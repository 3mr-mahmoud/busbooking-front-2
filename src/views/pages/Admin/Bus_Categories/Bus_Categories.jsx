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
function Bus_Categories() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checkedServices, setCheckedServices] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const [name, setName] = useState('');
    
    const handleCheckChange = (service, isChecked) => {
        if (isChecked) {
            setCheckedServices([...checkedServices, service.id]);
        } else {
            setCheckedServices(checkedServices.filter(id => id !== service.id));
        }
    }

    const getTableElements = () => {
        ApiClient.get('admin/bus-categories').then((repsonse) => {
            if (repsonse.data.success) {
                console.log(repsonse);
                setCategories(repsonse.data.data.bus_categories);
            }
        });
    }

    const getServices = () => {
        ApiClient.get('admin/services').then((repsonse) => {
            if (repsonse.data.success) {
                console.log(repsonse);
                setServices(repsonse.data.data.services);
            }
        });
    }

    




    useEffect(() => {
        getTableElements();
    }, []);

    useEffect(() => {
        getServices();
    }, [])



    const editElement = (index) => {
        setCurrentIndex(index);
        ApiClient.get('admin/bus-categories/' + categories[index].id).then((repsonse) => {
            if (repsonse.data.success) {
                let category = repsonse.data.data.bus_category;
                setName(category.name);
                
                setCheckedServices(category.services.map(service => service.id));
                
                setModalIsOpen(true);
            }
        });
    }


    const deleteElement = (index) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // If the user confirms, proceed with deletion
        if (isConfirmed) {
            ApiClient.delete('admin/bus-categories/' + categories[index].id).then((response) => {
                if (response.data.success) {
                    const updated = [...categories];
                    updated.splice(index, 1);
                    setCategories(updated);
                    toast.success("deleted succesfully");
                }
            }).catch(() => { });
        }
    }

    const addElement = () => {
        setName("");
        setCheckedServices([]);
        setCurrentIndex(-1);
        setModalIsOpen(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // updating
        if (currentIndex != -1) {
            ApiClient.patch('admin/bus-categories/' + categories[currentIndex].id, {
                'name': name,
                'services': checkedServices
                
            }).then((repsonse) => {
                if (repsonse.data.success) {
                    // refresh table
                    getTableElements();
                }
                toast.success("edited succesfully");
                setName("");
                setCheckedServices([]);
                setCurrentIndex(-1);
                setModalIsOpen(false);
            }).catch(() => { })
        } else {
            //creating
            ApiClient.post('admin/bus-categories', {
                'name': name,
                'services': checkedServices

            }).then((repsonse) => {
                if (repsonse.data.success) {
                    getTableElements();
                }
                toast.success("added succesfully");
                setName("");
                setCheckedServices([]);

                setCurrentIndex(-1);
                setModalIsOpen(false);
            }).catch(() => { });
        }

    };

    return (
        <CCard>

            <CCardHeader>
                Categories
            </CCardHeader>
            <CCardBody>
                <CButton color="primary" onClick={() => addElement()}>Add Category</CButton>
                <CModal visible={modalIsOpen} onClose={() => { setModalIsOpen(false); }}>
                    <CModalHeader closeButton>
                        <CModalTitle>Add Category</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Name:</label>
                                <CFormInput value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div>
        {services.map((service, index) => (
            <CFormCheck 
                key={index}
                id={`checkbox${index}`}
                label={service.name}
                checked={checkedServices.includes(service.id)}
                onChange={(e) => {
                    handleCheckChange(service, e.target.checked);
                }}
            />
        ))}
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
                            
                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                            
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            categories.map((category, index) => (
                                <CTableRow key={category.id}>
                                    <CTableDataCell>{category.name}</CTableDataCell>     
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

export default Bus_Categories;
