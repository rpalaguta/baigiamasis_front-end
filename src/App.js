import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routeCollection from './collections/routeCollection';
import './App.css';
import Layout from './components/Layout/Layout';
import { useEffect, useMemo } from 'react';
import httpClient, { setAuthToken } from './services/httpClient';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './features/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const routes = useMemo(() => {
    return routeCollection.filter((route) => {
      if (!user && (route.role === 'guest' || route.role === 'all')) {
        return true;
      } else if (user && route.role !== 'guest') {
        return true;
      }
    });
  }, [user]);
  const setUser = async (token) => {
    //Jei yra token, settinam į axios headerį
    //Requestinam user duomenis ir išsaugom į Redux
    setAuthToken(token);
    const response = await httpClient.post('/auth/current-user');
    dispatch(
      login({
        user_id: response.data.user_id,
        name: response.data.name,
        role: response.data.role.name,
      })
    );
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token);
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            <Route path="/" element={<Layout />}>
              {routes.map((route, id) => (
                <Route key={`${id}-routes`} path={route.path} element={route.element} />
              ))}
            </Route>
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
