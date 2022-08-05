import React from "react";
import './navBar.css'
import { Link } from "react-router-dom";
import routeCollection from "../../collections/routeCollection";
import userService from "../../services/userService";


const NavBar = () => {
    return (
        <div key='navigation' className="navBar content">
            <div><Link to='/'><h2 className="pageName">ServiceReviewsPage</h2></Link></div>
            <div className="navLinks">
                {
                    routeCollection.map((route, id) => (
                        <div key={`${id}-navigation`} className="navElement"><Link to={route.path}>{route.name}</Link></div>
                    ))
                }
                { userService.getLoggedInUser() ? 
                    <div className="navElement"><a href="/" className="Button" onClick={() => userService.logoutUser()}>Log Out</a></div>
                     : 
                    <div className="navElement"><a href="/login" className="Button">Log In</a></div> }
            </div>
        </div>
    )
}

export default NavBar;