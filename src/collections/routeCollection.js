import Register from "../components/Auth/createUser";
import Home from "../components/Home/Home";
import Services from "../components/Services/Services";

const routeCollection = [
    {path: '/', element: <Home />, name: 'Home', hidden: '' },
    {path: '/services', element: <Services />, name: 'Services', hidden: '' },
    {path: '/register', element: <Register />, name: 'Register', hidden: 'user'  },
]

export default routeCollection;