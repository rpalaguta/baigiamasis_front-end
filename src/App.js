import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routeCollection from './collections/routeCollection';
import './App.css';
import Layout from './components/Layout/Layout';
import ServiceForm from './components/Services/ServiceForm';
import Login from './components/Auth/Login';
import ServiceDetails from './components/Services/ServiceDetails';

function App() {  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            <Route path='/' element={<Layout />}>
              {
                routeCollection.map((route, id) => (
                    <Route key={`${id}-routes`} path={route.path} element={route.element} />
                  ))
              }
            </Route>
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
