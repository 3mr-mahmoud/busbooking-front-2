import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    CCard, CCardBody, CCardHeader, CTable, CTableHeaderCell,
    CTableRow,
    CTableHead,
    CTableBody,
    CTableDataCell, CModal, CModalBody, CModalHeader, CModalTitle, CButton, CFormInput, CFormTextarea, CFormCheck, CFormSelect
} from '@coreui/react';
import ApiClient from 'src/ApiClient';
function Routes() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [stations, setStations] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [checkedStations, setCheckedStations] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const [name, setName] = useState('');
    
    const handleCheckChange = (station, isChecked) => {
        if (isChecked) {
            setCheckedStations([...checkedStations, station.id]);
        } else {
            setCheckedStations(checkedStations.filter(id => id !== station.id));
        }
    }

    const getTableElements = () => {
        ApiClient.get('admin/routes').then((repsonse) => {
            if (repsonse.data.success) {
                console.log(repsonse);
                setRoutes(repsonse.data.data.routes);
            }
        });
    }

    const getStations = () => {
        ApiClient.get('admin/stations').then((repsonse) => {
            if (repsonse.data.success) {
                console.log(repsonse);
                setStations(repsonse.data.data.stations);
            }
        });
    }

    




    useEffect(() => {
        getTableElements();
    }, []);

    useEffect(() => {
        getStations();
    }, [])



    const editElement = (index) => {
        setCurrentIndex(index);
        ApiClient.get('admin/routes/' + routes[index].id).then((repsonse) => {
            if (repsonse.data.success) {

                let route = repsonse.data.data.route;
                setName(route.name);
                
                setCheckedStations(route.stations.map(station => station.id));

                

                
                setModalIsOpen(true);
            }
        });
    }


    const deleteElement = (index) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // If the user confirms, proceed with deletion
        if (isConfirmed) {
            ApiClient.delete('admin/routes/' + routes[index].id).then((response) => {
                if (response.data.success) {
                    const updated = [...routes];
                    updated.splice(index, 1);
                    setRoutes(updated);
                    toast.success("deleted succesfully");
                }
            }).catch(() => { });
        }
    }

    const addElement = () => {
        setName("");
        setCheckedStations([]);
        setCurrentIndex(-1);
        setModalIsOpen(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // updating
        if (currentIndex != -1) {
            ApiClient.patch('admin/routes/' + routes[currentIndex].id, {
                'name': name,
                'stations': checkedStations
                
            }).then((repsonse) => {
                if (repsonse.data.success) {
                    // refresh table
                    getTableElements();
                }
                toast.success("edited succesfully");
                setName("");
                setCheckedStations([]);
                setCurrentIndex(-1);
                setModalIsOpen(false);
            }).catch(() => { })
        } else {
            //creating
            ApiClient.post('admin/routes', {
                'name': name,
                'stations': checkedStations

            }).then((repsonse) => {
                if (repsonse.data.success) {
                    getTableElements();
                }
                toast.success("added succesfully");
                setName("");
                setCheckedStations([]);

                setCurrentIndex(-1);
                setModalIsOpen(false);
            }).catch(() => { });
        }

    };

    return (
        <CCard>

            <CCardHeader>
                Routes
            </CCardHeader>
            <CCardBody>
                <CButton color="primary" onClick={() => addElement()}>Add Route</CButton>
                <CModal visible={modalIsOpen} onClose={() => { setModalIsOpen(false); }}>
                    <CModalHeader closeButton>
                        <CModalTitle>Add Route</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Name:</label>
                                <CFormInput value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div>
    {stations.map((station, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <CFormCheck 
                id={`checkbox${index}`}
                label={station.name}
                checked={checkedStations.includes(station.id)}
                onChange={(e) => {
                    handleCheckChange(station, e.target.checked);
                }}
            />
            {checkedStations.includes(station.id) && (
                <CFormSelect 
                    aria-label="Default select example"
                    style={{ marginLeft: '10px', marginTop: '10px',width: '75px' }} // Adjust the size and margin as needed
                    onChange={(e) => {
                        handleOrderChange(station, e.target.value);
                    }}
                >
                    {[...Array(checkedStations.length)].map((_, i) => (
                        <option key={i} value={i+1}>{i+1}</option>
                    ))}
                </CFormSelect>
            )}
        </div>
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
                            <CTableHeaderCell scope="col">ID</CTableHeaderCell>

                            
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            routes.map((route, index) => (
                                <CTableRow key={route.id}>
                                    <CTableDataCell>{route.name}</CTableDataCell> 
                                    <CTableDataCell>{route.id}</CTableDataCell> 

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

export default Routes;
