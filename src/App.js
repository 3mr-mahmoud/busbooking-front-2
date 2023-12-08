import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './router/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import './scss/style.scss'
import AdminHome from './views/pages/AdminHome/AdminHome'
import ViewStations from './views/pages/AdminHome/ViewStation/ViewStation'
import AddStation from './views/pages/AdminHome/AddStation/AddStation'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

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
              <Route path="/admin/home" name="Home" /*element={<ProtectedRoute guard={"admin"}*/ element={<AdminHome />} />
              <Route path="/admin/ViewStations" name="View Stations" element = {<ViewStations/>}/>
              <Route path="/admin/AddStation" name="Add Station" element = {<AddStation/>}/>

            </Routes>
          </AuthProvider>
        </Suspense>
      </Router>
    )
  }
}

export default App
