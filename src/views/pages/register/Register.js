import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFormInput,
  CRow,
} from '@coreui/react'
import { useAuth } from 'src/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import ApiClient from 'src/ApiClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { authenticated, guard, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // updating
    ApiClient.post('customer/register', {
      'name': name,
      'email': email,
      'phone': phone,
      'password_confirmation': passwordConfirmation,
      'password': password
    }).then((repsonse) => {
      if (repsonse.data.success) {
        login({
          'email': email,
          'password': password
        }, "customer");
      }
      toast.success("edited succesfully");
    }).catch(() => { })

  };

  useEffect(() => {
    // Use useEffect for navigation after login
    if (authenticated && guard == 'customer') {
      navigate('/customer');
    }
  }, [authenticated, guard, navigate]);


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <form onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <div className='form-group'>
                    <label>Name:</label>
                    <CFormInput value={name} onChange={e => setName(e.target.value)} required />
                  </div>
                  <div className='form-group'>
                    <label>Phone:</label>
                    <CFormInput value={phone} onChange={e => setPhone(e.target.value)} autoComplete={false} required />
                  </div>

                  <div className='form-group'>
                    <label>Email:</label>
                    <CFormInput value={email} onChange={e => setEmail(e.target.value)} autoComplete={false} required />
                  </div>

                  <div className='form-group'>
                    <label>Password:</label>
                    <CFormInput type='password' value={password} onChange={e => setPassword(e.target.value)} autoComplete={false} required />
                  </div>
                  <div className='form-group'>
                    <label>Password Confirmation:</label>
                    <CFormInput type='password' value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} autoComplete={false} required />
                  </div>



                  <div className='d-flex justify-content-between mt-4'>
                    <CButton color="primary" size='lg' type="submit">Register</CButton>
                    <Link to={'/customer/login'} className='text-primary'>Login</Link>
                  </div>

                </form>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  )
}

export default Register
