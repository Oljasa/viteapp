import React, { useEffect } from "react";
// import { AuthContext } from "./components/AuthContext"
import { AuthContext } from "../context/AuthContext";
// const { user, logout, openLogin, openRegister } = React.useContext(AuthContext);
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import { Box, Typography } from "@mui/material";
const Navbar = () => {
    const { user} = React.useContext(AuthContext);
    console.log(user)
    useEffect(() => {
        console.log(user)
    }, [user])
  return (
    <nav>
      {user ? (
        // <button onClick={() => logout()}>Logout</button>
        <Box>
          <Typography>Logged in</Typography>
          <Logout/>
        </Box>
        
      ) : (
        <div>
          {/* <button onClick={() => openLogin()}>Login</button>
          <button onClick={() => openRegister()}>Register</button> */}
          <div>logged out</div>
          <Register/>
          <Login/>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
