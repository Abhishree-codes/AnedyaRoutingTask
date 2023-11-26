import { Flex, Spinner } from "@chakra-ui/react";

export default function LoadingSpinner(){
    
    return (
        <Flex width={"100%"} height={"100vh"} justifyContent={"center"} alignContent={"center"}>
      <Spinner
      margin={"auto"}
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>
        </Flex>
  
    )
}