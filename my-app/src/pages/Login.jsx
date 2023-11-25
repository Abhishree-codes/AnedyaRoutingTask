import React, { useContext, useState } from "react";
import { Button, Input, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

function Login() {
    //replace alerts with toast 
    //show password

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { handleLogin, isAuth} = useContext(AuthContext);

  const handleClick = () => {
    if (email === "task@gmail.com" && password === "task123") {
      setEmail("");
      setPassword("");
      handleLogin();
   //if im not coming from a protected route replace should be false 
      navigate(from, { replace: true });

    } else if (email === "task@gmail.com") {
      alert("invalid password");
    } else {
      const usersArray = JSON.parse(localStorage.getItem("users")) || [];
      let isUser = false;
      usersArray.forEach((ele) => {
        if (ele.email === email) {
          isUser = true;
          if (ele.password === password) {
            handleLogin();
            navigate(from, { replace: true });
          } else {
            alert("invalid password");
            return;
          }
        }
      });
      if (!isUser) {
        alert("user with this email doesn't exist");
      }
    }
  };

  if(isAuth){
    return (
        <div>
            You are already logged in!
        </div>
    )
  }

  return (
    <div>
      <Input
        type="email"
        placeholder="enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleClick}>Login</Button>
      <Text>Not Registered?</Text>
      <Button onClick={()=>navigate("/signup",{replace:true,state:{"from":from}})}>Sign Up Here</Button>
    </div>
  );
}

export default Login;
