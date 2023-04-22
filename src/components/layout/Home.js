import { Box, Center, Text, Button, Link, Heading} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { LOGIN, REGISTER} from 'lib/routes'
export default function Home(){

  return (
    <Center w="100%" h="100vh" bg="#FDFDBD">
        <Box mx="1" maxW="xs" p="9" bg="#fffee9" boxShadow="lg"
         borderRadius="20" align="center">
            <Heading mb="4" size="lg" textAlign="center" color="blue.500">
                Tweetr.
            </Heading>
            <Text fontSize="lg" fontWeight="bold" mb={8} align="center">
              The tweeting platform for everyone.
            </Text>
            <Text fontSize="md" mb={8}>
              Connect with friends, share your stories, and discover new things.
            </Text>
            <Button colorScheme="blue" size="lg" mb={4} as={RouterLink} to={REGISTER} alignItems="center">
              Get started
            </Button>
            <Text fontSize="xlg" align="center" mt="4" color="black">Already have an account?<br/>
                <Link to={LOGIN} color="blue.500"
                    fontWeight={600}
                    textDecor="underline" 
                    as={RouterLink}
                > Sign in </Link>
                now.
            </Text>
        </Box>
    </Center>
  )
}

