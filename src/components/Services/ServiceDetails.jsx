import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import httpClient from '../../services/httpClient';
import NewReview from '../Review/NewReview';
import Reviews from '../Review/Reviews';
import { useSelector } from 'react-redux';

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const user = useSelector((state) => state.user.value);
  const [key, setKey] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await httpClient.get(`service/${serviceId}`);
      setService(response.data);
    };
    getData();
  }, [serviceId]);

  if (!service) {
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
  const leaveReviewButton = () => {
    if (user) {
      if (!reviewed) {
        return (
          <div className="heroBtn" onClick={() => toggleNewReviewComponent()}>
            <p style={{ margin: '0' }}>{`${isActive ? 'Cancel' : 'Leave a review'}`}</p>
          </div>
        );
      }
      return <p style={{ margin: '0' }}>You left review for this service</p>;
    }
  };

  const toggleNewReviewComponent = () => {
    setIsActive(!isActive);
  };

  const generateNewKey = () => {
    setKey(Math.random());
  };

  return (
    <>
      <div className="Card">
        <h3>{service.name}</h3>
        <h5>{service.user.name}</h5>
        <p>{service.description}</p>
        <p>Average rating: {averageRating ? averageRating : 'error'}</p>
        {leaveReviewButton()}
      </div>
      <div className="flex justifyBetween">
        <h2 style={{ margin: '10px auto' }}>Reviews</h2>
      </div>
      {user ? (
        <>
          <div id="newReview" className={`Card ${isActive ? '' : 'displayNone'}`}>
            <NewReview onClose={toggleNewReviewComponent} onSubmit={generateNewKey} />
          </div>
        </>
      ) : (
        ''
      )}
      <Reviews
        key={`${key}-reviews`}
        serviceId={serviceId}
        setAverageRating={setAverageRating}
        setReviewed={setReviewed}
      />
    </>
  );
};

export default ServiceDetails;
