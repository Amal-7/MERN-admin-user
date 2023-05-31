import React, { useContext } from 'react'
import { AuthContext } from '../../Context/UserContext'
import { Button } from '@mui/material'
import UserList from '../../components/Section/UserList'
import { Link } from 'react-router-dom'
import Navbarr from '../../components/navbar/Navbarr'

const UserView = () => {
    const {admin} = useContext(AuthContext)
  return (
    <div>
        <Navbarr user = {'admin'} />
    {!admin?<div className='d-flex justify-content-center align-items-center min-vh-100'><Button variant="contained" color="success"> <Link to={'/admin/login'} className='text-white'>Please Login To Continue</Link></Button></div> : <UserList />}

    </div>
  )
}

export default UserView