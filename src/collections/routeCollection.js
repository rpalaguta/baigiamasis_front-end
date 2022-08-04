import Register from "../components/Auth/createUser";
import Home from "../components/Home/Home";
import Services from "../components/Services/Services";

const routeCollection = [
    {path: '/', element: <Home />, name: 'Home' },
    {path: '/services', element: <Services />, name: 'Services' },
    {path: '/register', element: <Register />, name: 'Register' },
]

export default routeCollection;