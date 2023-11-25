import {
  FormControl,
  FormErrorMessage,
  Input,
  FormLabel,useToast,Box
} from "@chakra-ui/react";
import {
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid
} from '@chakra-ui/react';

import { useState } from "react";
import { useLocation, useNavigate} from 'react-router-dom'

import * as yup from "yup";


//same email 
//disable button
//toast 
//spinner 
//loader 
//show password
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "First name should be at least 3 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(3, "Last name should be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters")
    .max(20, "Password should not exceed 20 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required")
});

export default function SignUp() {
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: ""
  });
  const location = useLocation()
  const from = location.state?.from || "/";

  const toast = useToast()
  const [submitStatus, setSubmitStatus]=useState(false)
  const [errors, setErrors] = useState({});
  const navigate=useNavigate()



  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));

    if (name === 'password') {
      schema
        .validateAt(name, { [name]: value })
        .then(() => {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        })
        .catch((err) => {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: err.message }));
        });
    }
  };

  const isConfirmPasswordDisabled = !details.password || !!errors.password;


  const handleSubmit = (e) => {
    console.log(submitStatus,"status")
    e.preventDefault();

    schema
      .validate(details, { abortEarly: false })
      .then(() => {
        // Validation passed
        //check for same email 
        const users = JSON.parse(localStorage.getItem("users")) || [];
        let doesUserExist = false 

          users.forEach((ele)=>{

            if(ele.email === details.email|| details.email==="task@gmail.com"){
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
      name: details.firstName + " " + details.lastName,
      email: details.email,
      password: details.password,
    },
  ]))
        alert("Sign Up successful!")
        //go back to login 
        navigate('/login', { replace: true ,state:{from:{pathname:from}}});
        }
      })
      .catch((err) => {
        console.log(err)
  

        const fieldErrors = {};

        err.inner.forEach((error) => {
          fieldErrors[error.path] = error.message;
        });

        setErrors(fieldErrors);
      });
      
  };


  

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
           
  
            <Box mt={10} Box as={'form'} onSubmit={handleSubmit}>
              <Stack spacing={4}>
              <FormControl isInvalid={!!errors.firstName}>
            <FormLabel>First Name</FormLabel>
                <Input
                  placeholder="Firstname"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  type="text"
              name="firstName"
              value={details.firstName}
              onChange={handleChange}
              onFocus={() => setErrors({})}
                />
                {errors.firstName && (
              <FormErrorMessage>{errors.firstName}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel>Last Name</FormLabel>
                <Input
                  placeholder="Lastname"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  type="text"
              name="lastName"
              value={details.lastName}
              onChange={handleChange}
              onFocus={() => setErrors({})}
                />
                 {errors.lastName && (
              <FormErrorMessage>{errors.lastName}</FormErrorMessage>
            )}
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input
            placeholder="Enter Email"
            bg={'gray.100'}
            border={0}
            color={'gray.500'}
            _placeholder={{
              color: 'gray.500',
            }}
              type="email"
              name="email"
              value={details.email}
              onChange={handleChange}
              onFocus={() => setErrors({})}
            />
            {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
            placeholder="Enter password"
            bg={'gray.100'}
            border={0}
            color={'gray.500'}
            _placeholder={{
              color: 'gray.500',
            }}
              type="password"
              name="password"
              value={details.password}
              onChange={handleChange}
              onFocus={() => setErrors({})}
            />
            {errors.password && (
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isInvalid={!!errors.confirm}
            isDisabled={isConfirmPasswordDisabled}
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
              type="password"
              name="confirm"
              onChange={handleChange}
              value={details.confirm}
              onFocus={() => setErrors({})}
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
            </Box>
        
        
          </Stack>
        </Container>
      </Box>
    );
  
}

