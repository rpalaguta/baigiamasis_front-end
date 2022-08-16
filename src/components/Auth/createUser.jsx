import React, { useEffect, useState } from "react";
import  httpClient, { setAuthToken } from '../../services/httpClient';
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

const Register = () => {

    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const dispatch = useDispatch()
    const [formValues, setFormValues] = useState({
        'name': '',
        'email': '',
        'password': '',
        'role_id' : ''
    })
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if(redirect) {
            window.location.href = '/services'
        }
    }, [redirect])

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        }
    }, [formErrors])

    function handleOnChange (event) {
        setFormValues({
            ...formValues,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await httpClient.post('/auth/register', formValues)
        httpClient.post('/auth/register', formValues)
        if(response.status === 200) {
            dispatch(login({
                user_id: response.data.user_id,
                name: response.data.name,
                role: response.data.role.name,
                token: response.data.token,
            }))
            setAuthToken(response.data.token);
            window.dispatchEvent(new Event("storage"));
            Navigate('/services', { replace: true })
        }
    }

    return (
        <div key='create/edit form' className="Card" style={{maxWidth: '500px'}}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" value={formValues.name} name="name" onChange={(e) => {handleOnChange(e)}} className="form-control" id="name"/>
                </div>
                <p style={{color: 'red'}}>{ formErrors.name }</p>
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" value={formValues.email} name="email" onChange={(e) => {handleOnChange(e)}} className="form-control" id="email"/>
                </div>
                <p style={{color: 'red'}}>{ formErrors.email }</p>
                <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" onChange={(e) => {handleOnChange(e)}} className="form-control" id="password"/>
                </div>
                {/* {JSON.stringify(formValues)} */}

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to='/'>Go Back</Link>
                </form>
                <img src="" alt="" srcset="" />
        </div>
    )
}

export default Register;