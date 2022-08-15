import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../services/httpClient';

const AdminServices = ({ generateNewKey }) => {
  const [services, setServices] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const getServices = async () => {
      const response = await httpClient.get(`/service`);
      if (response.status !== 200) {
        return navigate('/', { replace: true });
      }
      setServices(response.data);
    };
    getServices();
  }, []);
  if (!services) {
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
  const deleteService = async (id) => {
    const response = await httpClient.delete(`/services/${id}`);
    generateNewKey();
  };
  return (
    <div className="Card">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr>
              <th scope="row">{service.id}</th>
              <td>{service.name}</td>
              <td>{service.category.name}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteService(service.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminServices;
