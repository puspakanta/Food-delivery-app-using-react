import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

export default function Login() {
  const [cookies, setCookie, removeCookie] = useCookies('');
   
  let navigate = useNavigate();

  const formik = useFormik({
       initialValues: {
           email: '',
           password: ''
       },
       onSubmit: (formdata) => {
        axios.get('http://127.0.0.1:5000/loginuser')
            .then((response) => {
                var user = response.data.find(user => user.email === formdata.email);
                if (user) {
                    bcrypt.compare(formdata.password, user.password)
                        .then((isMatch) => {
                            if (isMatch) {
                                setCookie('email',user.email);
                                setCookie('name', user.name);
                                alert("Login Success");
                                navigate('/');
                            } else {
                                alert("Invalid Password");
                            }
                        })
                        .catch((error) => {
                            console.error("Error comparing passwords:", error);
                            alert("An error occurred while comparing passwords");
                        });
                } else {
                    alert("Invalid Email Id");
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                alert("An error occurred while fetching user data");
            });
    }
    
  })
  return (
    <>
      <div className="container">
            <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" onChange={formik.handleChange} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" onChange={formik.handleChange} className="form-control" name="password" id="exampleInputPassword1" />
            </div>           
            
            <button type="submit" className="m-3 btn btn-primary">Submit</button>
            <Link to='/createuser' className="m-3 btn btn-danger">New user</Link>
            </form>
        </div>
    </>
  )
}
