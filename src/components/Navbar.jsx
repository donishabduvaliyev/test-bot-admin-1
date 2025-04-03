import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, IconButton, Typography, useMediaQuery, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import StoreIcon from "@mui/icons-material/Store";
import TelegramIcon from "@mui/icons-material/Telegram";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openDrawer, setOpenDrawer] = useState(false);

  const links = [
    { to: "/crud", icon: <AddBusinessIcon />, label: "Qo'shish" },
    { to: "/", icon: <StoreIcon />, label: "Barchasi" },
    { to: "/changeBot", icon: <TelegramIcon />, label: "Bot" },
    { to: "/broadcast", icon: <RateReviewIcon />, label: "Xabar" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 2,
        bgcolor: "#1F2937",
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      {/* Mobile Menu Button */}
      {isMobile ? (
        <>
          <IconButton sx={{ color: "white" }} onClick={() => setOpenDrawer(true)}>
            <MenuIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <Box sx={{ width: 250, p: 2 }}>
              {/* Close Button */}
              <IconButton onClick={() => setOpenDrawer(false)} sx={{ float: "right" }}>
                <CloseIcon />
              </IconButton>

              <List>
                {links.map(({ to, icon, label }) => (
                  <ListItem key={to} disablePadding>
                    <NavLink to={to} style={{ textDecoration: "none", color: "inherit", width: "100%" }} onClick={() => setOpenDrawer(false)}>
                      <ListItemButton>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={label} />
                      </ListItemButton>
                    </NavLink>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </>
      ) : (
        <Box sx={{ display: "flex", gap: 4 }}>
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#FACC15" : "white",
              })}
            >
              <IconButton sx={{ color: "inherit", display: "flex", flexDirection: "column" }}>
                {icon}
                <Typography variant="caption">{label}</Typography>
              </IconButton>
            </NavLink>
          ))}
        </Box>
      )}
    </Box>
  );
}
