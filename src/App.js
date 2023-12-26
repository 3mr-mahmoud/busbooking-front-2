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
const AdminLayout = React.lazy(() => import('./layout/AdminLayout'))
const CustomerLayout = React.lazy(() => import('./layout/CustomerLayout'))

// Pages
const AdminLogin = React.lazy(() => import('./views/pages/Admin/Login/Login'))
const CustomerLogin = React.lazy(() => import('./views/pages/Customer/Login/Login'))
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
              <Route exact path="/customer/login" name="Customer Login" element={<CustomerLogin />} />
              <Route exact path="/admin/login" name="Admin Login" element={<AdminLogin />} />
              <Route exact path="/" name="Customer Register" element={<Register />} />
              <Route exact path="/customer/register" name="Customer Register" element={<Register />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route path="/admin/*" name="Admin Pages" element={<ProtectedRoute guard={"admin"} children={<AdminLayout />} />} />
              <Route path="/customer/*" name="Customer Pages" /*element={<ProtectedRoute guard={"admin"}*/ element={<ProtectedRoute guard={"customer"} children={<CustomerLayout />} />} />

            </Routes>
          </AuthProvider>
        </Suspense>
      </Router>
    )
  }
}

export default App
