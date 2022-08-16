import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import httpClient from '../../services/httpClient';
import Review from '../Review/Review';

const AdminReviews = ({ generateNewKey }) => {
  const [reviews, setReviews] = useState(0);

  const getReviews = async () => {
    const response = await httpClient.get('review');
    setReviews(response.data);
  };
  useEffect(() => {
    getReviews();
  }, []);
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

  const renderReviews = (data) => {
    return data.map((review, id) => {
      return <Review key={`${id}-review`} newKey={generateNewKey} review={review} admin={true} />;
    });
  };

  return renderReviews(reviews);
};

export default AdminReviews;
