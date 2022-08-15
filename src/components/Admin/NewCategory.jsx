import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import httpClient from '../../services/httpClient';
import formValidation from '../../FormValidation';
import { useSelector } from 'react-redux';

const NewCategory = ({ onClose, onSubmit }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const [formValues, setFormValues] = useState({
    name: '',
  });

  function handleOnChange(event) {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await httpClient.post(`/categories`, formValues);
    onSubmit();
    onClose();
    navigate(`/admin`, { replace: true });
  };

  if (user) {
    return (
      <div key="create review form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Category
            </label>
            <input
              type="text"
              value={formValues.name}
              name="name"
              onChange={(e) => {
                handleOnChange(e);
              }}
              className="form-control"
              id="name"
            />
            {/* <p style={{ color: 'red' }}>{formErrors.review}</p> */}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button className="btn btn-primary" onClick={() => onClose()}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
};

export default NewCategory;
