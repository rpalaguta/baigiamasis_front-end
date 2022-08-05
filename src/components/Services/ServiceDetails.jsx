import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import httpClient from '../../services/httpClient'
import NewReview from "../Review/NewReview";
import Review from "../Review/Review";

const ServiceDetails = () => {
    const {serviceId} = useParams()
    const [service, setService] = useState(null)
    const [reviews, setReviews] = useState(null)
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
            httpClient.get(`service/${serviceId}`)
                .then(res => setService(res.data))
            httpClient.get(`/service/${serviceId}/reviews`)
                .then(res => setReviews(res.data))
    }, [serviceId])

    if(!service || !reviews) {
        return (
            <div style={{textAlign:'center'}}>
                <p>Loading data...</p>
            </div>
        )
    }

    console.log(reviews)

    const averageRating = () => {
        let totalRating = 0
        let ratingCount = 0
        if(Object.keys(reviews).length !== 0) {
            reviews.map((review) => (
                totalRating += review.rating,
                ratingCount ++
            ))
            
            let avgRating = Math.round((totalRating / ratingCount) * 10) / 10
            return `${avgRating} / 5`
        }
        return 'Not yet rated'
    }

    const toggleNewReviewComponent = () => {
        setIsActive(!isActive);
    }

    // console.log(service.reviews)
    return (
        <>
        <div className="Card">
            <h3>{service.name}</h3>
            <h5>{service.author.name}</h5>
            <p>{service.description}</p>
            <p>Average rating: {averageRating()}</p>
            <div className='heroBtn' onClick={() => toggleNewReviewComponent()}>
                <p style={{margin: '0'}}>{`${isActive ? "Cancel" : "Leave a review"}`}</p>
            </div>
        </div>
        <div className="flex justifyBetween">
            <h2 style={{margin: 'auto'}}>Reviews</h2>
            
        </div>
        <div id='newReview' className={`Card ${isActive ? "" : "displayNone"}`}><NewReview onClose={toggleNewReviewComponent}/></div>
            {
                reviews.map((review, id) => (
                    <Review key={`${id}-review`} review={review}></Review>
                ))
            }
        </>
    )
}

export default ServiceDetails;