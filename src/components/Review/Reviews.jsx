import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import httpClient from '../../services/httpClient';
import Review from './Review';

const Reviews = ({ serviceId, setAverageRating, setReviewed }) => {
  const [reviews, setReviews] = useState(null);
  const user = useSelector((state) => state.user.value);

  const averageRatingCounter = (data) => {
    let totalRating = 0;
    let ratingCount = 0;
    if (Object.keys(data).length !== 0) {
      data.map((review) => {
        totalRating += review.rating;
        ratingCount++;
      });
      let avgRating = Math.round((totalRating / ratingCount) * 10) / 10;
      return setAverageRating(`${avgRating} / 5`);
    }
    return setAverageRating('Not yet rated');
  };

  useEffect(() => {
    const getReviews = async () => {
      const response = await httpClient.get(`/service/${serviceId}/reviews`);
      setReviews(response.data);
    };
    getReviews();
  }, [serviceId]);

  useEffect(() => {
    if (reviews) {
      averageRatingCounter(reviews);
      checkIfReviewdByUser(reviews);
    }
  }, [reviews]);

  if (!reviews) {
    return (
      <div className="flex spinner">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  const checkIfReviewdByUser = (data) => {
    if (user) {
      data.map((review) => {
        if (review.user.id === user.user_id) {
          setReviewed(true);
        }
      });
    }
  };

  const renderReviews = (data) => {
    return data.map((review, id) => {
      return <Review key={`${id}-review`} review={review} />;
    });
  };

  return renderReviews(reviews);
};

export default Reviews;
