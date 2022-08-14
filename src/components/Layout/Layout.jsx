import React from 'react';
import './layout.css';
import NavBar from '../NavBar/NavBar';
import Content from './Content';

export default function Layout() {
  // padaryt useEffect jei nėra user, bet yra token - parodyt spinnerį
  return (
    <div className="layout">
      <NavBar />
      <Content />
    </div>
  );
}
