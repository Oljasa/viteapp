import React, { useState, useEffect } from 'react'
import { getAllPosts } from '../context/AuthContext'
import { Box, Card, CardContent, Typography } from '@mui/material';
interface Post {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
    username:string
}
interface Props {
    posts: Post[],
    setPosts: (posts: Post[]) => void  
}
const Posts = ({posts,setPosts}:Props) => {
    // const [posts,setPosts] = useState<Post[]>([])
    useEffect(() => {
        const fetchPosts = async () => {
            const posts: Post[] = await getAllPosts() as Post[]
            setPosts(posts)
        }
        fetchPosts()
    },[])
  return (
    // <div>
    //   {posts.map(post=> (
    //     <div key={post.id}>
    //         <h1>{post.content}</h1>
    //     </div>
    //   ))}
    // </div>
    <Box>
    {posts.map(post=>(
        <Card key={post.id}>
            <CardContent>
                <Typography>{post.username}</Typography>
                <Typography>{post.created_at}</Typography>
                <Typography>{post.content}</Typography>
            </CardContent>
        </Card>
    ))}
    </Box>
  )
}

export default Posts
