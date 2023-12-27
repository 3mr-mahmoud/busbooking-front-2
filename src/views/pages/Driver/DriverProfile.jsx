import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    CCard, CCardBody, CCardHeader,
    CButton, CFormInput, CFormCheck
} from '@coreui/react';
import ApiClient from 'src/ApiClient';
import { useAuth } from 'src/contexts/AuthContext';
function Profile() {
    const { user: authUser, refreshData } = useAuth();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [nationalID, setNationalID] = useState('');
    const [license, setLicense] = useState('');
    const [city, setCity] = useState('');

    const [stations, setStations] = useState([]);
    const [checkedStations, setCheckedStations] = useState([]);


    const getStations = () => {
        ApiClient.get('driver/stations').then((repsonse) => {
            if (repsonse.data.success) {
                setStations(repsonse.data.data.stations);
            }
        });
    }

    useEffect(() => {
        getStations();
    }, []);

    const handleCheckChange = (station, isChecked) => {
        if (isChecked) {
            setCheckedStations([...checkedStations, station.id]);
        } else {
            setCheckedStations(checkedStations.filter(id => id !== station.id));
        }
    }

    useEffect(() => {
        setName(authUser.name);
        setEmail(authUser.email);
        setPhone(authUser.phone);
        setCity(authUser.city);
        setLicense(authUser.license_number);
        setNationalID(authUser.national_id);
        setCheckedStations(authUser.preferred_stations.map(station => station.station_id));
        setPassword("");
    }, [authUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // updating
        ApiClient.patch('driver/profile', {
            'name': name,
            'email': email,
            'phone': phone,
            'national_id': nationalID,
            'license_number': license,
            'city': city,
            'password': password,
            'stations': checkedStations
        }).then((repsonse) => {
            if (repsonse.data.success) {
                // refresh user data
                refreshData();
            }
            toast.success("edited succesfully");
        }).catch(() => { })

    };

    return (
        <CCard>

            <CCardHeader>
                Profile
            </CCardHeader>
            <CCardBody>
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
                        <CFormInput type='password' value={password} onChange={e => setPassword(e.target.value)} autoComplete='off' />
                    </div>

                    <div className='form-group'>
                        <label>National-ID:</label>
                        <CFormInput value={nationalID} onChange={e => setNationalID(e.target.value)} />
                    </div>

                    <div className='form-group'>
                        <label>Licnense Number:</label>
                        <CFormInput value={license} onChange={e => setLicense(e.target.value)} />
                    </div>

                    <div className='form-group'>
                        <label>City:</label>
                        <CFormInput value={city} onChange={e => setCity(e.target.value)} />
                    </div>

                    <div className='form-group'>
                        <label>Preferred Stations:</label>
                        {stations.map((station, index) => (
                            <CFormCheck
                                key={index}
                                id={`checkbox${index}`}
                                label={station.name}
                                checked={checkedStations.includes(station.id)}
                                onChange={(e) => {
                                    handleCheckChange(station, e.target.checked);
                                }}
                            />
                        ))}
                    </div>

                    <div className='d-flex justify-content-center mt-4'>
                        <CButton color="primary" size='lg' type="submit">Save</CButton>
                    </div>
                </form>
            </CCardBody>
        </CCard>
    );
}

export default Profile;
