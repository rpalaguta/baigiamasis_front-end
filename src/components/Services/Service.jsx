import React, {useState} from "react";
import userService from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";


const Service = ({service, buttons}) => {
    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    // const STYLE = {
    //     position: 'absolute',
    //     inset: '0',
    //     backgroundColor: 'rgba(0, 0, 0, 0.7)',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // }
    function handleOnClick() {
        navigate(`/services/${service.id}`, { replace: true });
    }

    function stopPropagation (e) {
        e.stopPropagation();
    }

    return (
        <div  className="Card expand serviceOverview" onClick={() => handleOnClick()}>
            <div className="serviceInfo">
                <h3>{service.name}</h3>
                <h5>By {service.author.name}</h5>
            </div>
            <div className="serviceDescription">
                <p>{service.description}</p>
            </div>
            <div className="userActions">
                {
                    buttons ? <Link className="heroBtn" onClick={(e) => stopPropagation(e)} to={`/services/edit/${service.id}`}>Edit</Link> : ''
                }
            </div>
        </div>
            // { <ModalOverlay 
            //     style= {STYLE}
            //     message="Please signup" 
            //     isOpen={isOpen} 
            //     onClose={() => setIsOpen(false)}
            // /> }

    )
}

export default Service;