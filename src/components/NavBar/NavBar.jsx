import React from "react";
import './navBar.css'
import { Link } from "react-router-dom";
import routeCollection from "../../collections/routeCollection";

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
                <div className="navElement"><a className="Button" href="#">Log In</a></div>
            </div>
        </div>
    )
}

export default NavBar;