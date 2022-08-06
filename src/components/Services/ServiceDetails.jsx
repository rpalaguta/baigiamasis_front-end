import React, {useState, useEffect, useCallback} from "react";
import { useParams } from "react-router-dom";
import httpClient from '../../services/httpClient'
import NewReview from "../Review/NewReview";
import Reviews from "../Review/Reviews";

const ServiceDetails = () => {
    const {serviceId} = useParams()
    const [service, setService] = useState(null)
    const [averageRating, setAverageRating] = useState(0)
    const [displayedRating, setDisplayedRating] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [key, setKey] = useState();

    useEffect(() => {
            httpClient.get(`service/${serviceId}`)
                .then(res => setService(res.data))
    }, [serviceId])

    useEffect(() => {
        setDisplayedRating(averageRating)
    }, [averageRating])

    if(!service) {
        return (
            <div style={{textAlign:'center'}}>
                <p>Loading data...</p>
            </div>
        )
    }

    const toggleNewReviewComponent = () => {
        setIsActive(!isActive);
    }

    const generateNewKey = () => {
        setKey(Math.random())
    }

    return (
        <>
        <div className="Card">
            <h3>{service.name}</h3>
            <h5>{service.author.name}</h5>
            <p>{service.description}</p>
            <p>Average rating: {displayedRating ? displayedRating : 'error'}</p>
            <div className='heroBtn' onClick={() => toggleNewReviewComponent()}>
                <p style={{margin: '0'}}>{`${isActive ? "Cancel" : "Leave a review"}`}</p>
            </div>
        </div>
        <div className="flex justifyBetween">
            <h2 style={{margin: 'auto'}}>Reviews</h2>
            
        </div>
        <div id='newReview' className={`Card ${isActive ? "" : "displayNone"}`}>
            <NewReview 
                onClose={toggleNewReviewComponent} 
                onSubmit={generateNewKey}
            />
        </div>
            <Reviews key={`${key}-reviews`} 
                serviceId={serviceId} 
                setAverageRating={setAverageRating}
            />          
        </>
    )
}

export default ServiceDetails;