import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../services/httpClient';

const AdminUsers = () => {
  const [users, setUsers] = useState(0);
  const navigate = useNavigate();
  const getUsers = async () => {
    const response = await httpClient.get(`/users`);
    if (response.status !== 200) {
      return navigate('/', { replace: true });
    }
    setUsers(response.data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    const response = await httpClient.delete(`/users/${id}`);
    getUsers();
    // alert(response.data);
  };
  if (!users) {
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
          {users.map((user) => (
            <tr>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
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

export default AdminUsers;
