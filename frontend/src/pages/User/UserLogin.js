import React, { useContext, useEffect, useState } from 'react';
import instance from '../../Axios/axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';


const UserLogin = () => {
  useEffect(()=>{
    let token = localStorage.getItem('token')
    if(token) navigate('/')
  })
  
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')
  const [passwordError,setPasswordError] = useState('')
  const [emailError,setemailError] = useState('') 
  const navigate = useNavigate()
const {setUser} = useContext(AuthContext)


  const loginSubmit = (e)=>{
    e.preventDefault()
    instance.post('/login',{
      email,
      password 
    }).then((res)=>{
     
      if(res.data.status){
        localStorage.setItem('token',res.data.token)
        setUser(res.data.user)
        navigate('/')
      
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
          <form id="loginform" onSubmit={loginSubmit}>
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
<div className='mb-3'>
            <Link  to={'/signup'} >Create New Account</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UserLogin