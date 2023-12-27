import React, { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useAuth } from 'src/contexts/AuthContext';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { guard, authenticated, login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({
            email: email,
            password: password,
        }, 'driver');
    };

    useEffect(() => {
        // Use useEffect for navigation after login
        if (authenticated && guard == 'driver') {
            navigate('/driver/');
        }
    }, [guard, authenticated, navigate]);

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>

                                    <CForm>
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                value={password} onChange={e => setPassword(e.target.value)}
                                                required
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" onClick={e => handleSubmit(e)} className="px-4">
                                                    Login
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
            <ToastContainer />
        </div>
    )
}

export default Login
