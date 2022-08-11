import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './home.css'

const Home = () => {

    const user = useSelector((state) => state.user.value);

    const renderServiceBtn = () => {
        if(user){
            return  <Link className='heroBtn' to='/services/add'>Post your service</Link>
        }
        return  <Link className='heroBtn' to='/login'>Login now and post your service!</Link>

    }

    return (
        <div className="home">
            <div className="hero">
                <h1 className="heroTitle">Services for people,<br></br> by people</h1>
                <h4 className="heroDescription">This is a place for people to advertise their services and get reviews</h4>
                <div>
                    <Link className='heroBtn' to='/services'>View Services</Link>
                    {renderServiceBtn()}
                </div>
            </div>
        </div>
    )
}

export default Home;
