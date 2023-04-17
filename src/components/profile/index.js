import {
    Button,
    Divider,
    Flex,
    HStack,
    IconButton,
    Stack,
    Text,
    useDisclosure,
    useMediaQuery,
  } from "@chakra-ui/react";
  import PostsLists from "components/post/PostsLists";
  import { usePosts } from "hooks/posts";
  import { useUser } from "hooks/users";
  import { useParams } from "react-router-dom";
  import Avatar from "./Avatar";
  import { format } from "date-fns";
  import { useAuth } from "hooks/auth";
import EditProfile from "./EditProfile";
import { AiOutlineEdit } from "react-icons/ai";
  
  export default function Profile() {
    const { id } = useParams();
    const { posts, isLoading: postsLoading } = usePosts(id);
    const { user, isLoading: userLoading } = useUser(id);
    const { user: authUser, isLoading: authLoading } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSmallerScreen] = useMediaQuery('(max-width: 600px)');
    let likesCount = 0;
    
    if (userLoading) return "Loading...";
    const ans=posts.map((post) => {
        likesCount += post.likes.length;
        return likesCount;
    });
    likesCount = ans[ans.length - 1];
    return (
      <Stack spacing="5" mt="5">
        <Flex p={["4", "6"]} pos="relative" align="center">
            {(!authLoading && authUser.id === user.id && (
                <Button size="2xl" borderRadius="full" zindex="-1" onClick={onOpen} icon={<AiOutlineEdit/>}>
                  <Avatar 
                  size={isSmallerScreen ? "lg" : "2xl"}
                  user={user} />
                  <IconButton 
                  size={isSmallerScreen ? "xs" : "md"}
                  icon={<AiOutlineEdit/>} mt="auto" 
                  ml={isSmallerScreen ? "-25px" : "-10"}
                  isRound/>
                </Button>)) || 
                <Avatar size={isSmallerScreen ? "lg" : "2xl"}
                user={user} />
            }
          <Stack ml="10">
            <Text fontSize="2xl">{user.username}</Text>
            <HStack spacing="10">
              <Text color="gray.700" fontSize={["sm", "lg"]}>
                Posts: {posts.length}
              </Text>
              <Text color="gray.700" fontSize={["sm", "lg"]}>
                Likes: {
                    likesCount
                }
              </Text>
              <Text color="gray.700" fontSize={["sm", "lg"]}>
                Joined: {format(user.date, "MMMM YYY")}
              </Text>
            </HStack>
          </Stack>
  
          <EditProfile isOpen={isOpen} onClose={onClose} />
        </Flex>
        <Divider />
  
        {postsLoading ? (
          <Text>Posts are loading...</Text>
        ) : (
          <PostsLists posts={posts} />
        )}
      </Stack>
    );
  }