import React from 'react'
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ textAlign: "center", p: 2, position: "fixed", bottom: 0, width: "100%", bgcolor: "grey.200" }}>
      <Typography variant="body2">© 2025 Role-Based App</Typography>
    </Box>

  )
}
