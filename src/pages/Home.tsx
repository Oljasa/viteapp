import Navbar from "../components/Navbar";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { AuthContext, getAllPosts, getUser, makeAPost } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import Posts from "./Posts";

interface Post {
  id: number;
  user_id: string;
  content: string;
  created_at: string;
  username:string
}
const Home = () => {
  const { user } = React.useContext(AuthContext);
  const [post, setPost] = useState("");
  const [posts,setPosts] = useState<Post[]>([])
  const [username, setUsername] = useState("");
  // const [username, setUsername] = useState("");
  // console.log(user.user)
  // const username = await getUser(user?.user.id)
  useEffect(() => {
    //   console.log(user.user);
    //   const userHasName = getUser(user?.user.id);
    //   if(await userHasName){
    //     setShowUserSelect(false)
    //   }
    //   console.log(userHasName);
    const fetchUserName = async () => {
      console.log('NEWUSERID',user?.user.id)
      const userHasName:any = await getUser(user?.user.id);
      console.log(userHasName[0].username);
      setUsername(userHasName[0].username)
    }
    fetchUserName()
    }, [user])
    const handleSubmit = async () => {
      await makeAPost(post, user?.user.id, username)
      const newPosts: Post[] | any = await getAllPosts() as Post[]
            setPosts(newPosts)
    }
  return (
    // <div>
    //   <Navbar/>
    // </div>

    <Grid
      container
      spacing={1}
      sx={{ height: "100vh", display: "flex", justifyContent: "space-between" }}
    >
      <Grid item xs={3} sx={{ flexGrow: "1", backgroundColor: "beige" }}>
        <Navbar />
      </Grid>
      <Grid item xs={9}>
        {user ? 
          <Box>
            <Typography>Welcome {username}</Typography>
             {/* <TextField
            label="Post"
            type="post"
            value={post}
            onChange={(e) => sendPost(e.target.value)}
          /> */}
          <Box component="form">
            <TextField 
                multiline
                label="Write your post"
                value={post}
                onChange={e => setPost(e.target.value)}  
            />
            <Button 
        variant="contained"
        onClick={handleSubmit}
      >
        Submit Post
      </Button>

          </Box>
          </Box> : <></>}
          <Posts posts={posts} setPosts={setPosts}/>
      </Grid>
    </Grid>
    // <Box sx={{ display: "flex", justifyContent: "space-around", bgcolor:'background.paper' }}>
    //   <div>
    //     left side
    //     <Navbar />
    //   </div>
    //   <Box>content side</Box>

    // </Box>
  );
};

export default Home;
