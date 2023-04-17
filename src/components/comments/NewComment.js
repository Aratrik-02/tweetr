import { Box, Button, Flex, IconButton, Input, useMediaQuery } from "@chakra-ui/react";
import Avatar from "components/profile/Avatar";
import Picker from "emoji-picker-react";
import { useAuth } from "hooks/auth";
import { useAddComment } from "hooks/comments";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEmojiSmile, BsSend } from "react-icons/bs";

export default function NewComment({ post }) {
  const { id: postID } = post;
  const { user, isLoading: authLoading } = useAuth();
  const { register, handleSubmit, reset,setValue } = useForm();
  const { addComment, isLoading: commentLoading } = useAddComment({
    postID,
    uid: user?.id,
  });
  //adding emoticons
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
  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    setVal(inputValue);
    setValue("text", inputValue);
  };
  function handleAddComment(data) {
    addComment(data.text);
    reset();
  }

  if (authLoading) return "Loading...";

  return (
    <Box maxW="600px" mx="auto" py="6">
      <Flex padding="4">
        <Avatar user={user} size="sm" />
        <Box flex="1" ml="4">
          <form onSubmit={handleSubmit(handleAddComment)}>
            <Box>
              <Input
                size="sm"
                variant="flushed"
                placeholder="Write comment..."
                autoComplete="off"
                {...register("text", { required: true,onChange: handleInputChange })}
              />
            </Box>
            <Flex pt="2">
            <Box mt="-2">
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
                isLoading={commentLoading || authLoading}
                type="submit"
                colorScheme="green"
                size="sm"
                borderRadius="full"
                ml="auto"
                variant="unstyled"
              >
                {/* Add Comment */}
                <IconButton 
                  icon={<BsSend/>} mt="-5px" mr="3"
                  colorScheme="yellow"
                  size="md" variant="ghost" 
                  isRound
                />
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}