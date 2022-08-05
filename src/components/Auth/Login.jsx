import React, { useState, useEffect } from "react";
import  httpClient, { setAuthToken } from '../../services/httpClient';
import { Link } from "react-router-dom";

const Login = () => {

    const [formValues, setFormValues] = useState({
        'email': '',
        'password': '',
    })

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if(redirect) {
            window.location.href = '/services'
        }
    }, [redirect])

    function handleOnChange (event) {
        setFormValues({
            ...formValues,
            [event.target.name] : event.target.value
        })
    }

    function handleSubmit (e) {
        e.preventDefault();
        httpClient.post('/auth/login', formValues)
        .then(res => {
            localStorage.setItem('user', JSON.stringify({
                user_id: res.data.user_id,
                name: res.data.name,
                token: res.data.token,
            }))
            setAuthToken(res.data.token);
            setRedirect(true);
            })
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