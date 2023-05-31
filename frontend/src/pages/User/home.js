import React, { useContext } from 'react'
import Navbarr from '../../components/navbar/Navbarr'
import UserSection from '../../components/Section/UserSection'
import { AuthContext } from '../../Context/UserContext'

const Home = () => {
  
    const {user} =useContext(AuthContext)
  return (
    
    <>
    <Navbarr user={'user'} />

   {user &&<UserSection />}
  
    </>  )
}

export default Home