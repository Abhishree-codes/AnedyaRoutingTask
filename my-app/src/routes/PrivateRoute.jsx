import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({children}){
    const location = useLocation()
    const {isAuth} = useContext(AuthContext)

   return isAuth ? children : <Navigate to="/login" state={{from:location}} replace/>
}