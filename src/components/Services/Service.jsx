import React, {useState} from "react";
import userService from "../../services/userService";
import { useNavigate } from "react-router-dom";


const Service = ({service}) => {
    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const user = userService.getLoggedInUser()
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

    const editBtn = () => {
        if(user) {
            service.author.name === user.user_id && <button>Edit</button>
        }
    }

    return (
        <div  className="Card expand serviceOverview" onClick={() => handleOnClick()}>

                <div className="serviceInfo">
                    <h3>{service.name}</h3>
                    <h5>By {service.author.name}</h5>
                    {editBtn()}

                </div>
                <div className="serviceDescription">
                    <p>{service.description}</p>
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