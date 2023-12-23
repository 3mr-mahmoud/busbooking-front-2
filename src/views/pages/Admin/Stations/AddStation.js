import React, { useState } from 'react'
import { CForm, CFormLabel, CFormInput, CButton, CCard, CCardBody } from '@coreui/react';

const AddStation = () => {
  const [stationName, setStationName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Station Name:', stationName);
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="stationName">Station Name</CFormLabel>
              <CFormInput type="text" id="stationName" placeholder="Enter station name" />
            </div>
            <CButton type="submit" color="primary">Create Station</CButton>
          </CForm>
        </CCardBody>
      </CCard>

    </>
  )
}

export default AddStation
