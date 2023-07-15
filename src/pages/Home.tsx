import React from "react";
import Navbar from "../components/Navbar";
import { Box, Grid, Paper } from "@mui/material";
const Home = () => {
  return (
    // <div>
    //   <Navbar/>
    // </div>

    <Grid container spacing={1} sx={{height:'100vh', display:'flex', justifyContent:'space-between'}}>
        <Grid item xs={3} sx={{flexGrow:'1', backgroundColor:'beige'}}>
          <Navbar/>
        </Grid>
        <Grid item xs={9}>
          <div>Posts</div>
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
