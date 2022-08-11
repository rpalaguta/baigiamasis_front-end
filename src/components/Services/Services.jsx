import React, { useEffect, useState } from "react";
import httpClient from "../../services/httpClient";
import './services.css';
import Service from "./Service";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Services = () => {

    const [services, setServices] = useState(0)
    const [categories, setCategories] = useState(0)
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.value);
    console.log(user)

    useEffect(() => {
        const getServices = async () => {
            const response = await httpClient.get(`/service`)
            if(response.status !== 200) {
                return (
                    navigate('/', { replace: true })
                )
            }
            setServices(response.data);
        }
        getServices()
        const getCategories = async () => {
            const response = await httpClient.get(`/categories`)
            if(response.status !== 200) {
                return (
                    navigate('/', { replace: true })
                )
            }
            setCategories(response.data);
        }
        getCategories()
    //   httpClient.get(`/categories`)
    //     .then(res => {
    //         setCategories(res.data);
    //     })
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

    function renderServices(data) {
        return(
            <div className="serviceCard">
                {data.map((service, id) => {
                    return(
                        <Service key={`${id}-service`} service={service}/>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="services">
            <div className="Card content flex justifyBetween">
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
                {user ? <Link to='/services/add' className="heroBtn">Post your service</Link> : ''}
                
            </div>
            <div className="flex">
                <h2 style={{margin: '40px auto'}}>Services</h2>
            </div>
            {
                renderServices(services)
            }
        </div>
    )
}

export default Services;
