import { Button } from "@mui/material";
import { signOut } from "../context/AuthContext";
const Logout = () => {
  const handleSignOut = () => {
    signOut();
  };
  return <Button onClick={handleSignOut}>Logout</Button>;
};

export default Logout;
