import React from "react";
import './navBar.css'
import { Link } from "react-router-dom";
import routeCollection from "../../collections/routeCollection";
import userService from "../../services/userService";


const NavBar = () => {
    const user = userService.getLoggedInUser() 

    const renderNavLinks = () => {
        return user ?
        routeCollection.map((route, id) => (
             route.visible !== 'none' && route.visible !== 'guest' ? <div key={`${id}-navigation`} className="navElement"><Link to={route.path}>{route.name}</Link></div> : ''
        ))
        : routeCollection.map((route, id) => (
            route.visible === 'guest' || route.visible === 'all' ? <div key={`${id}-navigation`} className="navElement"><Link to={route.path}>{route.name}</Link></div> : ''
       ))
        //
    }

    return (
        <div key='navigation' className="navBar Card content">
            <div><Link to='/'><h2 className="pageName">ServiceReviewsPage</h2></Link></div>
            <div className="navLinks">
                {renderNavLinks()}
                {
                    user ? 
                        <div className="navElement"><a href="/" className="Button" onClick={() => userService.logoutUser()}>Log Out</a></div>
                        : 
                        <div className="navElement"><a href="/login" className="Button">Log In</a></div> 
                }
            </div>
        </div>
    )
}

export default NavBar;