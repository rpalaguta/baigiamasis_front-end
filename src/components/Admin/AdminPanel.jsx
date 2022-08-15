import React from 'react';
import './admin.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import AdminCategories from './AdminCategories';
import AdminServices from './AdminServices';
import AdminUsers from './AdminUsers';
import AdminReviews from './AdminReviews';

const AdminPanel = () => {
  const user = useSelector((state) => state.user.value);
  const [content, setContent] = useState('AdminCategories');
  const [title, setTitle] = useState('Categories');
  const [key, setKey] = useState();

  const generateNewKey = () => {
    setKey(Math.random());
  };
  const handleSelection = (content) => {
    switch (content) {
      case 'categories':
        setTitle('Categories');
        setContent('AdminCategories');
        break;
      case 'services':
        setTitle('Services');
        setContent('AdminServices');
        break;
      case 'users':
        setTitle('Users');
        setContent('AdminUsers');
        break;
      case 'reviews':
        setTitle('Reviews');
        setContent('AdminReviews');
        break;
      default:
        break;
    }
  };

  const renderContent = (content) => {
    switch (content) {
      case 'AdminCategories':
        return <AdminCategories key={key} generateNewKey={generateNewKey} />;
      case 'AdminServices':
        return <AdminServices key={key} generateNewKey={generateNewKey} />;
      case 'AdminUsers':
        return <AdminUsers key={key} generateNewKey={generateNewKey} />;
      case 'AdminReviews':
        return <AdminReviews key={key} generateNewKey={generateNewKey} />;
      default:
        break;
    }
  };

  return (
    <div>
      <div key="navigation" className="adminNav Card content">
        <div
          className="navElement"
          style={{ cursor: 'pointer' }}
          onClick={() => handleSelection('categories')}
        >
          Categories
        </div>
        <div
          className="navElement"
          style={{ cursor: 'pointer' }}
          onClick={() => handleSelection('services')}
        >
          Services
        </div>
        <div
          className="navElement"
          style={{ cursor: 'pointer' }}
          onClick={() => handleSelection('users')}
        >
          Users
        </div>
        <div
          className="navElement"
          style={{ cursor: 'pointer' }}
          onClick={() => handleSelection('reviews')}
        >
          Reviews
        </div>
      </div>
      <div className="flex justifyBetween">
        <h2 style={{ margin: '10px auto' }}>{title}</h2>
      </div>
      {renderContent(content)}
    </div>
  );
};

export default AdminPanel;
