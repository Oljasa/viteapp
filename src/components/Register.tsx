import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { signUp } from "../context/AuthContext";
const Register = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [exists, setExists] = useState(false);
  const openModal = () => setOpen(!open);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signUp(email, password);
    setOpen(false);
  };
 
  return (
    <Box>
      <Button onClick={openModal}>Register</Button>
      {open ? (
        <form
          onSubmit={handleSubmit}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
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
         
          <Button type="submit">Sign Up</Button>
          {exists ? <Typography>Username is taken</Typography> : <></>}
        </form>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Register;
