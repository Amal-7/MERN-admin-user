import React, { useContext, useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import instance from '../Axios/axios';
import { AuthContext } from '../Context/UserContext';


const Login = () => {
  
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')
  const [passwordError,setPasswordError] = useState('')
  const [emailError,setemailError] = useState('') 
  const navigate = useNavigate()
const {admin,setAdmin} = useContext(AuthContext)


  const loginAdminSubmit = (e)=>{
    e.preventDefault()
    instance.post('/admin/login',{
      email,
      password 
    }).then((res)=>{
     
      if(res.data.status){
        localStorage.setItem('adminToken',res.data.token)
        setAdmin(res.data.admin)
        navigate('/admin')
      
      }
      console.log(res) 
    })
    
  }
  return (
    <div className="App">
    <div className="container-fluid d-flex flex-column justify-content-center  min-vh-100 bg-secondary">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-4 bg-dark  rounded-5 ">
        <div className='text-white d-flex justify-content-center mt-2'>
                    <h3>LOG IN</h3>
                </div>
          <form id="loginform" onSubmit={loginAdminSubmit}>
            <div className="form-group mb-3">
              <label className='mb-2 '>Email address</label>
              <input
                type="email"
                value={email}
                className="form-control"
                id="EmailInput"
                name="EmailInput"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <small id="emailHelp" className="text-danger form-text">
                {emailError}
              </small>
            </div>
            <div className="form-group mb-3">
              <label className='mb-2'>Password</label>
              <input
                type="password"
                value={password}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <small id="passworderror" className="text-danger form-text">
                {passwordError}
              </small>
            </div>
            
            <button type="submit" className="btn btn-primary mt-2 mb-3 ">
              Submit
            </button>
            
          </form>

        </div>
      </div>
    </div>
  </div>
  )
}

export default Login