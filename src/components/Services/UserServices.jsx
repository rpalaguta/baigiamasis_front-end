import React, { useState, useEffect } from "react";
import httpClient from '../../services/httpClient'
import userService from '../../services/userService'
import Service from "./Service";

const UserServices = () => {

    const user = userService.getLoggedInUser();
    // console.log(user)
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
        renderServices(services)
    )
}

export default UserServices;