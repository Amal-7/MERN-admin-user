import React, { useContext, useState } from 'react'
import instance from '../../Axios/axios'
import { AuthContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserSignup = () => { 
    
    const [name,setName ]=useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')
    const [number,setNumber]=useState('')

    const navigate = useNavigate()
    const{setUser} =useContext(AuthContext)
    const loginSubmit = (e)=>{
        e.preventDefault()
        const formData = {
            name,
            email,
            password,
            number
        }
        instance.post('/signup',formData).then((res)=>{
          localStorage.setItem('token',res.data.token)
          setUser(res.data.savedUser)
          navigate('/')


        }).catch((res)=>{
          console.log(res)
        })
        
    }
    return (
      <div className="App">
      <div className="container-fluid d-flex flex-column justify-content-center  min-vh-100 bg-secondary">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-4 bg-dark  rounded-5">
                <div className='d-flex text-white justify-content-center mt-3'>
                    <h3>Create New Account</h3>
                </div>
            <form id="loginform" onSubmit={loginSubmit}>
            <div className="form-group mb-3" >
                <label>User Name</label>
                <input
                  type="text"
                  value={name}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="User Name"
                  onChange={(event) => setName(event.target.value)}
                />
                
              </div>
              <div className="form-group mb-3">
                <label>Email address</label>
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
                {/* <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small> */}
              </div>
              <div className="form-group mb-3" >
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                
              </div>

              <div className="form-group mb-3" >
                <label>Phone Number</label>
                <input
                  type="number"
                  value={number}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Phone Number"
                  onChange={(event) => setNumber(event.target.value)}
                />
                
              </div>
              
              <button  type="submit" className="btn btn-primary mb-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }

export default UserSignup