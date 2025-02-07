import React from 'react'
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../redux/authSlice";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
export default function Navbar() {
  const {isAuthenticated} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Role-Based App
        </Typography>
        {isAuthenticated ? (
          <Button color="inherit" onClick={() => { dispatch(logout()); navigate("/login"); }}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>

  )
}
