import React, { useState, useEffect } from "react";
import  httpClient, { setAuthToken } from '../../services/httpClient';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        'email': '',
        'password': '',
    })

    const handleOnChange = async (event) => {
        setFormValues({
            ...formValues,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await httpClient.post('/auth/login', formValues)
        localStorage.setItem('user', JSON.stringify({
            user_id: response.data.user_id,
            name: response.data.name,
            token: response.data.token,
        }))
        setAuthToken(response.data.token);
        navigate('/services', { replace: true })
    }

    return (
        <div key='create/edit form' className="Card" style={{maxWidth: '500px'}}>
            <form onSubmit={(e) => handleSubmit(e)}>                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" value={formValues.email} name="email" onChange={(e) => {handleOnChange(e)}} className="form-control" id="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" onChange={(e) => {handleOnChange(e)}} className="form-control" id="password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">New here? <a href="/register">Register</a></label>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <Link className="btn btn-danger" to='/'>Cancel</Link>
            </form>
        </div>
    )
}

export default Login;