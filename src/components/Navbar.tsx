import React, { useEffect } from "react";
// import { AuthContext } from "./components/AuthContext"
import { AuthContext } from "../context/AuthContext";
// const { user, logout, openLogin, openRegister } = React.useContext(AuthContext);
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import { Box, Button, TextField, Typography } from "@mui/material";
import { validateUserName } from "../context/AuthContext";
import { registerName } from "../context/AuthContext";
import { getUser } from "../context/AuthContext";
import {User} from '../context/AuthContext'
const { useState } = React;
const Navbar = () => {
  const [username, setUsername] = useState("");
  const [exists, setExists] = useState(false);
  const [showUserSelect, setShowUserSelect] = useState(true);
  const { user } = React.useContext(AuthContext) as User;

  console.log(user);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const checkUsername = async (username: string) => {
    setUsername(username);
    const exists = await validateUserName(username);
    console.log(username);
    if (exists) {
      console.log(`${username} is taken`);
      setExists(true);
    } else {
      console.log(`${username} is available`);
      setExists(false);
    }
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if(user){
    registerName(username, user.user.id);
    }

  };
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
    console.log(userHasName);
    if(userHasName.length>=1){
      setShowUserSelect(false)
    }
  }
  fetchUserName()
  }, [user])

  return (
    <nav>
      {user ? (
        // <button onClick={() => logout()}>Logout</button>
        <Box>
          <Typography>Logged in</Typography>
          {showUserSelect? (
          <Box>
            <Typography>Set a username</Typography>
          <TextField
            label="Username"
            type="username"
            value={username}
            onChange={(e) => checkUsername(e.target.value)}
          />
          {exists ? <Typography>Username is taken</Typography>: <> Available </>}
          <Button onClick={handleSubmit} type="submit">submit</Button>
          </Box>): (<></>)}
          

          <Logout />
        </Box>
      ) : (
        <div>
          {/* <button onClick={() => openLogin()}>Login</button>
          <button onClick={() => openRegister()}>Register</button> */}
          <div>logged out</div>
          <Register />
          <Login />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
