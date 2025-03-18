import { NavLink } from "react-router-dom";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import StoreIcon from "@mui/icons-material/Store";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";

export default function Navbar() {
  // Detect mobile screen (max-width: 600px)
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 4,
        py: 2,
        bgcolor: "#1F2937",
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      {/* Add Item */}
      <NavLink to="/crud" style={{ textDecoration: "none" }}>
        <IconButton sx={{ color: "white", display: "flex", flexDirection: "column" }}>
          <AddBusinessIcon sx={{ fontSize: 28 }} />
          {!isMobile && <Typography variant="caption">Qo'shish</Typography>}
        </IconButton>
      </NavLink>

      {/* All Items */}
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <IconButton sx={{ color: "white", display: "flex", flexDirection: "column" }}>
          <StoreIcon sx={{ fontSize: 28 }} />
          {!isMobile && <Typography variant="caption">Barchasi</Typography>}
        </IconButton>
      </NavLink>
    </Box>
  );
}
