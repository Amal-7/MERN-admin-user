import './App.css';
import Profile from './pages/User/Profile';
import UserLogin from './pages/User/UserLogin';
import UserSignup from './pages/User/UserSignup';
import {BrowserRouter as Router,Route,Routes, useNavigate} from 'react-router-dom'
import Home from './pages/User/home';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Context/UserContext';
import instance from './Axios/axios';
import AdminLogin from './pages/Admin/AdminLogin';
import UserView from './pages/Admin/UserView';



function App() {
const{setUser,setAdmin} = useContext(AuthContext)
  let token = localStorage.getItem('token')
  let adminToken = localStorage.getItem('adminToken')
  useEffect(()=>{
    if(token){
      instance.get('/profile',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res)=>{
        console.log(res.data);
        setUser(res.data)
      }).catch((res)=>{
    })
      
    }

    if(adminToken){
      instance.get('/admin/profile',{
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      }).then((res)=>{
        console.log(res.data,'res.data.admin');
        setAdmin(res.data)
      }).catch((res)=>{
    })
      
    }
  },[])
  return (
    <Router>
      <Routes>
        <Route path='/'  element={<Home />} />
        <Route path='/signup'  element={<UserSignup />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/profile' element={<Profile />} />

        <Route path='/admin' element={<UserView />} />
        <Route path='/admin/login'  element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
