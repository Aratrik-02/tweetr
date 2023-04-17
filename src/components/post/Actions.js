import { Flex, IconButton } from '@chakra-ui/react'
import { useAuth } from 'hooks/auth'
import React from 'react'
import { AiOutlineLike,AiFillLike,AiFillDelete, AiOutlineDelete } from 'react-icons/ai'
import { FaRegComment,FaComments } from 'react-icons/fa'
import { useDeletePost, useToggleLike } from 'hooks/posts'
import { Link } from 'react-router-dom'
import { PROTECTED } from 'lib/routes'
import { useComments } from 'hooks/comments'
export default function Actions({post}) {
    const {id,likes} = post
    const {user, isLoading:userLoading}=useAuth()
    const isLiked=likes.includes(user?.id);
    const {toggleLike, isLoading: likeLoading}=useToggleLike({id,isLiked,uid:user?.id})
    const {deletePost,isLoading:deleteLoading}=useDeletePost({id})
    const {comments,isLoading:commentsLoading}=useComments(id)
    return (
        <Flex p="2">
            <Flex alignItems="center">
                <IconButton size="md" colorScheme='blue' variant="ghost" 
                onClick={toggleLike} isLoading={likeLoading || userLoading}
                icon={isLiked?<AiFillLike/>:<AiOutlineLike/>} 
                isRound/>
                {post.likes.length}
            </Flex>
            <Flex alignItems="center" ml="4">
                <IconButton size="md" colorScheme='green' variant="ghost" 
                as={Link}
                to={`${PROTECTED}/comments/${id}`}
                isLoading={commentsLoading || userLoading}
                icon={comments?.length>0?<FaComments/>:<FaRegComment/>} 
                isRound/>
                {comments?.length}
            </Flex>
            <Flex alignItems="center" ml="auto">
                <IconButton size="md" 
                // colorScheme='orange' 
                variant="ghost" 
                onClick={deletePost} isLoading={deleteLoading || userLoading}
                colorScheme='red'
                icon={<AiOutlineDelete/>} 
                isRound/>
            </Flex>
        </Flex>
    )
}