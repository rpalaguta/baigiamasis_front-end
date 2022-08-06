import Register from "../components/Auth/createUser";
import Login from "../components/Auth/Login";
import Home from "../components/Home/Home";
import ServiceDetails from "../components/Services/ServiceDetails";
import ServiceForm from "../components/Services/ServiceForm";
import Services from "../components/Services/Services";
import UserServices from "../components/Services/UserServices";

const routeCollection = [
    {path: '/', element: <Home />, name: 'Home', visible: 'none' },
    {path: '/login', element: <Login />, name: 'Login', visible: 'none'  },
    {path: '/services', element: <Services />, name: 'Services', visible: 'all' },
    {path: '/register', element: <Register />, name: 'Register', visible: 'guest'  },
    {path: '/services/add', element: <ServiceForm />, name: 'New Service', visible: 'user'  },
    {path: '/services/edit/:serviceId', element: <ServiceForm />, name: 'Edit Service', visible: 'none'  },
    {path: '/services/:serviceId', element: <ServiceDetails />, name: 'Service Details', visible: 'none'  },
    {path: '/services/my-services', element: <UserServices />, name: 'My Services', visible: 'user'  },
]

export default routeCollection;