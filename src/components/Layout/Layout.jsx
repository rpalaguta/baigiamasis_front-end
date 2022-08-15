import React, { useEffect } from 'react';
import './layout.css';
import NavBar from '../NavBar/NavBar';
import Content from './Content';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Layout() {
  // padaryt useEffect jei nėra user, bet yra token - parodyt spinnerį
  const user = useSelector((state) => state.user.value);
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token && !user) {
      return setIsLoading(true);
    }
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
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
    <div className="layout">
      <NavBar />
      <Content />
    </div>
  );
}
