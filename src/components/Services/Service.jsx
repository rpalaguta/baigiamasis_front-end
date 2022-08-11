import React, {useState} from "react";
import httpClient from "../../services/httpClient";
import { Link, useNavigate } from "react-router-dom";


const Service = ({service, buttons}) => {
    let navigate = useNavigate();
    // const [isOpen, setIsOpen] = useState(false);
    const [key, setKey] = useState(0)
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

    const userAction = async (e, action='') => {
        e.stopPropagation();
        switch (action) {
            case 'delete':
                const response = await httpClient.delete(`service/${service.id}`)
                console.log(response.status)
                if(response.status === 200) {
                    setKey(Math.random())
                }
                break;
        
            default:
                break;
        }
    }

    return (
        <div key={`${key}-my-services`}  className="Card expand contentCard" onClick={() => handleOnClick()}>
            <div className="serviceInfo flex flexColumn">
                <div className="serviceName">
                    <h3 style={{width: '280px'}}>{service.name}</h3>
                </div>
                <h5 className="serviceDetails" style={{width: '280px'}}>By {service.author.name}</h5>
            </div>
            <div className="userActions flex justifyBetween">
                {
                    buttons ? 
                        <><Link className="heroBtn" onClick={(e) => userAction(e)} to={`/services/edit/${service.id}`}>Edit</Link>
                         <button className="heroBtn btnRed" onClick={(e) => userAction(e, 'delete')}>Delete</button></> : ''
                        

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