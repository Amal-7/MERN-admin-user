import { createContext, useState } from "react"




export const AuthContext = createContext(null)


export default function Context ({children}) {
    const [user,setUser]=useState('')
    const [admin,setAdmin] =useState('')
    return (
        <AuthContext.Provider value={{user,setUser,admin,setAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}