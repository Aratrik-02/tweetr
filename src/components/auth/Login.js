import { Box, Center, Text, Button, Link, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { DASHBOARD, REGISTER } from 'lib/routes'
import { useLogin } from 'hooks/auth'
import { useForm } from 'react-hook-form'
import { emailValidate, passwordValidate } from 'utils/form-validate'
const Login = () => {
    const {login, isLoading} = useLogin()
    const {register, handleSubmit,reset,formState:{errors}} = useForm()
    async function handleLogIn(data){
        const succeeded = await login({email:data.email, password:data.password, redirectTo:DASHBOARD})
        if(succeeded)reset()
    }
  return (
    <Center w="100%" h="100vh" bg="green.50">
        <Box mx="1" maxW="md" p="9" bg="green.50" borderWidth="2px" borderRadius="lg" color="green.500" >
            <Heading mb="4" size="lg" textAlign="center">
                Login
            </Heading>
            <form onSubmit={handleSubmit(handleLogIn)}>
                <FormControl isInvalid={errors.email} py="2" >
                    <FormLabel>Email</FormLabel>
                    <Input
                    type="email" placeholder="example@mail.com" {...register('email',emailValidate)}/> 
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password} py="2">
                    <FormLabel>Password</FormLabel>
                    <Input
                    type="password" placeholder="example@123" {...register('password',passwordValidate)}/> 
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>
                <Button 
                mt="4" 
                type="submit" 
                colorScheme='green' 
                size="md" 
                w="full"
                isLoading={isLoading}
                loadingText="Logging in"
                >
                    Login
                </Button>
            </form>
            <Text fontSize="xlg" align="center" mt="4" color="black">Don't have an account?
                <Link to={REGISTER} color="green.500"
                    fontWeight={600}
                    textDecor="underline" 
                    as={RouterLink}
                > Register </Link>
                now.
            </Text>
        </Box>
    </Center>
  )
}

export default Login