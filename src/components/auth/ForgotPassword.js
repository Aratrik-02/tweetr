import { Box, Center, Text, Button, Link, FormControl, FormErrorMessage, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { LOGIN } from 'lib/routes'
import { useForm } from 'react-hook-form'
import { emailValidate} from 'utils/form-validate'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPassword(){
    const auth = getAuth();
    const toast = useToast();
    const handleForgotPassword = async (data) => {
        try {
            await sendPasswordResetEmail(auth, data.email);
            toast({
                title: "Password reset email sent successfully!",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        } catch (error) {
            toast({
                title: "User not found!",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    };    
    const {register, handleSubmit,formState:{errors}} = useForm()
  return (
    <Center w="100%" h="100vh" bg="#FDFDBD">
        <Box mx="1" maxW="md" p="9" bg="#fffee9" boxShadow="lg"
         borderRadius="20">
            <Heading mb="4" size="md" textAlign="center" color="blue.500">
                Password Reset
            </Heading>
            <form onSubmit={handleSubmit(handleForgotPassword)}>
                <FormControl isInvalid={errors.email} py="2" >
                    <FormLabel>Email</FormLabel>
                    <Input
                    type="email" placeholder="example@mail.com" {...register('email',emailValidate)}/> 
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>  
                <Button mt="4"
                size="md" colorScheme='blue' w="full" type="submit" >
                    Reset Password
                </Button>
                <Text fontSize="sm" align="center" color="black" mt="4">or<br/>
                    <Link to={LOGIN} color="blue.500"
                        fontWeight={600}
                        textDecor="underline" 
                        textAlign="right"
                        as={RouterLink}
                    > Login </Link>
                </Text>
            </form>
        </Box>
    </Center>
  )
}
