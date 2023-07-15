import { Box, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import { signInWithEmail } from "../context/AuthContext";

const Login = () => {
const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const openModal = () => setOpen(true);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    signInWithEmail(email,password)
    setOpen(false)
  }
  return (
    <Box>
        <Button onClick={openModal}>Login</Button>
        {open ? <form onSubmit={handleSubmit}>
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

          <Button type="submit">Sign In</Button>
        </form> : <></>}
    </Box>
        
  )
}

export default Login
