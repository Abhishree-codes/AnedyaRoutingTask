import {
  FormControl,
  FormErrorMessage,
  Input,
  FormLabel,Box, InputGroup, InputRightElement, Button, Flex, Image
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/schemaSignUp";
import {
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid
} from '@chakra-ui/react';

import { useState } from "react";
import { useLocation, useNavigate} from 'react-router-dom'





//toast 
//spinner 
//loader 


const initialValues={
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm: ""
}
export default function SignUp() {

  const [show, setShow] = useState(false)
  const [showConfirm,setShowConfirm] = useState(false)
  const handleClickForPassword = () => setShow(!show)
  const handleClickForConfirm = ()=>setShowConfirm(!showConfirm)
  const location = useLocation()
  const from = location.state?.from || "/";

  



  const navigate=useNavigate()


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    validateOnChange: true,
      validateOnBlur: false,
    onSubmit: (values, action) => {

      // console.log(
      //   "~ Registration ~ values",
      //   values
      // );
    
      const users = JSON.parse(localStorage.getItem("users")) || [];
      let doesUserExist = false 

        users.forEach((ele)=>{

          if(ele.email === values.email|| values.email==="task@gmail.com"){
            alert("Email already exists!")
            doesUserExist= true 
            return 
          }
        })
      
      if(!doesUserExist){

                //add to local and redirect to login 
      localStorage.setItem("users",JSON.stringify([
  ...users,
  {
    name: values.firstName + " " + values.lastName,
    email: values.email,
    password: values.password,
  },
]))
      alert("Sign Up successful!")
      action.resetForm();
      //go back to login 
      navigate('/login', { replace: true ,state:{from:{pathname:from}}});
      }
    },
  });


    return (
      <Flex textAlign={"left"} width={"100%"} height={"100vh"} justifyContent={"center"} alignItems={"center"} padding={10}>
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
      <Heading fontSize={'2xl'}>Sign Up</Heading>
 
             <FormControl isInvalid={touched.firstName && errors.firstName}>
            <FormLabel htmlFor="firstName" >First Name</FormLabel>
                <Input
                
                onChange={handleChange}
               onBlur={handleBlur}
                  placeholder="Firstname"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  type="firstName"
                  id="firstName"
              name="firstName"
              value={values.firstName}
       
                />
                {errors.firstName && touched.firstName && (
              <FormErrorMessage>{errors.firstName}</FormErrorMessage>
            )}
         
          </FormControl>
          <FormControl isInvalid={touched.lastName && errors.lastName}>
            <FormLabel>Last Name</FormLabel>
                <Input
                  placeholder="Lastname"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  type="lastName"
              name="lastName"
              id="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
                />
                 {errors.lastName && (
              <FormErrorMessage>{errors.lastName}</FormErrorMessage>
            )}
                </FormControl>
                <FormControl isInvalid={touched.email && errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input
   
            placeholder="Enter Email"
            bg={'gray.100'}
            border={0}
            color={'gray.500'}
            _placeholder={{
              color: 'gray.500',
            }}
            id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={touched.password && errors.password}>
            <FormLabel>Password</FormLabel>
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
          <FormControl
            isInvalid={touched.confirm && errors.confirm}
            // isDisabled={isConfirmPasswordDisabled}
          >
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size='md'>
            <Input
           placeholder="Confirm password"
           bg={'gray.100'}
           border={0}
           color={'gray.500'}
           _placeholder={{
             color: 'gray.500',
           }}
           id="confirm"
           pr='4.5rem'
           type={showConfirm ? 'text' : 'password'}
              name="confirm"
              onChange={handleChange}
              value={values.confirm}
              onBlur={handleBlur}

            />
            <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClickForConfirm}>
          {showConfirm ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
            </InputGroup>
         
            {errors.confirm && (
              <FormErrorMessage>{errors.confirm}</FormErrorMessage>
            )}
          </FormControl>
       
      <Text mb='0'>
      By signing up, you agree to our Privacy Policy and Terms & Conditions
      </Text>

      <Button
      colorScheme={'blue'} variant={'solid'}
              isDisabled={errors.firstName || errors.lastName || errors.email || errors.password || errors.confirm || values.firstName===""|| values.lastName===""||values.confirm===""||values.password===""||values.email===""}
              type="submit" 
                fontFamily={'heading'}
               
         
              >Sign Up</Button>
               <Flex gap={2} flexDirection={{base:"column",sm:"row",md:"row"}} justifyContent={"flex-start"}>
               <Text>Already Have An Account? 

</Text>
<Text  _hover={{ cursor: 'pointer' }} color={'blue.500'} onClick={()=>navigate("/login",{ replace: true ,state:{from:{pathname:from}}})}>Sign In</Text>
               </Flex>
  
              </Stack>
 
           
      </Flex>
         </Stack>
        </Flex>

     
    );
  
}

