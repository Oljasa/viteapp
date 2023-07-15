import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { signUp } from "../context/AuthContext";
import { validateUserName} from "../context/AuthContext";
const Register = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [exists, setExists] = useState(false)
  const openModal = () => setOpen(!open);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    signUp(email,password)
    setOpen(false)
  }
  const checkUsername = async (username: string) => {
    setUsername(username)
    const exists = await validateUserName(username)
    console.log(username)
    if(exists){
      console.log(`${username} is taken`)
      setExists(true)
    } else {
      console.log(`${username} is available`)
      setExists(false)
    }
    
  }
  return (
    <Box>
      <Button onClick={openModal}>Register</Button>
      {open ? 
      <form onSubmit={handleSubmit} style={{justifyContent:'center', alignItems:'center'}}>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
      label="Username"
      type="username"
      value={username}
      onChange={(e) => checkUsername(e.target.value)}
      />
      <Button type="submit">Sign Up</Button>
      {
        exists ? <Typography>Username is taken</Typography> : <></>
      }
      
    </form> : <></>}

    </Box>
  );
};

export default Register;
