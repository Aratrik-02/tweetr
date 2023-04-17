import { Box, Code, Text } from "@chakra-ui/react";
import Header from "./Header";
import Actions from "./Actions";
export default function Post({post}) {
  const {uid,text,date}=post;
  return (
    <Box p="2" maxW="650px" textAlign="left">
        <Box
          // border="2px solid"
          borderColor="green.500" 
          boxShadow="lg"
          borderRadius="20"
          backgroundColor="#fff"
          >
          <Header uid={uid} date={date}/>
          <Box p="2" minH="100px" px="10" >
            <Code variant="none"><Text wordBreak="break-word" fontSize="md">{text}</Text></Code>
          </Box>
          <Actions post={post}/>
        </Box>
    </Box>
  )
}
