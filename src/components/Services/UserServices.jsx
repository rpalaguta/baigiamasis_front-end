import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import httpClient from '../../services/httpClient'
import Service from "./Service";

const UserServices = () => {
    const user = useSelector((state) => state.user.value);

    const [services, setServices] = useState();

    useEffect(() => {
        httpClient.get(`service/my-services/${user.user_id}`)
            .then(res => setServices(res.data))
    }, [])

    if(!services) {
        return (
            <div className="Card">
                <p style={{margin: 'auto'}}>Loading data...</p>
            </div>
        )
    }

    const renderServices = (services) => {
        return Object.keys(services).map((id) => (
            <Service key={`${id}-service`} service={services[id]} buttons='true'/>
        ))

        // return services.map((service, id) => (
        //     <Service key={`${id}-service`} service={service}/>
        // ))
    }

    return (
        <div className="flex flexColumn">
            <h2 style={{margin: '40px auto'}}>My Services</h2>
            <div className="serviceCard">
                {
                    renderServices(services)
                }
            </div>
        </div>
    )
}

export default UserServices;