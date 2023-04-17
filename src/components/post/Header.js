import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Avatar from "components/profile/Avatar";
import { useUser } from "hooks/users";
import { formatDistanceToNow } from "date-fns";
import UsernameButton from "components/profile/UsernameButton";

export default function Header({uid,date}) {
    const {user,isLoading}=useUser(uid);
    if (isLoading) return "Loading user...";
    return (
        <Flex
            alignItems="center"
            borderBottom="2px solid"
            // borderColor="green.500"
            border="none"
            p="3"
            // bg="green.50"
            bg="#FEFF86"
            borderRadius="20px 20px 0 0"
        >
        <Avatar user={user} size="md"/>
        <Box ml="4" fontSize="md">
            <Button colorScheme="green" variant="link">
            <UsernameButton user={user}/>
            </Button>
            <Text fontSize="sm" color="gray.500">{formatDistanceToNow(date)} ago</Text>
        </Box>
        </Flex>
    )
}