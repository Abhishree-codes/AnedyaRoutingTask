import { createContext } from "react";
import { useState } from "react";

export const AuthContext=createContext()

export default function AuthContextProvider(props){

    const [isAuth,setAuth]=useState(false)

    const handleLogin=()=>{
        setAuth(true)
    }
    const handleLogout=()=>{
        setAuth(false)
    }
    return(
    <AuthContext.Provider value={{isAuth,handleLogin,handleLogout}}>
        {props.children}
    </AuthContext.Provider>
    )
}