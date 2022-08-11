import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routeCollection from './collections/routeCollection';
import './App.css';
import Layout from './components/Layout/Layout';
// import { useSelector, useDispatch } from 'react-redux';
// import { setUser } from './features/userSlice';
// import { useEffect, useState } from 'react';

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
