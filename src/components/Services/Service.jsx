import React, { useEffect, useState } from "react";
import userService from "../../services/userService";


const Service = ({ title, description, author, authorId }) => {
    
    return (
        <div className="Card">
            <h3>{title}</h3>
            <h5>{author}</h5>
            <p>{description}</p>


            {authorId === userService.getLoggedInUser().user_id && <button>Edit</button>}
            

            
        </div>
    )
}

export default Service;