import React from "react";
import AppleIcon from "@mui/icons-material/Apple";
import Navbar from "./Navbar";
import { Box, Typography, useMediaQuery } from "@mui/material";
import AccountModal from "./accountModal";

function Header() {
  // Detect mobile screen (max-width: 600px)
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        height: "3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        bgcolor: "#1F2937",
        color: "white",
        boxShadow: 1,
      }}
    >
      {/* Logo Section */}
      <Box display="flex" alignItems="center" gap={1}>
        <AppleIcon />
        {!isMobile && <Typography variant="h6">Logotip</Typography>}
      </Box>

      {/* Navbar */}
      <Navbar />

      {/* Account Section */}
      <Box display="flex" alignItems="center" gap={1}>
        {!isMobile && <Typography variant="h6">Account</Typography>}
        <AccountModal />
      </Box>
    </Box>
  );
}

export default Header;
