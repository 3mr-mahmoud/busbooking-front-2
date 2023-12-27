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
import CIcon from '@coreui/icons-react';
import { cilChevronBottom, cilChevronTop, cilDelete, cilTrash } from '@coreui/icons';
function Routes() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [stations, setStations] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [selectedStationIndex, setSelectedStationIndex] = useState(null);
    const [checkedStations, setCheckedStations] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const [name, setName] = useState('');

    const addCheckedStation = (station) => {
        // Create a new Set with the existing items and the newly selected value
        if (selectedStationIndex) {
            setCheckedStations([...checkedStations, station]);
        }

        setSelectedStationIndex(null);
    }

    const removeCheckedStation = (station) => {
        // Create a new Set with the existing items and remove from it the selected value
        setCheckedStations(checkedStations.filter(_station => _station.id !== station.id));
    }

    const moveUp = (index) => {
        const newStations = [...checkedStations];
        [newStations[index - 1], newStations[index]] = [newStations[index], newStations[index - 1]];
        setCheckedStations(newStations);
    }
    const moveDown = (index) => {
        const newStations = [...checkedStations];
        [newStations[index + 1], newStations[index]] = [newStations[index], newStations[index + 1]];
        setCheckedStations(newStations);
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
                setCheckedStations(route.stations);




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
        const orderedStations = checkedStations.map((ob, index) => ({ id: ob.id, order: index }))
        let data = {
            'name': name,
            'stations': orderedStations
        };
        // updating
        if (currentIndex != -1) {
            ApiClient.patch('admin/routes/' + routes[currentIndex].id, data).then((repsonse) => {
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
            ApiClient.post('admin/routes', data).then((repsonse) => {
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

                            <div className='input-group mt-3'>
                                <label className='me-2'>Stations </label>
                                <CFormSelect
                                    value={selectedStationIndex}
                                    onChange={(e) => setSelectedStationIndex(e.target.value)}
                                >
                                    <option value="">-- SELECT -- </option>
                                    {stations.map((station, index) => !checkedStations.map(ob => ob['id']).includes(station.id) ? (
                                        <option key={station.id} value={index}>
                                            {station.name}
                                        </option>
                                    ) : '')}
                                </CFormSelect>
                                <CButton color='primary' size='sm' onClick={() => addCheckedStation(stations[selectedStationIndex])}>add</CButton>
                            </div>
                            <div className='d-flex flex-column gap-3 mt-3'>

                                {checkedStations.map((station, index) => (
                                    <div key={index} className='d-flex justify-content-between'>
                                        <span className='w-50'>{station.name}</span>
                                        <div className='w-25'>
                                            {index != 0 &&
                                                <CButton size='sm' className='me-2' onClick={() => moveUp(index)}>
                                                    <CIcon icon={cilChevronTop}></CIcon>
                                                </CButton>
                                            }
                                            {index != checkedStations.length - 1 &&
                                                <CButton size='sm' onClick={() => moveDown(index)}>
                                                    <CIcon icon={cilChevronBottom}></CIcon>
                                                </CButton>
                                            }
                                        </div>
                                        <div className='w-25 text-end'>
                                            <CButton color='danger' size='sm' onClick={() => removeCheckedStation(station)} className='text-white'>
                                                <CIcon icon={cilTrash}></CIcon>
                                            </CButton>
                                        </div>
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
