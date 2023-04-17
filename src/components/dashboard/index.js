import { Box, Button, Code, Flex, Heading, HStack, IconButton, Input, Textarea, useMediaQuery } from "@chakra-ui/react";
import Picker from 'emoji-picker-react';
import {BsEmojiSmile, BsSend} from 'react-icons/bs'
import PostsLists from "components/post/PostsLists";
import Avatar from "components/profile/Avatar";
import { useAuth } from "hooks/auth";
import { useAddPost, usePosts } from "hooks/posts";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useRef, useState } from "react";
function NewPost() {
  const { register, handleSubmit, reset, setValue} = useForm();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();
  const [ val, setVal] = useState('')
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);
  const [isSmallerScreen] = useMediaQuery('(max-width: 600px)');
  const pickerStyle = {
    position: 'fixed',
    left: '300px',
    zIndex: '1000',
    height: '300px',
    overflowY: 'auto',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [pickerRef]);
  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text,
    });
    setVal('')
    reset();
  }
  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    setVal(inputValue);
    setValue("text", inputValue);
  };
  return (
    <Box maxW="650px"
     mx="auto"  
    py="10">
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justify="space-between" mx="5" mt="5">
        <Avatar user={user} size="md"/>
        <Input
          as={TextareaAutosize}
          resize="none"
          placeholder="What's buzzing?!"
          borderColor="blue" autoComplete="off"
          minRows={2} variant="flushed" 
          {...register("text", { required: true ,
            onChange: handleInputChange
          }
          )}
        />
        </HStack>
        <HStack justify="space-between"
        mt="2"
         mx="15"
         >
          <Box ml="60px" mt="-3">
            <IconButton 
            colorScheme="yellow"
            icon={<BsEmojiSmile/>}
            size="md" variant="ghost" 
            onClick={(event)=>{event.stopPropagation();setShowPicker(!showPicker)}}
            isRound
            />
            {showPicker && (
            <div 
            ref={pickerRef}
            style={isSmallerScreen ? {...pickerStyle, left: '7px'} : pickerStyle}
            >
            <Picker 
            native={true}
            onEmojiClick={
              (emojiObject)=> {
                setVal((prevMsg)=> prevMsg + emojiObject.emoji)
                setValue("text",val+emojiObject.emoji)
              }
            }/></div>)}
          </Box>
          <Button
            // colorScheme="blue"
            type="submit"
            isLoading={authLoading || addingPost}
            // loadingText="Loading"
            borderRadius="10"
            size="md"
            
            variant="unstyled"
          >
            <IconButton 
            colorScheme="green"
            icon={<BsSend/>} mt="-15px" mr="3"
            size="md" variant="ghost" 
            isRound
            />
          </Button>
        </HStack>
      </form>
    </Box>
  );
}
export default function Dashboard() {
  const { posts, isLoading } = usePosts();

  if (isLoading) return "Loading posts...";

  return (
    <>
      <NewPost />
      <PostsLists posts={posts} />
    </>
  );
}