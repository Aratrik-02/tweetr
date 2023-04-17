import React from 'react'
import { Box,Button, Code, Stack } from '@chakra-ui/react'
import { PROTECTED, USERS } from 'lib/routes'
import { Link } from 'react-router-dom'
import { useAuth } from 'hooks/auth'
import Avatar from 'components/profile/Avatar'
import UsernameButton from 'components/profile/UsernameButton'

function ActiveUser(){
  const {user, isLoading} = useAuth()
  if(isLoading) return (<Box>Loading...</Box>)
  return(
    <Stack align="center" spacing="5" 
    boxShadow="lg" p="10" borderRadius="20"
    bg="#FDFDBD"
    mt="20" mb="8">
      <Avatar user={user} />
      <Code><UsernameButton user={user}/></Code>
      console.log(user.id)
      <Button 
      colorScheme='blue' 
      // bg="#00235B"
      // color="white"
      variant="solid"
      borderRadius="10" w="full" as={Link} 
      to={`${PROTECTED}/profile/${user?.id}`}>View Profile</Button>
    </Stack>
  )
}
const Sidebar = () => {
  return (
    <Box
      px="6"
      height="80vh"
      w="100%"
      maxW="300px"
      // borderLeft="1px solid"
      // borderLeftColor="teal.100"
      position="sticky"
      top="16"
      display={{ base: "none", md: "block" }}
    >
      <ActiveUser/>
      <Box as="ul" borderBottom="2px solid" borderColor="green.500"/>
      <Box align="center">
        <Button
          variant="outline"
          colorScheme="teal"
          borderRadius="full"
          size="sm"
          as={Link}
          to={USERS}
          w="100%"
          mt="4"
        >ALL USERS
        </Button>
      </Box>
    </Box>
  )
}

export default Sidebar