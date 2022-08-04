import React, { useEffect, useState } from "react";
import  httpClient, { setAuthToken } from '../../services/httpClient';
import { Link } from "react-router-dom";
import formValidation from "../../FormValidation";

const Register = () => {

    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [formValues, setFormValues] = useState({
        'name': '',
        'email': '',
        'password': '',
        'role_id' : ''
    })
  

    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues)
        }
    }, [formErrors])

    function handleOnChange (event) {
        setFormValues({
            ...formValues,
            [event.target.name] : event.target.value
        })
    }

    function handleSubmit (e) {
        e.preventDefault();

        httpClient.post('/auth/register', formValues)
        .then(res => {
            console.log({ res })
            localStorage.setItem('user', JSON.stringify({
                user_id: res.data.user_id,
                name: res.data.name,
                token: res.data.token,
            }))
            setAuthToken(res.data.token);
            //redirect
            })

        // setFormErrors(formValidation(formValues, 'register'))
        // setIsSubmit(true);
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
                <div className="mb-3">
                    <label htmlFor="role_id" className="form-label">id</label>
                    <input type="text" value={formValues.role_id} name="role_id" onChange={(e) => {handleOnChange(e)}} className="form-control" id="role_id"/>
                </div>
                {JSON.stringify(formValues)}

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to='/services'>Go Back</Link>
                </form>
        </div>
    )
}

export default Register;