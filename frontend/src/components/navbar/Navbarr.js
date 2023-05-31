import React, { useContext } from 'react'
import {Container} from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { AuthContext } from '../../Context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';


const Navbarr = (props) => {
const navigate = useNavigate()
  const {user,setUser,setAdmin,admin} = useContext(AuthContext)
  const handleLogout = ()=>{
    localStorage.removeItem('token')
    setUser('')
    navigate('/login')
  }

  const handleAdminLogout =()=>{
    localStorage.removeItem('adminToken')
    setAdmin('')
    navigate('/admin/login')
  }
  return (
    <Navbar className='bg-info'>
    <Container>
      <Navbar.Brand href="#home"> {props.user==='user'?'User Profile':'Admin Panel'}</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className='d-flex gap-2'>
        {props.user==='user'? user? <div><h5>Signed in as: <AccountCircleIcon />  {user.name } </h5>  <span onClick={handleLogout}><LogoutIcon />Logout</span> </div>:<Link to={'/login'} >Login <LoginIcon /></Link>: <span></span> }
         
         {
         props.user==='admin'?  admin? <div><h5>Signed in as: <AccountCircleIcon />  {admin.name } </h5>  <span onClick={handleAdminLogout}><LogoutIcon />Logout</span> </div>:<Link to={'/admin/login'} >Login <LoginIcon /></Link> :<span></span>
         } 
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navbarr