import React, {useState, useEffect} from "react";
import httpClient from '../../services/httpClient'
import Review from "./Review";

const Reviews = ({serviceId, setAverageRating}) => {

    const [reviews, setReviews] = useState(null)

    const averageRatingCounter = (data) => {
        let totalRating = 0
        let ratingCount = 0
        if(Object.keys(data).length !== 0) {
            data.map((review) => (
                totalRating += review.rating,
                ratingCount ++
                ))
            let avgRating = Math.round((totalRating / ratingCount) * 10) / 10
            return setAverageRating(`${avgRating} / 5`)
        }
        return setAverageRating('Not yet rated')
    };

    useEffect(() => {
        httpClient.get(`/service/${serviceId}/reviews`)
            .then(res => {
                setReviews(res.data)
            })
    }, [])

    useEffect(() => {
        if(reviews){
            averageRatingCounter(reviews)
        }
    },[reviews])

    if(!reviews) {
        return (
            <div className="Card" style={{textAlign:'center'}}>
                <p>Loading data...</p>
            </div>
        )
    }

    return (
        <div>
            {
                reviews.map((review, id) => (
                    <Review key={`${id}-review`} review={review}></Review>
                ))
            }
        </div>
    )
}

export default Reviews