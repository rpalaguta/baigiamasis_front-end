import React from "react";
import { Link } from "react-router-dom";
import './home.css'

const Home = () => {
    return (
        <div className="home">
            <div className="hero">
                <h1 className="heroTitle">Services for people,<br></br> by people</h1>
                <h4 className="heroDescription">This is a place for people to advertise their services and get reviews</h4>
                <div>
                    <Link className='heroBtn' to='/services'>View Services</Link>
                    <Link className='heroBtn' to='/new_service'>Post your service</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;
