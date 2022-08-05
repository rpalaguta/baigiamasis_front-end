import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userService from "../../services/userService";
import httpClient from '../../services/httpClient';
import formValidation from "../../FormValidation";


const NewReview = ({onClose}) => {

    const user = userService.getLoggedInUser()
    const [responseStatus, setResponseStatus] = useState(0);
    const {serviceId} = useParams()
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [formValues, setFormValues] = useState({
        'review': '',
        'service_id': serviceId,
        'author_id' : user.user_id,
        'rating' : '',
    })

    useEffect(() => {
        if (responseStatus === 200 && isSubmit) {
            window.location.href = `/services/${serviceId}`
        }
    },[responseStatus])

    function handleOnChange (event) {
        setFormValues({
            ...formValues,
            [event.target.name] : event.target.value
        })
    }

    function handleSubmit (e) {
        e.preventDefault();
        setFormErrors(formValidation(formValues, 'review'))
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            httpClient.post(`/review`, formValues)
            .then(res => setResponseStatus(res.status))
        }
        
    }

    if(user) {
        return(
            <div key='create review form'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="review" className="form-label">Review</label>
                    <textarea name="review" value={formValues.review} onChange={(e) => {handleOnChange(e)}} className="form-control" id="review"/>
                    <p style={{color: 'red'}}>{ formErrors.review }</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rate your experiance (1 to 5)</label>
                    <input style={{width: '50px'}} value={formValues.rating} min={1} max={5} type="number" name="rating" onChange={(e) => {handleOnChange(e)}} className="form-control" id="rating"/>
                    <p style={{color: 'red'}}>{ formErrors.rating }</p>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button className="btn btn-primary" onClick={() => onClose()}>Cancel</button>
            </form>
        </div>
        )
    }
}

export default NewReview;