import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../services/httpClient';
import NewCategory from './NewCategory';

const AdminCategories = ({ generateNewKey }) => {
  const [categories, setCategories] = useState(0);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const getCategories = async () => {
      const response = await httpClient.get(`/categories`);
      if (response.status !== 200) {
        return navigate('/', { replace: true });
      }
      setCategories(response.data);
    };
    getCategories();
  }, []);
  const toggleNewCategoryComponent = () => {
    setIsActive(!isActive);
  };
  const deleteCategory = async (id) => {
    const response = await httpClient.delete(`/categories/${id}`);
    generateNewKey();
  };
  if (!categories) {
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
    <>
      <div className="Card">
        <div className="heroBtn" onClick={() => toggleNewCategoryComponent()}>
          <p style={{ margin: '0' }}>{`${isActive ? 'Cancel' : 'Create new category'}`}</p>
        </div>
        <div id="newCategory" className={`Card ${isActive ? '' : 'displayNone'}`}>
          <NewCategory onClose={toggleNewCategoryComponent} onSubmit={generateNewKey} />
        </div>
      </div>
      <div className="Card">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr>
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteCategory(category.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminCategories;
