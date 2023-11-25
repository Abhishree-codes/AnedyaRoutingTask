import { Button, Flex } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'
import { Link, useLocation, useNavigate } from 'react-router-dom'


export default function NavBar() {

  const { isAuth, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();


  const handleLinkClick = (to) => {
//if im coming from a protected route it should still register in history in actually and prceed as normal. However if i log in and im coming from a rddirected protected route it shoyld be removed from history 
    // if(location.state?.from?.pathname==="/about" && location.pathname === "/login"){
    //   navigate(to, { replace: true });
    // }else{
      navigate(to);
   // }
  };

  return (
    location.pathname==="/login"||location.pathname==="/signup" ? (<></>):  
(    <Flex>
    <Link to={"/"} onClick={() => handleLinkClick("/")}>
      Home
    </Link>
    <Link to={"/contact"} onClick={() => handleLinkClick("/contact")}>
      Contact
    </Link>
    <Link to={"/about"} onClick={() => handleLinkClick("/about")}>
      About
    </Link>
    <Button onClick={() => { isAuth ? handleLogout() : navigate("/login", { state: { from: location } }) }}>
{isAuth ? "Logout" : "Login"}
</Button>

  </Flex>)
  
  );
}
