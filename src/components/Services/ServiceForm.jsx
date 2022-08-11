import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import formValidation from "../../FormValidation";
import httpClient from '../../services/httpClient';
import { useSelector } from "react-redux";

const ServiceForm = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);

    const [categories, setCategories] = useState(0)
    const [formErrors, setFormErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        'name': '',
        'category_id': 1,
        'description': '',
        'author_id' : user.user_id
    })

    useEffect(() => {
        if(!categories && !isLoading) {
            setIsLoading(true)
            httpClient.get(`/categories`)
          .then(res => {
            setCategories(res.data);
          }).then(()=> {setIsLoading(false)})

        }
    }, [isLoading])

    useEffect(() => {
            if(serviceId) {
                httpClient.get(`service/${serviceId}`)
                    .then(res => setFormValues({
                        'name': res.data.name,
                        'category_id': res.data.category.id,
                        'description': res.data.description,
                        'user_id': res.data.author.id,
                    }))
            }
    },[serviceId])

    if(!categories) {
        return (
            <div style={{textAlign:'center'}}>
                <p>Loading data...</p>
            </div>
        )
    }

    function handleOnChange (event) {
        setFormValues({
            ...formValues,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(formValidation(formValues, 'service'))
        if (Object.keys(formErrors).length === 0) {
            if(!serviceId) {
                const response = await httpClient.post('/service', formValues);
                console.log(formValues)
                response.status === 200 ? navigate('/services', { replace: true }) : console.log('error');
            } else {
                const response = await httpClient.put(`/service/${serviceId}`, formValues);
                response.status === 200 ? navigate('/services/my-services', { replace: true }) : console.log('error');
            }
                
        }
    }

    return (
        <div key='create/edit form' className="Card">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Service name</label>
                    <input type="text" value={formValues.name} name="name" onChange={(e) => {handleOnChange(e)}} className="form-control" id="name"/>
                    <p style={{color: 'red'}}>{ formErrors.name }</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="category_id" className="form-label">Category</label>
                    <select id="category_id" name="category_id" onChange={(e) => handleOnChange(e)} className="form-select" aria-label="Default select example">
                            {
                                categories.map((category) => {
                                    return <option key={`${category.id}_category`} value={category.id} className="dropdown-item">{category.name}</option>
                                })
                            }
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea name="description" value={formValues.description} onChange={(e) => {handleOnChange(e)}} className="form-control" id="description"/>
                    <p style={{color: 'red'}}>{ formErrors.description }</p>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to='/services'>Go Back</Link>
                </form>
        </div>
    )
}

export default ServiceForm;