import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routeCollection from './collections/routeCollection';
import './App.css';
import Layout from './components/Layout/Layout';
import NewService from './components/Services/newService';

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
              <Route path='/new_service' element={<NewService />} />  
            </Route>
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
