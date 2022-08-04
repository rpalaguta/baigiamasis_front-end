import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import formValidation from "../../FormValidation";

const NewService = () => {

    const [categories, setCategories] = useState(0)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [formValues, setFormValues] = useState({
        'name': '',
        'category_id': 1,
        'description': '',
    })

    useEffect(() => {
        axios.get(`http://localhost/api/categories`)
      .then(res => {
        setCategories(res.data);
      })
    }, [])    

    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues)
            axios.post('http://localhost/api/service', formValues)
                .then(res => console.log(res))
        }
    }, [formErrors])

    if(!categories) {
        return (
            <div style={{textAlign:'center'}}>
                <p>Loading data...</p>
            </div>
        )
    }

    function handleOnChange (event) {
        setFormValues({
            ...formValues,
            [event.target.name] : event.target.value
        })
    }

    function handleSubmit (e) {
        e.preventDefault();
        setFormErrors(formValidation(formValues))
        setIsSubmit(true);
    }

    return (
        <div key='create/edit form' className="Card">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Service name</label>
                    <input type="text" value={formValues.name} name="name" onChange={(e) => {handleOnChange(e)}} className="form-control" id="name"/>
                </div>
                <p style={{color: 'red'}}>{ formErrors.name }</p>
                <div className="mb-3">
                <label htmlFor="category_id" className="form-label">Category</label>
                <select id="category_id" name="category_id" onChange={(e) => handleOnChange(e)} className="form-select" aria-label="Default select example">
                        {
                            categories.map((category) => {
                                return <option key={`${category.id}_category`} value={category.id} className="dropdown-item">{category.name}</option>
                            })
                        }
                </select>
                </div>
                <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                    <textarea name="description" value={formValues.description} onChange={(e) => {handleOnChange(e)}} className="form-control" id="description"/>
                </div>
                <p style={{color: 'red'}}>{ formErrors.description }</p>
                <div className="mb-3">
                <label htmlFor="author_id" className="form-label">author id</label>
                    <input type="number" name="author_id" onChange={(e) => {handleOnChange(e)}} className="form-control" id="author_id"/>
                </div>
                {/* {JSON.stringify(formValues)} */}

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to='/services'>Go Back</Link>
                </form>
        </div>
    )
}

export default NewService;