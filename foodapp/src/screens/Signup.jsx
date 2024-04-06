import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export  function Signup() {
  

    let navigate=  useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            email:'',
            Password:'',
            location: ''
           
        },
        onSubmit : (user => {
            axios.post('http://127.0.0.1:5000/createuser', user).then(()=>{
                alert('Registered Successfully..');
                navigate('/login');
            })
        })
    })

    
  return (
    <>
        <div className="container">
            <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" onChange={formik.handleChange} className="form-control" name="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" onChange={formik.handleChange} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" onChange={formik.handleChange} className="form-control" name="password" id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Geolocation</label>
                <input type="text" onChange={formik.handleChange} className="form-control" name="location" />
            </div>
           
            
            <button type="submit" className="m-3 btn btn-primary">Submit</button>
            <Link to='/login' className="m-3 btn btn-danger">Already a user</Link>
            </form>
        </div>
    </>
  )
}
