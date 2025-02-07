import React from 'react'
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 200 }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItem>
        {user?.role === "admin" && (
          <ListItem button component={Link} to="/admin">
            <ListItemText primary="Admin Panel" />
          </ListItem>
        )}
        {user?.role === "user" && (
          <ListItem button component={Link} to="/user">
            <ListItemText primary="User Page" />
          </ListItem>
        )}
      </List>
    </Drawer>

  )
}
