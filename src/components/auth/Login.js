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
    <Center w="100%" h="100vh" bg="#fffee9">
        <Box mx="1" maxW="md" p="9" bg="#FDFDBD" boxShadow="lg"
         borderRadius="20">
            <Heading mb="4" size="lg" textAlign="center" color="blue.500">
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
                colorScheme='blue' 
                size="md" 
                w="full"
                isLoading={isLoading}
                loadingText="Logging in"
                >
                    Login
                </Button>
            </form>
            <Text fontSize="xlg" align="center" mt="4" color="black">Don't have an account?
                <Link to={REGISTER} color="blue.500"
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