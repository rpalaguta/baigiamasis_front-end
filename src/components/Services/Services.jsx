import React, { useEffect, useState } from "react";
import httpClient from "../../services/httpClient";
import './services.css';
import Service from "./Service";

const Services = () => {

    const [services, setServices] = useState(0)

    useEffect(() => {
        httpClient.get(`/service`)
      .then(res => {
        setServices(res.data);
      })
    }, [])

    console.log(services)

    if(!services) {
        return (
            <div style={{textAlign:'center'}}>
                <p>Loading data...</p>
            </div>
        )
    }
    console.log({ services })
    function renderServices(data) {
        return(
            data.map((service) => {
                return(
                    <Service 
                        title={service.name} 
                        description={service.description} 
                        author={service.author.name} 
                        authorId={service.author.id}
                    />
                )
            })
        )
    }

    return (
        <div className="services">
            {
                renderServices(services)
            }
        </div>
    )
}

export default Services;