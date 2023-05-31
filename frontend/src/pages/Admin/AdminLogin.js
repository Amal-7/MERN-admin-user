import React from 'react'
import Navbarr from '../../components/navbar/Navbarr'
import Login from '../../components/Login'

const AdminLogin = () => {
  return (
    <div>
        <Navbarr user={'admin'} />
        <Login />
    </div>
  )
}

export default AdminLogin