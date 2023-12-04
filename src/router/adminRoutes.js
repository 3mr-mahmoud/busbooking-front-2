import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Admin/Home';
import Login from '../pages/Admin/Login';

const adminRoutes = [
    <Route path="/admin/login" element={<Login />} />,
    <Route path="/home" element={<ProtectedRoute guard='admin' component={<Home />} />} />
];
export default adminRoutes;