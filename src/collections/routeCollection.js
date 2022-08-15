import AdminPanel from '../components/Admin/AdminPanel';
import Register from '../components/Auth/createUser';
import Login from '../components/Auth/Login';
import Home from '../components/Home/Home';
import ServiceDetails from '../components/Services/ServiceDetails';
import ServiceForm from '../components/Services/ServiceForm';
import Services from '../components/Services/Services';
import UserServices from '../components/Services/UserServices';

const routeCollection = [
  {
    path: '/',
    element: <Home />,
    name: 'Home',
    navBar: 'none',
    role: 'all',
  },
  {
    path: '/login',
    element: <Login />,
    name: 'Login',
    navBar: 'none',
    role: 'guest',
  },
  {
    path: '/services',
    element: <Services />,
    name: 'Services',
    navBar: 'all',
    role: 'all',
  },
  {
    path: '/register',
    element: <Register />,
    name: 'Register',
    navBar: 'guest',
    role: 'guest',
  },
  {
    path: '/services/add',
    element: <ServiceForm />,
    name: 'New Service',
    navBar: 'User',
    role: 'User',
  },
  {
    path: '/services/edit/:serviceId',
    element: <ServiceForm />,
    name: 'Edit Service',
    navBar: 'none',
    role: 'User',
  },
  {
    path: '/services/:serviceId',
    element: <ServiceDetails />,
    name: 'Service Details',
    navBar: 'none',
    role: 'all',
  },
  {
    path: '/services/my-services',
    element: <UserServices />,
    name: 'My Services',
    navBar: 'User',
    role: 'User',
  },
  {
    path: '/admin',
    element: <AdminPanel />,
    name: 'Admin Panel',
    navBar: 'Admin',
    role: 'Admin',
  },
  {
    path: '*',
    element: <Home />,
    name: 'Default path',
    navBar: 'none',
    role: 'all',
  },
];
// <Route path="*" element={<HomePage />}
export default routeCollection;
