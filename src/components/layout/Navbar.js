import { DASHBOARD } from "lib/routes";
import { Link as RouterLink } from "react-router-dom";
import { Flex,Link,Button, Text } from "@chakra-ui/react";
import { useLogout } from "hooks/auth";
export default function Navbar(){
    const { logout, isLoading } = useLogout();
  return (
    <Flex
      shadow="sm"
      pos="fixed"
      width="full"
      height="20"
      zIndex="3"
      justify="center"
      bg="#FEFF86"
      boxShadow='lg'
    >
        <Flex px="4" w="full" align="center" maxW="1200px" mx="6" >
            <Link 
            color="#6163D3" as={RouterLink} to={DASHBOARD} 
            fontWeight="bold" fontSize="2xl"
            style={{textDecoration: 'none'}}
            >
              <Text style={{textShadow: '1px 1px 0px #000000'}}>
                tweetr.
              </Text>
            </Link>
            <Button 
                ml="auto"
                colorScheme="blue"
                size="sm"
                borderRadius="10"
                boxShadow='md'
                px="20px"
                py="15px"
                onClick={logout}
                isLoading={isLoading}
            >
                Logout
            </Button>
        </Flex>
    </Flex>
  )
}