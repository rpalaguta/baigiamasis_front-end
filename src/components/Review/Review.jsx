import React from "react";

const Review = ({ review }) => {
    return (
        <div className="Card expand review">
            <div >
                <p>Review by: {review.author.name}</p>
                <p>review: {review.review}</p>
                <p>rating: {review.rating}</p>
            </div>
        </div>
    )
}

export default Review;