import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './router/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import './scss/style.scss'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const AdminLayout = React.lazy(() => import('./layout/AdminLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))



class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={loading}>
          <AuthProvider>
            <Routes>
              <Route exact path="/admin/login" name="Login Page" element={<Login />} />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route path="/admin/*" name="Admin Pages" /*element={<ProtectedRoute guard={"admin"}*/ element={<AdminLayout />} />

            </Routes>
          </AuthProvider>
        </Suspense>
      </Router>
    )
  }
}

export default App
