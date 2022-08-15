import React from 'react';
import httpClient from '../../services/httpClient';

const Review = ({ review, admin, newKey }) => {
  const deleteReview = async (id) => {
    const response = await httpClient.delete(`/review/${id}`);
    newKey();
  };
  return (
    <div style={{ flexDirection: '' }} className="Card expand review">
      <div>
        <p>Review by: {review.user.name}</p>
        <p>review: {review.review}</p>
        <p>rating: {review.rating}</p>
      </div>
      {admin ? (
        <button className="btn btn-danger" onClick={() => deleteReview(review.id)}>
          Delete
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default Review;
