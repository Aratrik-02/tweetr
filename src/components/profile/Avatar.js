import { PROTECTED } from "lib/routes"
import { Link } from "react-router-dom"
import { Avatar as ChakraAvatar } from "@chakra-ui/react"

export default function Avatar({user,size="xl",overrideAvatar=null}){
    return (
        <ChakraAvatar name={user?.username} size={size} src={overrideAvatar || user?.avatar} 
        _hover={{cursor:"pointer", opacity:"0.8"}}
        as={Link} to={`${PROTECTED}/profile/${user?.id}`}/>
    )
} 