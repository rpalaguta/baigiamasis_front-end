import React, { useState } from 'react';
import httpClient, { setAuthToken } from '../../services/httpClient';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = async (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await httpClient.post('/auth/login', formValues);
    if (response) {
      dispatch(
        login({
          user_id: response.data.user_id,
          name: response.data.name,
          role: response.data.role.name,
        })
      );
      localStorage.setItem('token', response.data.token);
      setAuthToken(response.data.token);
      window.dispatchEvent(new Event('storage'));
      navigate('/services', { replace: true });
    }
  };

  return (
    <div key="create/edit form" className="Card" style={{ maxWidth: '500px' }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            value={formValues.email}
            name="email"
            onChange={(e) => {
              handleOnChange(e);
            }}
            className="form-control"
            id="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              handleOnChange(e);
            }}
            className="form-control"
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            New here? <a href="/register">Register</a>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <Link className="btn btn-danger" to="/">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default Login;
