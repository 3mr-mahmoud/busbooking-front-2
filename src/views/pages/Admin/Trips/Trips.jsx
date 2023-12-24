import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import {
    CCard, CCardBody, CCardHeader, CTable, CTableHeaderCell,
    CTableRow,
    CTableHead,
    CTableBody,
    CTableDataCell, CModal, CModalBody, CModalHeader, CModalTitle, CButton, CFormInput, CFormTextarea, CFormSelect
} from '@coreui/react';
import ApiClient from 'src/ApiClient';
function Trips() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [trips, setTrips] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [buses, setBuses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [selectedRoute, setSelectedRoute] = useState(0);
    const [selectedDriver, setSelectedDriver] = useState(0);
    const [selectedBus, setSelectedBus] = useState(0);
    const [departureTime, setDepartureTime] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [seats, setSeats] = useState(0);
    const [goldenSeatNumber, setGoldenSeatNumber] = useState(null);
    const [expectedDuration, setExpectedDuration] = useState('');



    const getTableElements = () => {
        ApiClient.get('admin/trips').then((repsonse) => {
            if (repsonse.data.success) {
                setTrips(repsonse.data.data.trips);
            }
        });
    }


    const getInitialData = () => {
        ApiClient.get('admin/routes').then((repsonse) => {
            if (repsonse.data.success) {
                setRoutes(repsonse.data.data.routes);
            }
        });

        ApiClient.get('admin/buses').then((repsonse) => {
            if (repsonse.data.success) {
                setBuses(repsonse.data.data.buses);
            }
        });

        ApiClient.get('admin/drivers').then((repsonse) => {
            if (repsonse.data.success) {
                setDrivers(repsonse.data.data.drivers);
            }
        });

        getTableElements();
    }

    useEffect(() => {
        getInitialData();
    }, []);


    const resetStates = () => {
        setSelectedRoute(0)
        setSelectedDriver(0)
        setSelectedBus(0)
        setDepartureTime(new Date())
        setPrice(0)
        setExpectedDuration("")
        setGoldenSeatNumber(null)
        setCurrentIndex(-1);
    }

    const editElement = (index) => {
        setCurrentIndex(index);
        ApiClient.get('admin/trips/' + trips[index].id).then((repsonse) => {
            if (repsonse.data.success) {
                let trip = repsonse.data.data.trip;
                setSelectedRoute(trip.route_id)
                setSelectedDriver(trip.driver_id)
                setSelectedBus(trip.bus_id)
                const busIndex = buses.findIndex(bus => bus.id === trip.bus_id);
                setSeats(buses[busIndex].seats)
                const parsedDate = moment(trip.departure_time, "YYYY-MM-DD HH:mm:ss").toDate();
                setDepartureTime(parsedDate)
                setPrice(trip.price)
                setExpectedDuration(trip.expected_duration)
                setGoldenSeatNumber(trip.golden_seat_number)
                setModalIsOpen(true);
            }
        });
    }

    const deleteElement = (index) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // If the user confirms, proceed with deletion
        if (isConfirmed) {
            ApiClient.delete('admin/trips/' + trips[index].id).then((response) => {
                if (response.data.success) {
                    const updated = [...trips];
                    updated.splice(index, 1);
                    setTrips(updated);
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
        let data = {
            'route_id': selectedRoute,
            'driver_id': selectedDriver,
            'bus_id': selectedBus,
            'departure_time': moment(departureTime).format("YYYY-MM-DD HH:mm:ss"),
            'price': price,
            'expected_duration': expectedDuration,
            'golden_seat_number': goldenSeatNumber,
        };
        // updating
        if (currentIndex != -1) {
            ApiClient.patch('admin/trips/' + trips[currentIndex].id, data).then((repsonse) => {
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
            ApiClient.post('admin/trips', data).then((repsonse) => {
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
                Trips
            </CCardHeader>
            <CCardBody>
                <CButton color="primary" onClick={() => addElement()}>Add Trip</CButton>
                <CModal visible={modalIsOpen} onClose={() => { setModalIsOpen(false); }} backdrop="static">
                    <CModalHeader closeButton>
                        <CModalTitle>Trip</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Bus:</label>
                                <CFormSelect
                                    value={selectedBus}
                                    onChange={(e) => {
                                        setSelectedBus(e.target.value)
                                        setSeats(e.target[e.target.selectedIndex].getAttribute('data-seats'));
                                    }
                                    }
                                    required
                                >
                                    <option value="">-- SELECT -- </option>
                                    {buses.map((bus) => (
                                        <option key={bus.id} data-seats={bus.seats} value={bus.id}>
                                            {bus.plate_number}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </div>

                            <div className='form-group'>
                                <label>Route:</label>
                                <CFormSelect
                                    value={selectedRoute}
                                    onChange={(e) => setSelectedRoute(e.target.value)}
                                    required
                                >
                                    <option value="">-- SELECT -- </option>
                                    {routes.map((route) => (
                                        <option key={route.id} value={route.id}>
                                            {route.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </div>

                            <div className='form-group'>
                                <label>Driver:</label>
                                <CFormSelect
                                    value={selectedDriver}
                                    onChange={(e) => setSelectedDriver(e.target.value)}
                                    required
                                >
                                    <option value="">-- SELECT -- </option>
                                    {drivers.map((driver) => (
                                        <option key={driver.id} value={driver.id}>
                                            {driver.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </div>


                            <div className='form-group'>
                                <label>Departure Time:</label>
                                <Datetime
                                    value={departureTime}
                                    onChange={(date) => setDepartureTime(date)}
                                />
                            </div>

                            <div className='form-group'>
                                <label>Price:</label>
                                <CFormInput value={price} onChange={e => setPrice(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <label>Expected Duration:</label>
                                <CFormInput value={expectedDuration} onChange={e => setExpectedDuration(e.target.value)} />
                            </div>


                            <div className='form-group'>
                                <label>Golden Seat Number:</label>
                                <CFormSelect
                                    value={goldenSeatNumber}
                                    onChange={(e) => setGoldenSeatNumber(e.target.value)}

                                >
                                    <option value="">-- SELECT -- </option>
                                    {Array.from({ length: seats }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </CFormSelect>
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
                            <CTableHeaderCell scope="col">Route Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Departure Time</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Driver Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Actual Departure Time</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Arrival Time</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            trips.map((trip, index) => (
                                <CTableRow key={trip.id}>
                                    <CTableDataCell>{trip.id}</CTableDataCell>
                                    <CTableDataCell>{trip.route_name}</CTableDataCell>
                                    <CTableDataCell>{trip.departure_time}</CTableDataCell>
                                    <CTableDataCell>{trip.driver_name}</CTableDataCell>
                                    <CTableDataCell>{trip.price}</CTableDataCell>
                                    <CTableDataCell>{trip.actual_departure_time}</CTableDataCell>
                                    <CTableDataCell>{trip.arrival_time}</CTableDataCell>
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

export default Trips;
