import { Box } from '@chakra-ui/react'
import React from 'react'

function About() {
  return (
    <Box mt={100}>
      This is a protected route. If you're here, you're logged in.
    </Box>
  )
}

export default About
