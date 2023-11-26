import {
  FormControl,
  FormErrorMessage,
  Input,
  FormLabel,Box
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
//show password


const initialValues={
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm: ""
}
export default function SignUp() {


  const location = useLocation()
  const from = location.state?.from || "/";


  const [submitStatus, setSubmitStatus]=useState(false)

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
        setSubmitStatus(true)
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

//   console.log("touched",touched)
// console.log(
//   "Registration ~ errors",
//   errors
// );
  

// console.log(errors.firstName, touched.firstName)
    return (
      <Box position={'relative'}>
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}>
          <Stack
            bg={'gray.50'}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}>
            <Stack spacing={4}>
              <Heading
                color={'gray.800'}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Sign Up
               
              </Heading>
            </Stack>
           
  
            <form mt={10} onSubmit={handleSubmit}>
              <Stack spacing={4}>
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
            <Input
            placeholder="Enter password"
            bg={'gray.100'}
            border={0}
            color={'gray.500'}
            _placeholder={{
              color: 'gray.500',
            }}
            id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && (
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isInvalid={touched.confirm && errors.confirm}
            // isDisabled={isConfirmPasswordDisabled}
          >
            <FormLabel>Confirm Password</FormLabel>
            <Input
           placeholder="Confirm password"
           bg={'gray.100'}
           border={0}
           color={'gray.500'}
           _placeholder={{
             color: 'gray.500',
           }}
           id="confirm"
              type="password"
              name="confirm"
              onChange={handleChange}
              value={values.confirm}
              onBlur={handleBlur}
            />
            {errors.confirm && (
              <FormErrorMessage>{errors.confirm}</FormErrorMessage>
            )}
          </FormControl>
       
      <Text mb='0'>
      By signing up, you agree to our Privacy Policy and Terms & Conditions
      </Text>

                
              </Stack>
              <Input
              isDisabled={errors.firstName || errors.lastName || errors.email || errors.password || errors.confirm || values.firstName===""|| values.lastName===""||values.confirm===""||values.password===""||values.email===""}
              type="submit" value="Submit"
                fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, #01d5a1, #053d4c)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, #01d5a1, #053d4c)',
                  boxShadow: 'xl',
         
                }}/>
                <Text>Already Have An Account? <Text onClick={()=>navigate("/login",{ replace: true ,state:{from:{pathname:from}}})}>Sign In</Text></Text>
            </form>
        
        
          </Stack>
        </Container>
      </Box>
    );
  
}

