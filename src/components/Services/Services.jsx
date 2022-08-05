import React, { useEffect, useState } from "react";
import httpClient from "../../services/httpClient";
import './services.css';
import Service from "./Service";
import { Link } from "react-router-dom";

const Services = () => {

    const [services, setServices] = useState(0)
    const [categories, setCategories] = useState(0)

    useEffect(() => {
        httpClient.get(`/service`)
            .then(res => {
                setServices(res.data);
            })
      httpClient.get(`/categories`)
        .then(res => {
            setCategories(res.data);
        })
    }, [])

    if(!services || !categories) {
        return (
            <div style={{textAlign:'center'}}>
                <p>Loading data...</p>
            </div>
        )
    }

    function handleOnChange (event) {
        const id = event.target.value
        switch (id) {
            case 'all':
                httpClient.get(`/service`)
                .then(res => {setServices(res.data)})
                break;
            default:
                httpClient.get(`categories/${id}/services`)
                .then(res => setServices(res.data))
                break;
        }
    }

    console.log(categories)

    function renderServices(data) {
        return(
            data.map((service, id) => {
                return(
                    <Service key={`${id}-service`} service={service}/>
                )
            })
        )
    }

    return (
        <div className="services">
            <div className="Card flex justifyBetween">
                <div className="mb-3">
                    <label htmlFor="category_id" className="form-label">Select Category: </label>
                    <select id="category_id" name="category_id" onChange={(e) => handleOnChange(e)} className="form-select" aria-label="Default select example">
                        <option value='all' className="dropdown-item">All Categories</option>
                        {
                            categories.map((category) => {
                                return <option key={`${category.id}_category`} value={category.id} className="dropdown-item">{category.name}</option>
                            })
                        }
                    </select>
                </div>
                <Link to='/services/add' className="heroBtn">Post your service</Link>
            </div>
            <div className="flex">
                <h2 style={{margin: 'auto'}}>Services</h2>
            </div>
            {
                renderServices(services)
            }
        </div>
    )
}

export default Services;
