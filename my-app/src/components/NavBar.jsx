import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  CloseButton,
  Text
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useContext } from "react";
import {

  Link as ChakraLink,
 
  useDisclosure,
  Stack,
} from "@chakra-ui/react";





import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider"
import { Link } from "react-router-dom";


export default function NavBar(){



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
  




  

  const Paths = [
    { path: "/", onClick:()=>  handleLinkClick("/"), label: "Home" },
    { path: "/contact", onClick: ()=>handleLinkClick("/contact"), label: "Contact" },
    { path: "/about", onClick:()=> handleLinkClick("/contact"), label: "About" },
    {path:"/profile", onClick:()=>handleLinkClick("/profile"),label: "Profile"}
  ];


  const mobileNav = useDisclosure();
  

  return (
      location.pathname==="/login"||location.pathname==="/signup" ? (<></>):(
   <>
    <Box position="relative" >
      <Box
      bg={"#e0dbdb"}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={20}
        px={4}
        py={2}
      >
      <Box  bg={"transparent"} px={2} color={"white"} fontWeight={"bold"} >
        <Flex h={15} py={6} alignItems={"center"} justifyContent={"space-between"}>
        {(
          <Box  display={{base:"inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{ color: "inherit" }}
                variant="ghost"
                icon={mobileNav.isOpen ? <CloseButton aria-label="Close menu"/>:<AiOutlineMenu/>}
                onClick={mobileNav.isOpen? mobileNav.onClose :mobileNav.onOpen}
                _hover={{ bg: "#87c3ea"}}
              />

            <Stack  pos={"absolute"}
            border={"1px solid #e0dbdb"}
            mt={10}
            width={"200px"}
              zIndex={10000} as={"nav"} spacing={4}  bg={"white"} borderRadius={5} padding={2} textAlign={"left"} color="black" display={mobileNav.isOpen ? "flex" : "none"}>
        
              {Paths.map((ele) => (

                <Link key={ele.label} to={ele.path}
               >
                   <ChakraLink px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: "#87c3ea"
                }}>
                  {ele.label} </ChakraLink></Link>
              ))}
            </Stack>
          </Box>
        )}
          <HStack spacing={8} alignItems={"center"} color={"black"}>

            <Box>
            <Text
fontStyle="italic"
// textShadow="4px 2px 4px #000000"
color={"black"}
fontWeight="bold"
                  >
                  RoutingTask
                </Text>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "inline-flex" }}
              justifyContent="center"
            >
              {Paths.map((ele) => (
                <Link key={ele.label} to={ele.path} >
                  <ChakraLink px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: "#87c3ea",
                }}>
                  {ele.label}
                  </ChakraLink>
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
          <Button _hover={{bg: "#87c3ea"}} onClick={() => { isAuth ? handleLogout() : navigate("/login", { state: { from: location } }) }}>
{isAuth ? "Logout" : "Login"}
</Button>
          </Flex>
        </Flex>

      
      </Box>
      </Box>
      </Box>
    </>
      )
  );
}

