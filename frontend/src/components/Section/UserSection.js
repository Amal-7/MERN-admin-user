import React, { useContext, useEffect } from 'react'
import {Avatar,Button} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';

const UserSection = () => {
const navigate = useNavigate()
const {user} =useContext(AuthContext)
useEffect(()=>{
  console.log(user);
})
    
  return (
    <div style={{backgroundColor:'#bdb6af'}} className='d-flex  justify-content-center flex-column align-items-center  min-vh-100 gap-3' >
            <Avatar
    alt="Remy Sharp"
    src={user.imageUrl}
    sx={{ width: 200, height: 200 }}
    />

    <h3>{user.name}</h3>
    <Button variant="contained" onClick={()=>navigate('/profile')} disableElevation>
<AccountBoxIcon className='m-2' />
        Go To Profile
</Button>
    </div>
  )
}

export default UserSection