import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Text ,FormLabel,FormControl,FormErrorMessage,InputRightElement,InputGroup, Stack, Flex, Heading, Checkbox, Image, useToast} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import {loginSchema} from "../schemas/schemaLogin"
import { useFormik } from "formik";
import LoadingSpinner from '../components/LoadingSpinner';

const initialValues={
  email: "",
  password: "",
}
function Login() {

  const toast = useToast();

  const emailError = () => {
    toast({
      title: "User with this email doesn't exist",
      description: "",
      status: 'error',
      duration: 1000,
      isClosable: true,
    });
  };

  const passwordError=()=>{
    toast({
      title: "Invalid Password",
      description: "",
      status: 'error',
      duration: 1000,
      isClosable: true,
    });
  }

  const loginSuccess=()=>{
    toast({
      title: "Login Successful",
      description: "",
      status: 'success',
      duration: 1000,
      isClosable: true,
    });
  }
  const [showLoader, setShowLoader] = useState(true)

    const [show, setShow] = useState(false)
    const handleClickForPassword = () => setShow(!show)
    
    useEffect(()=>{
  setTimeout(()=>{
    setShowLoader(false)
  },500)
},[])

    

   
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
      initialValues,
      validationSchema: loginSchema,
      validateOnChange: true,
        validateOnBlur: false,
      onSubmit: (values, action) => {
  
        if (values.email === "task@gmail.com" && values.password === "task123") {
          action.resetForm();
          handleLogin();
       //if im not coming from a protected route replace should be false 
       loginSuccess()
          navigate(from, { replace: true });
    
        } else if (values.email  === "task@gmail.com") {
      
          passwordError()
        } else {
          const usersArray = JSON.parse(localStorage.getItem("users")) || [];
          let isUser = false;
          usersArray.forEach((ele) => {
            if (ele.email === values.email ) {
              isUser = true;
              if (ele.password === values.password) {
                action.resetForm();
                handleLogin();
                loginSuccess()
         
                   navigate(from, { replace: true });   
               
              
              } else {
             
               passwordError()
                return;
              }
            }
          });
          if (!isUser) {
            emailError()
  
          }
        }
        
      },
    });
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { handleLogin, isAuth} = useContext(AuthContext);

 

  if(isAuth){
    return (
        <div>
            You are already logged in!
        </div>
    )
  }

  return (
  showLoader ?
    <LoadingSpinner/>:
   ( <Flex textAlign={"left"} width={"100%"} height={"100vh"} justifyContent={"center"} alignItems={"center"} padding={10}>
    <Stack  minH={{base:"90vh",sm:"30vh",md:"60vh"}} width={{base:"90%",sm:"90%",md:"900px"}} margin={"auto"} direction={{ base: 'column', md: 'row' }} borderRadius={5} boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}>
           <Flex flex={1}>
        <Image
        borderTopLeftRadius={{base:5,sm:5,md:5}}
          alt={'Login Image'}
          objectFit={'cover'}
          borderTopRightRadius={5}
          borderBottomLeftRadius={{base:0,sm:0,md:5}}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
       <Flex p={8} flex={1} align={'center'} justify={'center'}>
       <Stack  as="form" onSubmit={handleSubmit} spacing={4} w={'full'} maxW={'md'}>
       <Heading fontSize={'2xl'}>Sign in to your account</Heading>
       {/* <form onSubmit={handleSubmit}> */}
       <FormControl isInvalid={touched.email && errors.email}>
            <FormLabel>Email address </FormLabel>
            
      <Input
       onChange={handleChange}
       onBlur={handleBlur}
        type="email"
        name="email"
        placeholder="enter email"
        value={values.email}

      
        
      />
      
      {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
          </FormControl>

  <FormControl isInvalid={touched.password && errors.password}>
            <FormLabel>Password  </FormLabel>
            <InputGroup size='md'>
            <Input
             pr='4.5rem'
             type={show ? 'text' : 'password'}
            placeholder="Enter password"
            bg={'gray.100'}
            border={0}
            color={'gray.500'}
            _placeholder={{
              color: 'gray.500',
            }}
            id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClickForPassword}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
            </InputGroup>
           
            {errors.password && (
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            )}
          </FormControl>
          {/* <Input
              isDisabled={errors.email || errors.password ||values.password===""||values.email===""}
              type="submit" value="Login"
                fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, #01d5a1, #053d4c)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, #01d5a1, #053d4c)',
                  boxShadow: 'xl',
         
                }}/> */}
     
    {/* </form> */}
    <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Text  _hover={{ cursor: 'pointer' }} color={'blue.500'}>Forgot password?</Text>
            </Stack>
            <Button isDisabled={errors.email || errors.password ||values.password===""||values.email===""}
              type="submit" colorScheme={'blue'} variant={'solid'} >
              Sign in
            </Button>
            <Flex gap={2} textAlign={"right"} justifyContent={"flex-end"}>
            <Text>Not Registered?

              </Text>
              <Text  _hover={{ cursor: 'pointer' }} color={'blue.500'} onClick={()=>navigate("/signup",{replace:true,state:{"from":from}})}>Sign Up Here</Text>
              </Flex>
          </Stack>
       </Stack>
       </Flex>
  
    </Stack>
    </Flex>
  )
  
  );
}

export default Login;
