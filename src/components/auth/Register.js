import { Box, Center, Text, Button, Link, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { DASHBOARD, LOGIN} from 'lib/routes'
import { useRegister } from 'hooks/auth'
import { useForm } from 'react-hook-form'
import { emailValidate, passwordValidate, usernameValidate } from 'utils/form-validate'
const Login = () => {
    const {register: signup, isLoading} = useRegister()
    const {register, handleSubmit,formState:{errors}} = useForm()
    async function handleRegister(data){
      signup({
        username: data.username,
        email: data.email,
        password: data.password,
        redirectTo: DASHBOARD
      })
    }
  return (
    <Center w="100%" h="100vh" bg="#FDFDBD">
        <Box mx="1" maxW="md" p="9" bg="#fffee9" borderRadius="20" boxShadow="lg">
            <Heading mb="4" size="lg" textAlign="center" color="blue.500">
                Register
            </Heading>
            <form onSubmit={handleSubmit(handleRegister)}>
                <FormControl isInvalid={errors.username} py="2" >
                    <FormLabel>Username</FormLabel>
                    <Input
                    type="username" placeholder="username" {...register('username',usernameValidate)}/> 
                    <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                </FormControl>
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
                loadingText="Registering user"
                >
                    Register
                </Button>
            </form>
            <Text fontSize="xlg" align="center" mt="4" color="black">Already have an account?
                <Link to={LOGIN} color="blue.500"
                    fontWeight={600}
                    textDecor="underline" 
                    as={RouterLink}
                > Log In </Link>
                instead.
            </Text>
        </Box>
    </Center>
  )
}

export default Login