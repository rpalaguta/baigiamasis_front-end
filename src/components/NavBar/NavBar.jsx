import React from 'react';
import './navBar.css';
import { Link } from 'react-router-dom';
import routeCollection from '../../collections/routeCollection';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/userSlice';

const NavBar = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const renderNavLinks = () => {
    return user
      ? routeCollection.map((route, id) =>
          route.navBar !== 'none' && route.navBar !== 'guest' ? (
            <div key={`${id}-navigation`} className="navElement">
              <Link to={route.path}>{route.name}</Link>
            </div>
          ) : (
            ''
          )
        )
      : routeCollection.map((route, id) =>
          route.navBar === 'guest' || route.navBar === 'all' ? (
            <div key={`${id}-navigation`} className="navElement">
              <Link to={route.path}>{route.name}</Link>
            </div>
          ) : (
            ''
          )
        );
  };

  return (
    <div key="navigation" className="navBar Card content">
      <div>
        <Link to="/">
          <h2 className="pageName">ServiceReviewsPage</h2>
        </Link>
      </div>
      <div className="navLinks">
        {renderNavLinks()}
        {!!user ? (
          <div className="navElement">
            <a href="/" className="Button" onClick={() => dispatch(logout)}>
              Log Out
            </a>
          </div>
        ) : (
          <div className="navElement">
            <a href="/login" className="Button">
              Log In
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
