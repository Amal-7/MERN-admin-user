import { Avatar, Box, Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import instance from '../../Axios/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import axios from 'axios';

const ProfileSection = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const navigate = useNavigate()
  const {user,setUser} =useContext(AuthContext)
  useEffect(()=>{
  let token = localStorage.getItem('token')
    if(!token) navigate('/login')
  })
  const handleUpload =async()=>{
    
    if(selectedFile){
    const formData = new FormData()
    formData.append("file",selectedFile  )
    formData.append("upload_preset","fx7snyrl")
    console.log('selected',selectedFile);
    console.log(formData,'formadata');
    axios.post('https://api.cloudinary.com/v1_1/dsgx9nmmt/image/upload',formData).then((res)=>{
      console.log(res.data.url)
      console.log(user,'old')
      const data = user
      const updateUser = {...data,imageUrl:res.data.url}
      setUser(updateUser)
        instance.post('/upload',{
          url:res.data.url,
          user
        })
    }) 
  }else{
    alert('Please Select a file to upload')
  }
  }
 
  return (

    
    <div style={{backgroundColor:'#bdb6af'}} className='d-flex  justify-content-center flex-column align-items-center  min-vh-100 gap-3' >
        <Box 
  sx={{
    width: '60%',
    height: '100vh',
    backgroundColor: 'darkgray',
    '&:hover': {
      backgroundColor: '#d7dbdf',
      opacity: [0.9, 0.8, 0.7],
    },
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    gap:2
  }}
  
>
    <Avatar
alt="Remy Sharp"
src={user.imageUrl}
sx={{ width: 200, height: 200 }}
/>
<div className='d-flex flex-column gap-2 justify-content-center'>
<input onChange={(event)=>setSelectedFile(event.target.files[0])}  accept="image/*" type="file" />
<Button variant="contained" component="label" onClick={handleUpload}>
  Upload Profile Picture 
</Button>
</div>

    <List
      sx={{
        width: '100%',
        maxWidth: 450,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Username" secondary={user.name} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EmailIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Email" secondary={user.email} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ContactPhoneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Mobile" secondary={user.number} />
      </ListItem>
     
    </List>

    </Box>
</div>
  )
}

export default ProfileSection